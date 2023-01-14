import { getCoords } from "../../../src/composables/geo";

describe("getCoords", () => {
  it("should return coordinates", async () => {
    // @ts-ignore
    navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) => {
        success({ coords: { latitude: 1, longitude: 1 } });
      }),
    };

    const coords = await getCoords();
    expect(coords).toEqual({ coords: { latitude: 1, longitude: 1 } });
  });

  it("should reject the error", async () => {
    // @ts-ignore
    navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, reject) => {
        reject({
          code: 1,
          message: "Permission denied",
        });
      }),
    };

    try {
      await getCoords();
    } catch (err) {
      expect(err).toEqual({
        code: 1,
        message: "Permission denied",
      });
    }
  });
});
