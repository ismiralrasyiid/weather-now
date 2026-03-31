import { getDayIndexByTZ } from "./utils";

describe("time utils", () => {
  describe("getDayIndexByTZ", () => {
    // Base time: London, Thursday, Jan 1 2026 10:00 UTC
    const localTime = new Date("2026-01-01T10:00:00Z");

    const TIMEZONES = {
      // UTC+0
      LOCAL: "Europe/London",
      // UTC-11
      FAR_WEST: "Pacific/Niue",
      // UTC+14
      FAR_EAST: "Pacific/Kiritimati",
    };

    const DAY_INDEX = {
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
    };

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(localTime);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should fallback when timezone is null", () => {
      const result = getDayIndexByTZ(null);
      expect(result).toBe(DAY_INDEX.THURSDAY);
    });

    it("should fallback when timezone is invalid", () => {
      const result = getDayIndexByTZ("invalid");
      expect(result).toBe(DAY_INDEX.THURSDAY);
    });

    it("should return correct day for valid timezone (UTC, Europe/London)", () => {
      const europeLondonDay = getDayIndexByTZ(TIMEZONES.LOCAL);
      expect(europeLondonDay).toBe(DAY_INDEX.THURSDAY);
    });

    it("should return previous day for far west timezone (UTC-11, Pacific/Niue)", () => {
      const pacificNiueDay = getDayIndexByTZ(TIMEZONES.FAR_WEST);
      expect(pacificNiueDay).toBe(DAY_INDEX.WEDNESDAY);
    });

    it("should return next day for far east timezone (UTC+14, Pacific/Kiritimati)", () => {
      const pacificKiritimatiDay = getDayIndexByTZ(TIMEZONES.FAR_EAST);
      expect(pacificKiritimatiDay).toBe(DAY_INDEX.FRIDAY);
    });
  });
});
