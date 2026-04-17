import { WeatherMap } from "./types";

export const openMeteoCurrentWeatherVariables = [
  "temperature_2m",
  "relative_humidity_2m",
  "wind_speed_10m",
  "precipitation",
  "weather_code",
  "apparent_temperature",
].join(",");

export const openMeteoHourlyWeatherVariables = [
  "temperature_2m",
  "weather_code",
  "apparent_temperature",
].join(",");

export const openMeteoDailyWeatherVariables = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
].join(",");

export const weatherMap: WeatherMap = {
  0: {
    description: "Sunny",
    image: "/icon-sunny.webp",
  },

  1: {
    description: "Mainly Sunny",
    image: "/icon-sunny.webp",
  },
  2: {
    description: "Partly Cloudy",
    image: "/icon-partly-cloudy.webp",
  },
  3: {
    description: "Cloudy",
    image: "/icon-overcast.webp",
  },
  45: {
    description: "Foggy",
    image: "/icon-fog.webp",
  },
  48: {
    description: "Rime Fog",
    image: "/icon-fog.webp",
  },
  51: {
    description: "Light Drizzle",
    image: "/icon-drizzle.webp",
  },
  53: {
    description: "Drizzle",
    image: "/icon-drizzle.webp",
  },
  55: {
    description: "Heavy Drizzle",
    image: "/icon-drizzle.webp",
  },
  56: {
    description: "Light Freezing Drizzle",
    image: "/icon-drizzle.webp",
  },
  57: {
    description: "Freezing Drizzle",
    image: "/icon-drizzle.webp",
  },
  61: {
    description: "Light Rain",
    image: "/icon-rain.webp",
  },
  63: {
    description: "Rain",
    image: "/icon-rain.webp",
  },
  65: {
    description: "Heavy Rain",
    image: "/icon-rain.webp",
  },
  66: {
    description: "Light Freezing Rain",
    image: "/icon-rain.webp",
  },
  67: {
    description: "Freezing Rain",
    image: "/icon-rain.webp",
  },
  71: {
    description: "Light Snow",
    image: "/icon-snow.webp",
  },
  73: {
    description: "Snow",
    image: "/icon-snow.webp",
  },
  75: {
    description: "Heavy Snow",
    image: "/icon-snow.webp",
  },
  77: {
    description: "Snow Grains",
    image: "/icon-snow.webp",
  },
  80: {
    description: "Light Showers",
    image: "/icon-rain.webp",
  },
  81: {
    description: "Showers",
    image: "/icon-rain.webp",
  },
  82: {
    description: "Heavy Showers",
    image: "/icon-rain.webp",
  },
  85: {
    description: "Light Snow Showers",
    image: "/icon-snow.webp",
  },
  86: {
    description: "Snow Showers",
    image: "/icon-snow.webp",
  },
  95: {
    description: "Thunderstorm",
    image: "/icon-storm.webp",
  },
  96: {
    description: "Light Thunderstorms With Hail",
    image: "/icon-storm.webp",
  },
  99: {
    description: "Thunderstorm With Hail",
    image: "/icon-storm.webp",
  },
};
