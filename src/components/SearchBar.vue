<template>
  <div class="mb-4">
    <label for="product-search" class="block text-sm font-medium text-gray-100">
      Suche Produkte
    </label>
    <input
      id="product-search"
      type="text"
      v-model="searchQuery"
      placeholder="Search for name..."
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
      aria-label="Produkt suchen"
      role="searchbox"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue || '')

let timeout = null

// setTimeout - avoid emitting too frequently
watch(searchQuery, (val) => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    emit('update:modelValue', val)
    console.log('my emit:', val)
  }, 220)
})
</script>
