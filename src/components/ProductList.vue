<template>
  <section>PINIA</section>
</template>
<script setup>
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
</script>
