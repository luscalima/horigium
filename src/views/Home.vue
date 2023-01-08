<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { PhCaretDown } from "phosphor-vue";
import { getCoords } from "../composables/geo";
import { getAddress } from "../services/location";
import AppButton from "../components/AppButton.vue";

const state = reactive({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  city: "",
  countryCode: "",
});

const greeting = computed(() => {
  switch (true) {
    case state.hours < 12:
      return "bom dia";
    case state.hours < 18:
      return "boa tarde";
    case state.hours < 24:
      return "boa noite";
  }
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

function padTime(time: number) {
  return time.toString().padStart(2, "0");
}

onMounted(async () => {
  try {
    const { coords } = await getCoords();
    const address = await getAddress(coords);
    state.city = address?.city;
    state.countryCode = address?.countryCode;
  } catch (error) {
    console.error(error);
  }
});

// Elements tailwind classes sets
const ELEMENT_CLASSES = {
  li: "flex md:flex-col justify-between items-center md:items-start",
  span: "text-xs uppercase tracking-widest text-stone-700",
  strong: "text-xl md:text-4xl text-stone-800",
};
</script>

<template>
  <div class="flex flex-col w-full bg-day bg-cover bg-no-repeat bg-center">
    <div
      class="flex flex-col justify-between h-screen p-6 md:px-32 md:py-12 bg-stone-800 bg-opacity-40"
    >
      <blockquote class="flex flex-col md:w-[512px] gap-4 text-stone-100">
        <p class="leading-7 md:text-lg">
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
          fugit dolorum ullam ea sapiente doloremque incidunt vel optio!"
        </p>
        <footer>
          <span class="font-medium md:text-lg">Jane Doe</span>
        </footer>
      </blockquote>

      <div class="flex flex-col gap-8 mb-8">
        <div
          class="flex flex-col tracking-widest md:text-2xl uppercase text-stone-100 drop-shadow"
        >
          <strong class="font-normal">{{ greeting }}, são exatamente</strong>
          <time>
            <span class="tracking-normal text-8xl md:text-[12rem] font-bold">
              {{ padTime(state.hours) }}:{{ padTime(state.minutes) }}
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
          <AppButton>
            mais
            <template #icon>
              <PhCaretDown />
            </template>
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="flex px-6 md:px-32 py-16 bg-stone-300 bg-opacity-80 backdrop-blur-lg"
    >
      <ul class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <li :class="ELEMENT_CLASSES.li">
          <span :class="ELEMENT_CLASSES.span"> timezone atual </span>
          <strong :class="ELEMENT_CLASSES.strong">
            {{ timeInfos.timezone }}
          </strong>
        </li>
        <li :class="ELEMENT_CLASSES.li">
          <span :class="ELEMENT_CLASSES.span"> dia do ano </span>
          <strong :class="ELEMENT_CLASSES.strong">
            {{ timeInfos.dayOfYear }}
          </strong>
        </li>
        <li :class="ELEMENT_CLASSES.li">
          <span :class="ELEMENT_CLASSES.span"> dia da semana </span>
          <strong :class="ELEMENT_CLASSES.strong">
            {{ timeInfos.dayOfWeek }}
          </strong>
        </li>
        <li :class="ELEMENT_CLASSES.li">
          <span :class="ELEMENT_CLASSES.span"> número da semana </span>
          <strong :class="ELEMENT_CLASSES.strong">
            {{ timeInfos.weekOfYear }}
          </strong>
        </li>
      </ul>
    </div>
  </div>
</template>
