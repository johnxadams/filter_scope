<template>
  <div class="mb-4">
    <input
      id="product-search"
      type="text"
      :value="modelValue"
      @input="handleInput"
      placeholder="Search for name..."
      class="mt-1 block w-full md:max-w-1/2 text-sm md:text-base p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      aria-label="Produkt suchen"
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
