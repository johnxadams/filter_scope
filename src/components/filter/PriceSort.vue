<template>
  <Dropdown
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :dropdownOptions="sortOptions"
    defaultOption="Standard Reihenfolge"
    placeholder="Nach Preis sortieren"
    :accessLabel="'Nach Preis sortieren Dropdown'"
  />
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue'

defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])

// Sort options für das Dropdown
const sortOptions = ['Price: Low to High', 'Price: High to Low']
</script>
