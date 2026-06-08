<template>
  <section class="w-full">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 class="heading_h6_semibold tracking-tight primary_text_color">
          Select a product
        </h1>
        <p class="label_1_regular mt-md secondary_text_color">
          Choose a product from your Shopify store to generate a video for
        </p>
      </div>

      <div class="flex flex-row gap-3 lg:flex-row lg:items-center">
        <div class="relative min-w-0 flex-1 lg:flex-none">
          <select
            v-model="selectedCategory"
            class="mobile_product_filter w-full pr-10 pl-4 lg:glass_product_filter lg:min-w-[10rem]"
          >
            <option value="all">All categories</option>
            <option value="skincare">Skincare</option>
            <option value="makeup">Makeup</option>
            <option value="wellness">Wellness</option>
          </select>
          <svg
            class="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <div class="relative min-w-0 flex-1 lg:flex-none">
          <svg
            class="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search"
            class="mobile_product_filter w-full rounded-full pr-4 pl-10 placeholder:text-gray-400 lg:glass_product_filter lg:min-w-[12rem]"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-4 lg:gap-6">
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
        @select="$emit('select', product)"
      />
    </div>

    <div
      v-if="showLoading"
      class="mt-6 flex items-center justify-center gap-2 lg:hidden"
    >
      <span class="wizard_loading_spinner" aria-hidden="true" />
      <span class="text-sm font-medium text-[#5F3AA7]">Loading...</span>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import ProductCard from "./ProductCard.vue"
import product_1 from "../../assets/images/product_1.png"
import product_2 from "../../assets/images/product_2.png"
import product_3 from "../../assets/images/product_3.png"
import product_4 from "../../assets/images/product_4.png"

defineEmits(["select"])

const selectedCategory = ref("all")
const searchQuery = ref("")
const isDesktop = ref(false)
const mobilePageSize = 4

const products = [
  { id: 1, name: "Lakme Perfect Radiance Serum", category: "skincare", image: product_1 },
  { id: 2, name: "Pure Gulab Jal - Rose Water", category: "skincare", image: product_2 },
  { id: 3, name: "Love Child Lip & Cheek Tint Soufflé Pot", category: "makeup", image: product_3 },
  { id: 4, name: "Dried Sweet Potato Chunks", category: "wellness", image: product_4 },
  { id: 5, name: "Face Wash - Hairline Line", category: "skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop" },
  { id: 6, name: "PEEL ME UP Hyaluronic Acid Face Serum", category: "skincare", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop" },
  { id: 7, name: "KORIE Rose Berry Mist", category: "skincare", image: "https://images.unsplash.com/photo-1608248543801-ba43fcc4b434?w=400&h=400&fit=crop" },
  { id: 8, name: "Pure Gulab Jal - Rose Water", category: "skincare", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop" },
  { id: 9, name: "Healing Pharma Face Wash", category: "skincare", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop" },
  { id: 10, name: "PEEL ME UP Hyaluronic Acid Face Serum", category: "skincare", image: "https://images.unsplash.com/photo-1617897903246-7192f018345a?w=400&h=400&fit=crop" },
]

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return products.filter((product) => {
    const matchesCategory = selectedCategory.value === "all" || product.category === selectedCategory.value
    const matchesSearch = !query || product.name.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})

const displayedProducts = computed(() => {
  if (isDesktop.value) return filteredProducts.value
  return filteredProducts.value.slice(0, mobilePageSize)
})

const showLoading = computed(() => {
  return !isDesktop.value && filteredProducts.value.length > mobilePageSize
})

const updateBreakpoint = () => {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  updateBreakpoint()
  window.addEventListener("resize", updateBreakpoint)
})

onUnmounted(() => {
  window.removeEventListener("resize", updateBreakpoint)
})
</script>
