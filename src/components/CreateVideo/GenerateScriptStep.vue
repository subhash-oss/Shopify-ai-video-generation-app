<template>
  <section class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(35.5rem,40rem)_1fr] lg:gap-10 xl:gap-12">
    <VideoSummaryCard
      :product="product"
      :video-type="videoType"
      :avatar="avatar"
    />

    <div class="flex flex-col">
      <h1 class="heading_h6_semibold tracking-tight primary_text_color">
        Generate your script
      </h1>
      <p class="label_1_regular mt-md secondary_text_color">
        AI will write a script based on your product details automatically.
      </p>

      <div class="script_ai_box mt-6">
        <div class="flex items-start gap-3">
          <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#5F3AA7]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M16 18C16.5304 18 17.0391 18.2107 17.4142 18.5858C17.7893 18.9609 18 19.4696 18 20C18 19.4696 18.2107 18.9609 18.5858 18.5858C18.9609 18.2107 19.4696 18 20 18C19.4696 18 18.9609 17.7893 18.5858 17.4142C18.2107 17.0391 18 16.5304 18 16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18ZM16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8C18 7.46957 18.2107 6.96086 18.5858 6.58579C18.9609 6.21071 19.4696 6 20 6C19.4696 6 18.9609 5.78929 18.5858 5.41421C18.2107 5.03914 18 4.53043 18 4C18 4.53043 17.7893 5.03914 17.4142 5.41421C17.0391 5.78929 16.5304 6 16 6ZM9 18C9 16.4087 9.63214 14.8826 10.7574 13.7574C11.8826 12.6321 13.4087 12 15 12C13.4087 12 11.8826 11.3679 10.7574 10.2426C9.63214 9.11742 9 7.5913 9 6C9 7.5913 8.36786 9.11742 7.24264 10.2426C6.11742 11.3679 4.5913 12 3 12C4.5913 12 6.11742 12.6321 7.24264 13.7574C8.36786 14.8826 9 16.4087 9 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div>
            <p class="text-sm font-semibold text-[#5F3AA7]">
              AI powered script
            </p>
            <p class="mt-2 text-sm leading-relaxed secondary_text_color">
              AI analyzes your product details and automatically writes a compelling script optimized for your chosen avatar, tone, and platform. No writing skills needed.
            </p>
          </div>
        </div>
      </div>

      <label class="mt-6 flex cursor-pointer items-center gap-3">
        <input
          v-model="wantsSuggestions"
          type="checkbox"
          class="script_checkbox h-4 w-4 shrink-0 rounded border-gray-50"
        />
        <span class="text-sm font-medium primary_text_color">
          I want to add my own suggestions
        </span>
      </label>

      <div v-if="wantsSuggestions" class="mt-5">
        <label class="mb-2 block text-sm font-semibold primary_text_color">
          Describe what you want AI to rewrite
        </label>
        <textarea
          v-model="suggestions"
          rows="5"
          placeholder="e.g. Make it shorter, focus on the price, more energetic tone ..."
          class="w-full resize-none rounded-2xl border border-gray-50 bg-white px-4 py-3 text-sm primary_text_color outline-none transition-shadow placeholder:text-gray-400 focus:border-[#5F3AA7]/40 focus:ring-2 focus:ring-[#5F3AA7]/10"
        />
      </div>

      <button
        type="button"
        class="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-gradient-button px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px sm:w-auto sm:min-w-[12rem]"
        @click="$emit('generate', { wantsSuggestions, suggestions })"
      >
        <img :src="SparkleIcon" alt="" class="h-4 w-4 brightness-0 invert" />
        Generate Script
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import VideoSummaryCard from "./VideoSummaryCard.vue"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

defineProps({
  product: {
    type: Object,
    required: true,
  },
  videoType: {
    type: Object,
    required: true,
  },
  avatar: {
    type: Object,
    default: null,
  },
})

defineEmits(["generate"])

const wantsSuggestions = ref(false)
const suggestions = ref("")
</script>
