<template>
  <button
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-gradient-button px-6 py-xl label_1_semibold text-white transition-all hover:-translate-y-px lg:w-auto"
    @click="$emit('create')"
  >
    <img :src="SparkleIcon" alt="" class="h-4 w-4 brightness-0 invert" />
    Create New Video
  </button>
</template>

<script setup>
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["create"])
</script>
