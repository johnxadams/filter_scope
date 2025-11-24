<template>
  <div class="flex gap-2 mb-4" role="radiogroup" aria-label="Lagerbestand filtern">
    <button
      v-for="option in options"
      :key="option.value"
      @click="emit('update:modelValue', option.value)"
      :class="[
        'px-4 py-2 text-sm md:text-base duration-450 cursor-pointer transition-colors text-white backdrop-blur-lg hover:bg-black/10',
        modelValue === option.value ? 'bg-black/10' : 'bg-white/10',
      ]"
      role="radio"
      :aria-checked="selected === option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue || '')

// Nice to have -> Produkte label mit pinia fetchen und dynamisch anzeigen
const options = [
  { value: '', label: 'Alle Produkte' },
  { value: 'true', label: 'In Stock' },
  { value: 'false', label: 'Out of Stock' },
]
</script>
