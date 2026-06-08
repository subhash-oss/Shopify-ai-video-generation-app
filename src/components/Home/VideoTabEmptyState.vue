<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="relative mb-6 flex items-center justify-center">
      <div
        class="absolute h-36 w-36 rounded-full bg-[#ede9fe]/80 blur-2xl"
        aria-hidden="true"
      />
      <img
        :src="EmptyStateIllustration"
        alt=""
        class="relative h-auto w-[11rem]"
      />
    </div>
    <p class="heading_h6_semibold secondary_text_color">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import EmptyStateIllustration from "../../assets/images/EmptyStateIllustration.svg"

defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
