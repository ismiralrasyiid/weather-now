import {
  GeoLocation,
  openMeteoSearchApi,
  OpenMeteoSearchResponse,
} from "@/domains/location";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({
      error: "Place must be at least 2 characters",
      status: 400,
    });
  }

  try {
    const res = await fetch(
      `${openMeteoSearchApi}?name=${encodeURIComponent(name)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return NextResponse.json({
        error: "Failed to fetch location",
        status: res.status,
      });
    }

    const data: OpenMeteoSearchResponse = await res.json();
    const rebuildResults =
      data.results?.map(
        (location): GeoLocation => ({
          id: location.id,
          name: location.name,
          admin1: location.admin1,
          admin2: location.admin2,
          country: location.country,
          timezone: location.timezone,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      ) ?? [];

    return NextResponse.json({ results: rebuildResults });
  } catch {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
