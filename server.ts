import { startCronTasks } from "./config/cron";

function bootstrap() {
  startCronTasks();
}

bootstrap();
