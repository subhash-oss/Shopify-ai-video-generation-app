<template>
  <article
    class="glass_product_card group"
    @click="$emit('select')"
  >
    <div class="glass_product_card_glow" aria-hidden="true" />
    <div class="glass_product_card_sheen" aria-hidden="true" />
    <div class="glass_product_card_edge" aria-hidden="true" />

    <div class="glass_product_image">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
      />

      <div class="glass_product_overlay">
        <div
          class="absolute inset-0 rounded-2xl border border-white/15"
          aria-hidden="true"
        />
        <GlassSelectButton animate-icon @select.stop="$emit('select')" />
      </div>
    </div>

    <div class="glass_product_title">
      <p class="line-clamp-2 text-sm font-medium leading-snug primary_text_color">
        {{ product.name }}
      </p>
    </div>
  </article>
</template>

<script setup>
import GlassSelectButton from "./GlassSelectButton.vue"

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(["select"])
</script>
