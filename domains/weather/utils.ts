import { DailyForecast } from "@/components/feature/daily-forecasts/forecast";
import { Day, dayAbbreviations, days, formatHour12FromDate } from "../time";
import { weatherMap } from "./constants";
import { CurrentWeather, DailyWeather, HourlyWeather } from "./types";
import { HourlyForecast } from "@/components/feature/hourly-forecasts/forecast";

export function mapWeatherCode(code: number) {
  return weatherMap[code] ?? { description: "Unknown", image: "" };
}

export function getWeatherMetrics(data: CurrentWeather) {
  const { current, current_units } = data;

  const weatherMetrics = [
    {
      name: "Feels like",
      value: Math.round(current.apparent_temperature),
      unit: current_units.apparent_temperature,
    },
    {
      name: "Humidity",
      value: Math.round(current.relative_humidity_2m),
      unit: current_units.relative_humidity_2m,
    },
    {
      name: "Wind",
      value: Math.round(current.wind_speed_10m),
      unit: " " + current_units.wind_speed_10m,
    },
    {
      name: "Precipitation",
      value: Math.round(current.precipitation),
      unit: " " + current_units.precipitation,
    },
  ];

  return weatherMetrics;
}

export function getDailyForecasts(data: DailyWeather): DailyForecast[] {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } = data;

  return time.map((item, index) => ({
    day: dayAbbreviations[new Date(item).getDay()],
    image: mapWeatherCode(weather_code[index]).image,
    highestTemp: Math.round(temperature_2m_max[index]),
    lowestTemp: Math.round(temperature_2m_min[index]),
    description: mapWeatherCode(weather_code[index]).description,
  }));
}

export function splitWeatherVariableIntoSevenDays<T>(
  variable: ReadonlyArray<T>,
): ReadonlyArray<ReadonlyArray<T>> {
  return Array.from({ length: 7 }, (_, i) =>
    variable.slice(i * 24, (i + 1) * 24),
  );
}

export function getDayFromDate(date: string) {
  const dayIndex = new Date(date).getDay();
  const day = days[dayIndex];
  return day;
}

export function getHourlyForecasts(
  data: HourlyWeather,
): Record<Day, HourlyForecast[]> {
  const { time, temperature_2m, weather_code } = data;

  // split each weather variable into seven day
  // each day consist of 24 hours
  const timesByDay = splitWeatherVariableIntoSevenDays(time);
  const temperaturesByDay = splitWeatherVariableIntoSevenDays(temperature_2m);
  const weatherCodesByDay = splitWeatherVariableIntoSevenDays(weather_code);

  // group all weather variable into its corresponding day
  // in key value pair array format
  const hourlyForecastEntries = timesByDay.map((dates, dayIndex) => {
    const key = getDayFromDate(dates[0]);

    const dayWeatherCodes = weatherCodesByDay[dayIndex];
    const dayTemperatures = temperaturesByDay[dayIndex];

    const value = dates.map((date, hourIndex) => {
      const hour = formatHour12FromDate(date);
      const weatherCode = dayWeatherCodes[hourIndex];
      const weatherInfo = mapWeatherCode(weatherCode);
      const temperature = Math.round(dayTemperatures[hourIndex]);
      return {
        hour,
        image: weatherInfo.image,
        description: weatherInfo.description,
        temperature,
      };
    });

    return [key, value];
  });

  // return an object with a day as a key
  // and its corresponding weather forecast as value
  return Object.fromEntries(hourlyForecastEntries);
}
