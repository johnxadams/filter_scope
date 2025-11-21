<template>
  <section>
    <SearchBar v-model="searchQuery" />
    <Categories :categories="categories" v-model="selectedCategory" />
    <StockFilter
      v-model="stockAvailable"
      label="Nur verfügbare Produkte"
      onText="In Stock"
      offText="Out of Stock"
    />

    <div aria-live="polite" class="sr-only">{{ filteredProducts.length }} Produkte gefunden.</div>
    <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      <ProductListItem v-for="product in filteredProducts" :key="product.id" :product="product" />
    </ul>
  </section>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
import { useProductStore } from '@/stores/productStore.js'
import ProductListItem from './ProductListItem.vue'
import SearchBar from './SearchBar.vue'
import Categories from './Categories.vue'
import StockFilter from './StockFilter.vue'

const productStore = useProductStore()

onMounted(() => {
  // Redundant - not a real API call
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()

    return
  }
})

const products = productStore.products

// reactive searchValue & selectedCategory Value
const searchQuery = ref('')
const selectedCategory = ref('')
const stockAvailable = ref('')

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const category = selectedCategory.value
  // filter products based on search query && selected category
  return products.filter((p) => {
    const namesFilter = p.name.toLowerCase().includes(query)
    const categoryFilter = category ? p.category === category : true

    // a chain of ternary operators to handle the three states of stockAvailable -> '', 'true', 'false'
    const inStockFilter =
      stockAvailable.value === ''
        ? true
        : stockAvailable.value === 'true'
          ? p.inStock === true
          : p.inStock === false

    return namesFilter && categoryFilter && inStockFilter
  })
})

const categories = computed(() => {
  // make unique list of categories from products
  return [...new Set(productStore.products.map((p) => p.category))]
})
</script>
