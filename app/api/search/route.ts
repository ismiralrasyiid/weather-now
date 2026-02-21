import { NextResponse } from "next/server";

type OpenMeteoLocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
};

type OpenMeteoSearchResponse = {
  generationtime_ms: number;
  results?: OpenMeteoLocation[];
};

type Location = {
  id: number;
  name: string;
  admin1: string;
  country: string;
  latitude: number;
  longitude: number;
};

const openMeteoSearchApi = "https://geocoding-api.open-meteo.com/v1/search";

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
    const rebuildResults: Location[] =
      data.results?.map((location) => ({
        id: location.id,
        name: location.name,
        admin1: location.admin1,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      })) ?? [];

    return NextResponse.json({ results: rebuildResults });
  } catch (error) {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
