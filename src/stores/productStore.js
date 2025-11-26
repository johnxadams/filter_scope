import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import productsData from '@/assets/products.json'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: productsData,
  }),
  actions: {
    fetchProducts() {
      // this.products = productsData
    },
  },
  getters: {
    // allProducts: (state) => state.products,
    // productCount: (state) => state.products.length,
  },
})
