import { notFound } from "next/navigation";

const NOT_FOUND_STATUSES = [400, 403, 404];

export async function fetchWeather(searchParams: string) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?${searchParams}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 120,
      },
    },
  );

  if (NOT_FOUND_STATUSES.includes(res.status)) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}
