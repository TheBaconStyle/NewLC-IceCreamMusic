const formatter = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

export default function dateFormatter(date: Date) {
  return formatter.format(date).slice(0, -2);
}

export function inputDateFormat(date?: Date) {
  const curDate = date ?? new Date();
  return `${curDate.getFullYear()}-${(curDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${curDate.getDate().toString().padStart(2, "0")}`;
}
