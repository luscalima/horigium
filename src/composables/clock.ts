import { reactive, readonly } from "vue";

interface Clock {
  hours: number;
  minutes: number;
}

const today = new Date();

const state = reactive({
  hours: today.getHours(),
  minutes: today.getMinutes(),
} as Clock);

/**
 * A strategy that would provide greater precision could be adopted, but as the
 * application does not require it, a reasonable time interval was implemented.
 */
export function dispatchClock() {
  setInterval(() => {
    const today = new Date();
    state.hours = today.getHours();
    state.minutes = today.getMinutes();
  }, 350);
}

export default readonly(state);
