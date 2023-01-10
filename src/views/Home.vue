<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { PhArrowsClockwise, PhCaretDown, PhMoon, PhSun } from "phosphor-vue";
import { getCoords } from "../composables/geo";
import clock, { dispatchClock } from "../composables/clock";
import { getAddress } from "../services/location";
import { getQuote } from "../services/quote";
import AppButton from "../components/AppButton.vue";

const state = reactive({
  city: "",
  countryCode: "",
  quote: {
    content: "",
    author: "",
  },
  showCurtain: false,
  isLoadingQuote: false,
});
const greeting = computed(() => {
  switch (true) {
    case clock.hours < 12:
      return "bom dia";
    case clock.hours < 18:
      return "boa tarde";
    case clock.hours < 24:
      return "boa noite";
  }
});
const isDay = computed(() => {
  return clock.hours > 4 && clock.hours < 19;
});
const greetingIcon = computed(() => {
  return isDay.value ? PhSun : PhMoon;
});
const timeInfos = computed(() => {
  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1_000;
  const MILLISECONDS_IN_WEEK = 7 * MILLISECONDS_IN_DAY;
  const firstDay = new Date(new Date().getFullYear(), 0, 1);
  const diff = Date.now() - firstDay.getTime();

  return {
    timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
    dayOfWeek: new Date().getDay() + 1,
    dayOfYear: Math.ceil(diff / MILLISECONDS_IN_DAY),
    weekOfYear: Math.ceil(diff / MILLISECONDS_IN_WEEK),
  };
});
// Elements tailwind classes sets
const elementClasses = computed(() => ({
  li: "flex md:flex-col justify-between items-center md:items-start",
  span: `text-xs uppercase tracking-widest ${
    isDay.value ? "text-stone-700" : "text-stone-100"
  }`,
  strong: `text-xl md:text-4xl ${
    isDay.value ? "text-stone-800" : "text-stone-100"
  }`,
}));

function padTime(time: number) {
  return time.toString().padStart(2, "0");
}

function handleToggleCurtain() {
  state.showCurtain = !state.showCurtain;
}

async function handleRequestQuote() {
  state.isLoadingQuote = true;
  await requestQuote();
  state.isLoadingQuote = false;
}

async function requestQuote() {
  try {
    const quote = await getQuote();
    state.quote.content = quote.content;
    state.quote.author = quote.author;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  dispatchClock();
  requestQuote();
  try {
    const { coords } = await getCoords();
    const address = await getAddress(coords);
    state.city = address?.city;
    state.countryCode = address?.countryCode;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div
    class="flex flex-col w-full bg-cover bg-no-repeat bg-center transition-all duration-300"
    :class="[
      isDay ? 'bg-day' : 'bg-night',
      { '-translate-y-72 md:-translate-y-64': state.showCurtain },
    ]"
  >
    <div
      class="flex flex-col justify-between min-h-screen p-6 md:px-32 md:py-12 bg-stone-800 bg-opacity-40"
    >
      <div class="flex justify-between gap-2 md:w-[512px]">
        <blockquote class="flex flex-col gap-4 text-stone-100">
          <p class="leading-7 md:text-lg">"{{ state.quote.content }}"</p>
          <footer>
            <span class="font-medium md:text-lg">{{ state.quote.author }}</span>
          </footer>
        </blockquote>
        <div>
          <button class="text-stone-100" @click="handleRequestQuote">
            <PhArrowsClockwise
              size="32"
              :class="{ 'animate-spin': state.isLoadingQuote }"
            />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-8 mb-8">
        <div
          class="flex flex-col tracking-widest md:text-2xl uppercase text-stone-100 drop-shadow"
        >
          <strong class="flex items-center gap-2 font-normal">
            <component :is="greetingIcon" weight="fill" :size="32" />
            {{ greeting }}, são exatamente
          </strong>
          <time>
            <span class="tracking-normal text-8xl md:text-[12rem] font-bold">
              {{ padTime(clock.hours) }}:{{ padTime(clock.minutes) }}
            </span>
          </time>
          <strong class="font-semibold">
            <span>em &nbsp;</span>
            <address class="inline not-italic">
              {{ state.city }}, {{ state.countryCode }}
            </address>
          </strong>
        </div>
        <div>
          <AppButton @click="handleToggleCurtain" class="w-44">
            {{ state.showCurtain ? "menos" : "mais" }}
            <template #icon>
              <PhCaretDown
                class="trasition duration-300"
                :class="{ '-rotate-180': state.showCurtain }"
              />
            </template>
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="flex h-72 md:h-64 px-6 md:px-32 py-16 bg-opacity-80 backdrop-blur-lg"
      :class="[isDay ? 'bg-stone-300' : 'bg-slate-800']"
    >
      <ul class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <li :class="elementClasses.li">
          <span :class="elementClasses.span"> timezone atual </span>
          <strong :class="elementClasses.strong">
            {{ timeInfos.timezone }}
          </strong>
        </li>
        <li :class="elementClasses.li">
          <span :class="elementClasses.span"> dia do ano </span>
          <strong :class="elementClasses.strong">
            {{ timeInfos.dayOfYear }}
          </strong>
        </li>
        <li :class="elementClasses.li">
          <span :class="elementClasses.span"> dia da semana </span>
          <strong :class="elementClasses.strong">
            {{ timeInfos.dayOfWeek }}
          </strong>
        </li>
        <li :class="elementClasses.li">
          <span :class="elementClasses.span"> número da semana </span>
          <strong :class="elementClasses.strong">
            {{ timeInfos.weekOfYear }}
          </strong>
        </li>
      </ul>
    </div>
  </div>
</template>
