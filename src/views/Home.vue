<script lang="ts" setup>
import { computed, reactive } from "vue";
import { PhCaretDown } from "phosphor-vue";
import AppButton from "../components/AppButton.vue";

const state = reactive({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
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
</script>

<template>
  <div class="flex flex-col w-full bg-day bg-cover bg-no-repeat bg-center">
    <div
      class="flex flex-col justify-between h-screen p-6 md:px-24 md:py-12 bg-stone-800 bg-opacity-40"
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
              {{ state.hours }}:{{ state.minutes }}
            </span>
          </time>
          <strong class="font-semibold">
            <span>em &nbsp;</span>
            <address class="inline not-italic">NATAL, BR</address>
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
        <li
          class="flex md:flex-col justify-between items-center md:items-start"
        >
          <span class="text-xs uppercase tracking-widest text-stone-700">
            timezone atual
          </span>
          <strong class="text-xl md:text-4xl text-stone-800">
            America/Sao_Paulo
          </strong>
        </li>
        <li
          class="flex md:flex-col justify-between items-center md:items-start"
        >
          <span class="text-xs uppercase tracking-widest text-stone-700">
            dia do ano
          </span>
          <strong class="text-xl md:text-4xl text-stone-800">295</strong>
        </li>
        <li
          class="flex md:flex-col justify-between items-center md:items-start"
        >
          <span class="text-xs uppercase tracking-widest text-stone-700">
            dia da semana
          </span>
          <strong class="text-xl md:text-4xl text-stone-800">5</strong>
        </li>
        <li
          class="flex md:flex-col justify-between items-center md:items-start"
        >
          <span class="text-xs uppercase tracking-widest text-stone-700">
            número da semana
          </span>
          <strong class="text-xl md:text-4xl text-stone-800">42</strong>
        </li>
      </ul>
    </div>
  </div>
</template>
