<template>
  <section>
    <fieldset aria-label="Produktfilter" class="space-y-4 p-2 md:p-4">
      <SearchBar v-model="searchQuery" />
      <Categories :categories="categories" v-model="selectedCategory" />
      <PriceSort v-model="selectedSort" />
      <StockFilter v-model="stockAvailable" label="Nur verfügbare Produkte" />
      <ResetFilter @reset="handleReset" />
    </fieldset>
    <div aria-live="polite" class="sr-only">
      {{ filteredAndSortedProducts.length }} Produkte gefunden.
    </div>

    <ul role="list" class="grid gap-2 p-2 md:p-4 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-2">
      <ProductListItem
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        :product="product"
      />
    </ul>
  </section>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
import { useProductStore } from '@/stores/productStore.js'
import { sortProductsByPrice } from '@/utils/sortProductsHelper.js'
import ProductListItem from './ProductListItem.vue'
import SearchBar from '@/components/filter/SearchBar.vue'
import Categories from '@/components/filter/Categories.vue'
import PriceSort from '@/components/filter/PriceSort.vue'
import StockFilter from '@/components/filter/StockFilter.vue'
import ResetFilter from '@/components/filter/ResetFilter.vue'

const productStore = useProductStore()

onMounted(() => {
  // Redundant - not a real API call
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()

    return
  }
})

const products = productStore.products

// reactive filter states
const searchQuery = ref('')
const selectedCategory = ref('')
const stockAvailable = ref('')
const selectedSort = ref('')

const filteredAndSortedProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const category = selectedCategory.value

  // filter products based on search query && selected category && stockFilter
  const filtered = products.filter((p) => {
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

  // price sortieren
  return sortProductsByPrice(filtered, selectedSort.value)
})

const categories = computed(() => {
  // make unique list of categories from products
  return [...new Set(productStore.products.map((p) => p.category))]
})

const handleReset = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  stockAvailable.value = ''
  selectedSort.value = ''
}
</script>
