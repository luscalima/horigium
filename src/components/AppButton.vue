<script setup lang="ts"></script>

<template>
  <button
    class="relative flex justify-center items-center h-12 pl-6 pr-16 rounded-full uppercase text-stone-900 bg-stone-100"
  >
    <span class="tracking-widest font-medium">
      <slot />
    </span>
    <span
      class="absolute right-1 flex justify-center items-center w-10 h-10 text-2xl rounded-full text-stone-100 bg-stone-900"
    >
      <slot name="icon" />
    </span>
  </button>
</template>
