<template>
  <div class="rounded-2xl bg_secondary_color p-6xl primary_border_color">
    <h2 class="heading_h6_semibold primary_text_color">{{ title }}</h2>
    <p class="label_1_regular mt-md secondary_text_color">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "This section will be available soon.",
  },
})
</script>
