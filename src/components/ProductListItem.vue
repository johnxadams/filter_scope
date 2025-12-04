<template>
  <li role="listitem">
    <article
      class="article-aspect flex aspect-[4/3] flex-col bg-white/20 gap-x-6 p-2 pt-1 inset-ring inset-ring-gray-800/20 z-0 opacity-0 transition-all duration-700"
      tabindex="0"
      ref="cardRef"
    >
      <div class="h-6 flex items-end justify-end">
        <span
          v-if="!product.inStock"
          class="px-2 py-0.5 text-[9px] text-red-400 inset-ring inset-ring-gray-400/20"
          tabindex="0"
        >
          Nicht verfügbar
        </span>
      </div>
      <div
        class="price-name-container mt-3 h-30 sm:mt-15 sm:h-40 w-full flex justify-between flex-col items-center"
      >
        <p
          class="font-sans text-xl sm:text-4xl font-thin mb-4 sm:mb-12 subpixel-antialiased"
          tabindex="0"
        >
          € {{ product.price }}
        </p>
        <p class="text-xs sm:text-sm font-extralight text-black" tabindex="0">
          {{ product.name }}
        </p>
      </div>
    </article>
  </li>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cardRef = ref(null)

// defineExpose to allow parent components to access the cardRef
defineExpose({
  cardRef,
})
</script>

<style lang="scss" scoped>
@media (max-width: 395px) {
  .article-aspect {
    height: 10rem;
  }
}
@media (max-width: 466px) {
  .article-aspect {
    width: 100%;
  }
}
</style>
