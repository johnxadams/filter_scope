<template>
  <section>
    <fieldset aria-label="Produktfilter" class="flex items-center flex-col p-2 md:p-4 md:py-8 mb-1">
      <!-- class="flex items-center m-4 flex-col space-y-4 p-2 md:p-4 mb-6 bg-black/5 backdrop-blur-lg" -->

      <div class="w-full sm:w-8/10 md:w-[35rem]">
        <SearchBar v-model="searchQuery" />
      </div>
      <div
        class="flex w-full sm:w-[30rem] md:w-8/10 justify-center mb-2 mt-[-5px] md:mt-[2px] md:mb-4 flex-wrap gap-2 md:gap-4 md:flex-row"
      >
        <Categories :categories="categories" v-model="selectedCategory" />
        <PriceSort v-model="selectedSort" />
        <StockFilter v-model="stockAvailability" />
      </div>
      <ResetFilter @reset="handleReset" />
    </fieldset>
    <div aria-live="polite" class="sr-only">
      {{ filteredAndSortedProducts.length }} Produkte gefunden.
    </div>
    <ul
      role="list"
      tabindex="0"
      class="grid gap-2 p-2 md:p-4 lg:mx-[5rem] grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:col-span-2"
    >
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
import productsData from '@/assets/products.json'

// import { useProductStore } from '@/stores/productStore.js'
import { sortProductsByPrice } from '@/utils/sortProductsHelper.js'
import ProductListItem from './ProductListItem.vue'
import SearchBar from '@/components/filter/SearchBar.vue'
import Categories from '@/components/filter/Categories.vue'
import PriceSort from '@/components/filter/PriceSort.vue'
import StockFilter from '@/components/filter/StockFilter.vue'
import ResetFilter from '@/components/filter/ResetFilter.vue'

// const productStore = useProductStore()
// const products = productStore.products

const products = productsData

// reactive filter states
const searchQuery = ref('')
const selectedCategory = ref('')
const stockAvailability = ref('')
const selectedSort = ref('')

const filteredAndSortedProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const category = selectedCategory.value

  // filter products based on search query && selected category && stockFilter
  const filtered = products.filter((p) => {
    const namesFilter = p.name.toLowerCase().includes(query)
    const categoryFilter = category ? p.category === category : true

    // a chain of ternary operators to handle the three states of stockAvailability -> '', 'true', 'false'
    const inStockFilter =
      stockAvailability.value === ''
        ? true
        : stockAvailability.value === 'true'
          ? p.inStock === true
          : p.inStock === false

    return namesFilter && categoryFilter && inStockFilter
  })

  // price sortieren
  return sortProductsByPrice(filtered, selectedSort.value)
})

const categories = computed(() => {
  // make unique list of categories from products
  // return [...new Set(productStore.products.map((p) => p.category))]
  return [...new Set(products.map((p) => p.category))]
})

const handleReset = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  stockAvailability.value = ''
  selectedSort.value = ''
}
</script>
