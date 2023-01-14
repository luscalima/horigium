import state, { dispatchClock } from "../../../src/composables/clock";

describe("clock", () => {
  it("should start with the current time", () => {
    // The number inside the assertions comes from jest's global configuration.
    // This is necessary as the reactive state of the composable is loaded before
    // the tests are started and the global setting allows the time to be faked
    // before the composable runs
    expect(state.hours).toBe(8);
    expect(state.minutes).toBe(30);
  });

  it("when 'dispatchClock' is called, the time should be updated", () => {
    jest.useFakeTimers({
      advanceTimers: 350,
      now: new Date(2023, 0, 1, 9, 45).getTime(),
    });

    dispatchClock();
    jest.advanceTimersByTime(400);

    expect(state.hours).not.toBe(8);
    expect(state.minutes).not.toBe(30);
  });
});
