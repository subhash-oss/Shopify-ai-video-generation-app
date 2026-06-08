<template>
  <article
    class="group relative aspect-[3/4] w-full min-w-[10rem] cursor-pointer overflow-hidden rounded-3xl sm:min-w-[12rem]"
    @click="$emit('select')"
  >
    <img
      :src="avatar.image"
      :alt="avatar.name"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

    <div class="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 md:p-5">
      <div>
        <h3 class="text-base font-bold text-white md:text-lg">
          {{ avatar.name }}
        </h3>
        <p class="mt-1 text-xs leading-relaxed text-white/80 md:text-sm">
          {{ avatar.style }}
        </p>
        <p class="mt-1 text-xs text-white/70 md:text-sm">
          Best for: {{ avatar.bestFor }}
        </p>
      </div>

      <div class="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
  avatar: {
    type: Object,
    required: true,
  },
})

defineEmits(["select"])
</script>
