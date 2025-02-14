import { calculateSubscriptionEstimate } from "shared/calculateServices";
import { premiumPlans } from "shared/premiumPlans";
import { db } from "db";
import { users, orders } from "db/schema";
import { inArray } from "drizzle-orm";
import schedule from "node-schedule";
import { checkout } from "shared/config/aquiring";
import { TSubscriptionMetadata } from "shared/schema/order.schema";
async function checkUsers() {
  console.log("updating subscriptions");

  const currentMoment = new Date();

  const usersWithSubscriptionExpired = await db.query.users.findMany({
    with: {
      payment_methods: true,
    },
    where: (us, { lte }) => lte(us.subscriptionExpires, currentMoment),
  });

  if (usersWithSubscriptionExpired.length === 0) {
    console.log("No match users");
    return;
  }

  const expiredUsers: string[] = [];

  for (let user of usersWithSubscriptionExpired) {
    if (!user.subscriptionLevel) continue;

    const paymentMethod = user.payment_methods.find((m) => m.isDefault);

    if (!paymentMethod) {
      expiredUsers.push(user.id);
      continue;
    }

    const payment = await checkout
      .createPayment({
        amount: {
          value: premiumPlans[user.subscriptionLevel].price.toFixed(2),
          currency: "RUB",
        },
        receipt: {
          items: await calculateSubscriptionEstimate(user.subscriptionLevel),
          tax_system_code: 1,
          customer: {
            email: user.email,
          },
        },

        payment_method_id: paymentMethod.id,

        description: `Оплата подписки уровня ${
          premiumPlans[user.subscriptionLevel].name
        }`,
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
    user.subscriptionLevel;
    if (payment) {
      await db.insert(orders).values({
        id: payment.id,
        type: "subscription",
        userId: user.id,
        metadata: {
          subscriptionLevel: user.subscriptionLevel,
        } as TSubscriptionMetadata,
      });
    }
  }

  const updatedSubscriptions = await db
    .update(users)
    .set({ isSubscribed: false, freeReleases: 0 })
    .where(inArray(orders.id, ["qwe"]))
    .returning({ id: users.id });

  console.log(
    `updated subscription status for ${updatedSubscriptions.length ?? 0} users`
  );
}

export function startCronTasks() {
  const updateSubscriptionStatusTask = schedule.scheduleJob(
    "Проверить подписки",
    "0 0 0 * * *",
    checkUsers
  );

  const allTasks = [updateSubscriptionStatusTask];

  allTasks.forEach((t) =>
    console.log(
      `Время следующего запуска задачи "${t.name}": ${t.nextInvocation()}`
    )
  );
}
