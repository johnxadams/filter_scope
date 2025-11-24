<template>
  <button
    @click="resetFilters"
    @keydown.enter.prevent="resetFilters"
    @keydown.space.prevent="resetFilters"
    type="button"
    class="inline-flex items-center w-auto gap-x-2 px-4 py-2 text-sm text-white bg-black/35 transition-colors hover:bg-black/45 active:bg-black/60 cursor-pointer"
    aria-label="Filter zurücksetzen"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4.5"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
    <span>Reset Filters</span>
  </button>
</template>

<script setup>
const emit = defineEmits(['reset'])

const resetFilters = () => {
  emit('reset')
}
</script>
