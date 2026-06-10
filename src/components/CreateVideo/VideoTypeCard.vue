<template>
  <article
    class="glass_video_type_card group relative aspect-[1.5/2.5] w-full cursor-pointer overflow-hidden rounded-3xl"
    @click="$emit('select')"
  >
    <img
      :src="videoType.image"
      :alt="videoType.title"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />

    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 from-25% to-transparent" />

    <div
      class="pointer-events-none absolute inset-0 rounded-3xl border border-white/0 transition-colors duration-300 group-hover:border-white/20"
      aria-hidden="true"
    />

    <div class="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
      <div
        class="transition-transform duration-500 ease-out lg:group-hover:-translate-y-16"
      >
        <h3 class="heading_h6_bold text-white">
          {{ videoType.title }}
        </h3>
        <p class="mt-md label_2_regular leading-relaxed text-white/90">
          {{ videoType.description }}
        </p>
      </div>

      <div
        class="mt-4 transition-all duration-500 ease-out lg:absolute lg:inset-x-6 lg:bottom-6 lg:mt-0 lg:translate-y-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
      >
        <GlassSelectButton
          variant="dark"
          full-width
          @select.stop="$emit('select')"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import GlassSelectButton from "./GlassSelectButton.vue"

defineProps({
  videoType: {
    type: Object,
    required: true,
  },
})

defineEmits(["select"])
</script>
