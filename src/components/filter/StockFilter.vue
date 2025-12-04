<template>
  <!--  -->
  <section
    class="grid gap-1 md:gap-4 grid-cols-3"
    role="radiogroup"
    aria-label="Lagerbestand filtern"
  >
    <button
      v-for="option in options"
      :key="option.value"
      @click="emit('update:modelValue', option.value)"
      :class="[
        'px-2 md:px-3 py-2 duration-450 text-sm cursor-pointer transition-colors text-white backdrop-blur-lg hover:bg-black/45 active:bg-black/60',
        modelValue === option.value ? 'bg-black/50' : 'bg-black/30',
      ]"
      role="radio"
      :aria-checked="modelValue === option.value"
    >
      <span class="sr-only">Lagerbestand Anzeigen: </span>
      {{ option.label }}
    </button>
  </section>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const options = [
  { value: '', label: 'Alle Produkte' },
  { value: 'true', label: 'Verfügbar' },
  { value: 'false', label: 'Kein Bestand' },
]
</script>
