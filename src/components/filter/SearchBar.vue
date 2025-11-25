<template>
  <div class="mb-4 relative">
    <svg
      class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      id="product-search"
      type="text"
      :value="modelValue"
      @input="handleInput"
      placeholder="Search for name..."
      class="mt-1 block w-full text-sm p-3 border-gray-300 shadow-sm outline-none placeholder-gray-600 text-white focus:border-white-300 focus:bg-black/20 focus-visible:white-300 focus-visible:shadow-md transition-all duration-200"
      aria-label="Produkt nach Namen suchen"
      role="searchbox"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

let timeout = null

const handleInput = (event) => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    // emit e.target.value so be reasonably reset from parent component
    emit('update:modelValue', event.target.value)
  }, 220)
}
</script>
