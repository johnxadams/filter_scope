<template>
  <div class="mb-4">
    <label for="category-filter" class="block text-sm font-medium text-gray-100">
      Kategorie filtern
    </label>

    <select
      id="category-filter"
      v-model="selected"
      @change="emitUpdate"
      class="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
      aria-label="Produktkategorie auswählen"
    >
      <option value="">All Categories</option>

      <option v-for="cat in sortedCategories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  categories: {
    type: Array,
    required: true,
  },
  sort: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

/**
 * props.categories ist passed as props from parent component.
 * as an Array; we sort them here from a-z.
 */
const sortedCategories = computed(() => {
  if (!props.sort) return props.categories
  return [...props.categories].sort((a, b) => a.localeCompare(b))
})

// emit if 'selected' value updates
const emitUpdate = () => {
  emit('update:modelValue', selected.value)
}
</script>
