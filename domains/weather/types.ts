export type OpenMeteoWeatherResponse = Readonly<{
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: OpenMeteoCurrentUnits;
  current: OpenMeteoCurrent;
  hourly_units: OpenMeteoHourlyUnits;
  hourly: OpenMeteoHourly;
  daily_units: OpenMeteoDailyUnits;
  daily: OpenMeteoDaily;
}>;

export type OpenMeteoCurrentUnits = Readonly<{
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  precipitation: string;
  weather_code: string;
  apparent_temperature: string;
}>;

export type OpenMeteoCurrent = Readonly<{
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weather_code: number;
  apparent_temperature: number;
}>;

export type OpenMeteoHourlyUnits = Readonly<{
  time: string;
  temperature_2m: string;
  weather_code: string;
}>;

export type OpenMeteoHourly = Readonly<{
  time: ReadonlyArray<string>;
  temperature_2m: ReadonlyArray<number>;
  weather_code: ReadonlyArray<number>;
  apparent_temperature: ReadonlyArray<number>;
  precipitation_probability: ReadonlyArray<number>;
}>;

export type OpenMeteoDailyUnits = Readonly<{
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}>;

export type OpenMeteoDaily = Readonly<{
  time: ReadonlyArray<string>;
  weather_code: ReadonlyArray<number>;
  temperature_2m_max: ReadonlyArray<number>;
  temperature_2m_min: ReadonlyArray<number>;
}>;

type CurrentWeatherKeys = "current" | "current_units";

export type CurrentWeather = Pick<OpenMeteoWeatherResponse, CurrentWeatherKeys>;

export type DailyWeather = OpenMeteoDaily;

export type HourlyWeather = OpenMeteoHourly;

export type WeatherInfo = {
  description: string;
  image: string;
};

export type WeatherMap = Record<number, WeatherInfo>;

export type WeatherParams = {
  lat?: string;
  lon?: string;
  tzone?: string;
  unitType?: string;
};
