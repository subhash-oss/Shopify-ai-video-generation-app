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

    <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
import AvatarOne from "../../assets/images/AvatarOne.png"
import AvatarTwo from "../../assets/images/AvatarTwo.png"
import AvatarThree from "../../assets/images/AvatarThree.png"
import AvatarFour from "../../assets/images/AvatarFour.png"

defineEmits(["back", "select"])

const avatars = [
  {
    id: 1,
    name: "Olivia Stone",
    style: "Elegant & premium",
    bestFor: "Luxury skincare, wellness, high-end brands",
    image: AvatarOne,
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    style: "Professional & confident",
    bestFor: "Corporate, B2B, professional services",
    image: AvatarTwo,
  },
  {
    id: 3,
    name: "James Carter",
    style: "Friendly & approachable",
    bestFor: "Lifestyle, fitness, everyday products",
    image: AvatarThree,
  },
  {
    id: 4,
    name: "Aanya Sharma",
    style: "Warm & relatable",
    bestFor: "Beauty, fashion, social media content",
    image: AvatarFour,
  },
]
</script>
