<template>
  <section class="flex w-full flex-col items-center justify-center text-center">
    <div class="mb-xl">
      <img
        :src="EmptyStateIllustration"
        alt="AI video empty state"
        class="h-auto w-[12.5rem]"
      />
    </div>

    <p class="mb-6xl max-w-md heading-h6-medium leading-normal font-medium text-gray-500">
      Generate your first AI video and it will appear here.
    </p>

    <button
      type="button"
      class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-gradient-button  px-6 py-3 text-[0.9375rem] label-semibold text-white  transition-all hover:-translate-y-px "
      @click="$emit('create')"
    >
      <span class="flex items-center text-white">
        <img :src="SparkleIcon" alt="" class="h-4 w-4" />
      </span>
      Create Video
    </button>
  </section>
</template>

<script setup>
import EmptyStateIllustration from "../../assets/images/EmptyStateIllustration.svg"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

defineEmits(["create"])
</script>
