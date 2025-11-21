<template>
  <section>
    <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      <ProductListItem v-for="product in products" :key="product.id" :product="product" />
    </ul>
  </section>
</template>
<script setup>
import ProductListItem from './ProductListItem.vue'
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore.js'

const productStore = useProductStore()

onMounted(() => {
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()
    console.log(productStore.products)
    return
  }
})

const products = productStore.products
</script>
