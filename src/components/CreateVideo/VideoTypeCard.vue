<template>
  <article
    class="glass_video_type_card group aspect-[2/3] w-full cursor-pointer"
    @click="$emit('select')"
  >
    <img
      :src="videoType.image"
      :alt="videoType.title"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

    <div
      class="absolute inset-0 rounded-3xl border border-white/0 transition-colors duration-300 group-hover:border-white/20"
      aria-hidden="true"
    />

    <div class="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-7">
      <div>
        <h3 class="text-lg font-bold text-white md:text-xl">
          {{ videoType.title }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-white/90">
          {{ videoType.description }}
        </p>
      </div>

      <div class="opacity-0 transition-all duration-300 group-hover:opacity-100">
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
