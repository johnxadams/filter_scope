<template>
  <section>
    <SearchBar v-model="searchQuery" />
    <div aria-live="polite" class="sr-only">{{ filteredProducts.length }} Produkte gefunden.</div>
    <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      <ProductListItem v-for="product in filteredProducts" :key="product.id" :product="product" />
    </ul>
  </section>
</template>
<script setup>
import ProductListItem from './ProductListItem.vue'
import SearchBar from './SearchBar.vue'
import { onMounted, computed, ref } from 'vue'
import { useProductStore } from '@/stores/productStore.js'

const productStore = useProductStore()

onMounted(() => {
  // Redundant - not a real API call
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()
    console.log(productStore.products)
    return
  }
})

const products = productStore.products

const searchQuery = ref('')

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return products.filter((p) => p.name.toLowerCase().includes(query))
})
</script>
