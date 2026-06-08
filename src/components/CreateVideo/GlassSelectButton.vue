<template>
  <button
    type="button"
    class="inline-flex items-center justify-center gap-2"
    :class="[
      variant === 'dark' ? 'glass_select_button_dark' : 'glass_select_button',
      fullWidth ? 'w-full' : '',
    ]"
    @click="$emit('select')"
  >
    <img
      :src="SparkleIcon"
      alt=""
      class="h-4 w-4"
      :class="{ 'ai_sparkle_icon': animateIcon }"
    />
    Select
  </button>
</template>

<script setup>
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

defineProps({
  variant: {
    type: String,
    default: "light",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  animateIcon: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["select"])
</script>
