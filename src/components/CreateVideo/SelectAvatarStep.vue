<template>
  <section class="w-full">
    <button
      type="button"
      class="mb-4 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-medium text-[#5F3AA7] transition-colors hover:text-[#4a2f8a]"
      @click="$emit('back')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Select your video type
    </button>

    <div>
      <h1 class="heading_h6_semibold tracking-tight primary_text_color">
        Select your avatar
      </h1>
      <p class="label_1_regular mt-md secondary_text_color">
        Choose how you want to showcase your product
      </p>
    </div>

    <div class="mt-8 flex gap-4 overflow-x-auto pb-2 md:gap-5">
      <AvatarCard
        v-for="avatar in avatars"
        :key="avatar.id"
        :avatar="avatar"
        @select="$emit('select', avatar)"
      />
    </div>
  </section>
</template>

<script setup>
import AvatarCard from "./AvatarCard.vue"

defineEmits(["back", "select"])

const avatars = [
  {
    id: 1,
    name: "Olivia Stone",
    style: "Elegant & premium",
    bestFor: "Luxury skincare, wellness, high-end brands",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    style: "Professional & confident",
    bestFor: "Corporate, B2B, professional services",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    name: "James Carter",
    style: "Friendly & approachable",
    bestFor: "Lifestyle, fitness, everyday products",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Aanya Sharma",
    style: "Warm & relatable",
    bestFor: "Beauty, fashion, social media content",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
  },
]
</script>
