<template>
  <!-- @update:modelValue="$emit('update:modelValue', $event)" -->
  <Dropdown
    :modelValue="modelValue"
    @update:modelValue="handleUpdate"
    :dropdownOptions="categories"
    defaultOption="Alle Kategorien"
    :accessLabel="'Kategorie Dropdown'"
    placeholder="Kategorien
      auswählen"
  />
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue'
import { onMounted, computed, ref } from 'vue'

const props = defineProps({
  modelValue: String,
  categories: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function handleUpdate(value) {
  console.log('Selected in Categories.vue:', value)
  // eslint-disable-next-line no-console
  console.log('props.modelValue   : ', props.modelValue)
  emit('update:modelValue', value)
}

onMounted(() => {
  console.log('Categories.vue mounted with categories:', props.categories)
})
</script>
