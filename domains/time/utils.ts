const hourFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
});

export function formatHour12FromDate(dateString: string) {
  return hourFormatter.format(new Date(dateString));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(dateString: string) {
  return dateFormatter.format(new Date(dateString));
}
