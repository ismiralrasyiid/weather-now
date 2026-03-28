import { validateWeatherParams } from "./utils";

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
});
