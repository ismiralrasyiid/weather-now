import { City, GeoLocation } from "./types";

export function mapCityToGeoLocation(city: City): GeoLocation {
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    latitude: city.location.latitude,
    longitude: city.location.longitude,
    timezone: city.location.timezone,
  };
}
