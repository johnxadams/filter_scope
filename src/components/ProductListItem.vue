<template>
  <li role="listitem">
    <article
      class="flex w-[8/10] relative flex-col bg-white/40 min-h-40 md:min-h-90 gap-x-6 border-gray-600 p-6 inset-ring inset-ring-gray-800/20"
      tabindex="0"
    >
      <span
        v-if="!product.inStock"
        tabindex="0"
        class="inline-flex items-center absolute right-2 top-2 px-2 py-1 text-[9px] font-medium text-red-400 inset-ring inset-ring-gray-400/20"
        >Out of Stock</span
      >
      <div class="flex flex-col mt-5 justify-between w-full border-2">
        <p class="font-sans text-xl subpixel-antialiased font-semibold" tabindex="0">
          € {{ product.price }}
        </p>
        <h3 class="text-xs sm:text-sm font-semibold tracking-tight text-black" tabindex="0">
          {{ product.name }}
        </h3>
      </div>
    </article>
  </li>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
