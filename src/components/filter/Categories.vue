<template>
  <Dropdown
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :dropdownOptions="categories"
    defaultOption="Alle Kategorien"
    placeholder="Kategorien
     auswählen"
    :accessLabel="'Kategorie Dropdown'"
  />
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue'

defineProps({
  modelValue: String,
  categories: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>
