import { Day, days } from "../time";
import { validateWeatherParams, getHourlyForecasts } from "./utils";

function generateMockWeatherData(
  options: {
    withInvalidWeatherCode?: boolean;
  } = {},
) {
  const { withInvalidWeatherCode } = options;
  return {
    time: Array.from({ length: 7 }, (_, dayIndex) =>
      Array.from(
        { length: 24 },
        (_, hourIndex) =>
          `2026-01-0${dayIndex + 1}T${hourIndex < 10 ? `0${hourIndex}` : hourIndex}:00:00Z`,
      ),
    ).flat(),
    temperature_2m: Array.from({ length: 7 * 24 }, () => 30.6),
    apparent_temperature: Array.from({ length: 7 * 24 }, () => 31.6),
    precipitation_probability: Array.from({ length: 7 * 24 }, () => 80),
    weather_code: Array.from({ length: 7 * 24 }, () =>
      withInvalidWeatherCode ? -1 : 1,
    ),
  };
}

describe("weather utils", () => {
  describe("validateWeatherParams", () => {
    const VALID_PARAMS = {
      lat: "10",
      lon: "20",
      tzone: "Asia/Jakarta",
    };

    it("should return true for valid parameters", () => {
      expect(validateWeatherParams(VALID_PARAMS)).toBe(true);
    });

    describe("missing parameters", () => {
      it("should return false when lat is missing", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "" })).toBe(false);
      });

      it("should return false when lon is missing", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "" })).toBe(false);
      });

      it("should return false when timezone is missing", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, tzone: "" })).toBe(
          false,
        );
      });
    });

    describe("invalid number format", () => {
      it("should return false when lat is not a number", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "abc" })).toBe(
          false,
        );
      });

      it("should return false when lon is not a number", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "10a" })).toBe(
          false,
        );
      });

      it("should return false when lat is decimal with invalid format", () => {
        expect(
          validateWeatherParams({ ...VALID_PARAMS, lat: "10.10.10" }),
        ).toBe(false);
      });
    });

    describe("out of range values", () => {
      it("should return false when latitude is greater than 90", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "91" })).toBe(
          false,
        );
      });

      it("should return false when latitude is less than -90", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "-91" })).toBe(
          false,
        );
      });

      it("should return false when longitude is greater than 180", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "181" })).toBe(
          false,
        );
      });

      it("should return false when longitude is less than -180", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "-181" })).toBe(
          false,
        );
      });
    });

    describe("boundary values", () => {
      it("should return true for latitude at boundaries (-90 and 90)", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "-90" })).toBe(
          true,
        );

        expect(validateWeatherParams({ ...VALID_PARAMS, lat: "90" })).toBe(
          true,
        );
      });

      it("should return true for longitude at boundaries (-180 and 180)", () => {
        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "-180" })).toBe(
          true,
        );

        expect(validateWeatherParams({ ...VALID_PARAMS, lon: "180" })).toBe(
          true,
        );
      });
    });
  });

  describe("getHourlyForecasts", () => {
    const currentDay: Day = "thursday";

    describe("valid input", () => {
      let result: ReturnType<typeof getHourlyForecasts>;

      beforeEach(() => {
        result = getHourlyForecasts(generateMockWeatherData());
      });

      it("should have valid object keys", () => {
        expect(Object.keys(result)).toHaveLength(days.length);
        expect(Object.keys(result)).toEqual(expect.arrayContaining(days));
      });

      it("should have rounded temperature", () => {
        expect(result[currentDay][0].temperature).toBe(31);
      });

      it("should have correct object shape", () => {
        expect(result[currentDay][0]).toEqual(
          expect.objectContaining({
            hour: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            temperature: expect.any(Number),
          }),
        );
      });

      it("should have image as valid url", () => {
        expect(result[currentDay][0].image).toMatch(
          /^\/[\w-]+\.(webp|png|jpg|jpeg|svg)$/,
        );
      });
    });

    describe("invalid input", () => {
      let result: ReturnType<typeof getHourlyForecasts>;

      beforeEach(() => {
        result = getHourlyForecasts(
          generateMockWeatherData({ withInvalidWeatherCode: true }),
        );
      });

      it("should have Unknown value for description", () => {
        expect(result[currentDay][0].description).toBe("Unknown");
      });

      it("should have empty string for image url", () => {
        expect(result[currentDay][0].image).toBe("");
      });
    });
  });
});
