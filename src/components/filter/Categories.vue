<template>
  <Dropdown
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :dropdownOptions="categories"
    defaultOption="Alle Kategorien"
    :accessLabel="'Kategorie Dropdown'"
    placeholder="Kategorien
      auswählen"
  />
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue'

const props = defineProps({
  modelValue: String,
  categories: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>
