export type OpenMeteoLocation = Readonly<{
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
}>;

export type OpenMeteoSearchResponse = Readonly<{
  generationtime_ms: number;
  results?: OpenMeteoLocation[];
}>;

type GeoLocationKeys =
  | "id"
  | "name"
  | "admin1"
  | "admin2"
  | "country"
  | "country_code"
  | "latitude"
  | "longitude";

export type GeoLocation = Pick<OpenMeteoLocation, GeoLocationKeys>;
