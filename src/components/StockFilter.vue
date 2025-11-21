<template>
  <div class="flex gap-2 mb-4">
    <button
      v-for="option in options"
      :key="option.value"
      @click="select(option.value)"
      :class="[
        'px-4 py-2 rounded-md border transition-colors',
        selected === option.value
          ? 'bg-indigo-500 text-white border-indigo-500'
          : 'bg-gray-800 text-gray-200 border-gray-600',
      ]"
      role="radio"
      :aria-checked="selected === option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue || '')

const options = [
  { value: '', label: 'Alle Produkte' },
  { value: 'true', label: 'In Stock' },
  { value: 'false', label: 'Out of Stock' },
]

const select = (value) => {
  selected.value = value
  // eslint-disable-next-line no-console
  console.log('value   : ', value)
  emit('update:modelValue', value)
}

watch(selected, (val) => emit('update:modelValue', val))
</script>
