<template>
  <section class="w-full">
    <div>
      <h1 class="heading_h6_semibold tracking-tight primary_text_color">
        Select your video type
      </h1>
      <p class="label_1_regular mt-md secondary_text_color">
        Choose how you want to showcase your product
      </p>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4 lg:gap-6">
      <VideoTypeCard
        v-for="videoType in videoTypes"
        :key="videoType.id"
        :video-type="videoType"
        @select="$emit('select', videoType)"
      />
    </div>
  </section>
</template>

<script setup>
import VideoTypeCard from "./VideoTypeCard.vue"

defineEmits(["select"])

const videoTypes = [
  {
    id: "ai-ugc",
    title: "AI UGC",
    description: "An AI avatar presents your product like a real creator or influencer — with natural speech and lip-sync.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
  },
  {
    id: "cinematic",
    title: "Cinematic Product Video",
    description: "High quality AI-generated motion video showcasing your product with professional lighting and visuals.",
    image: "https://images.unsplash.com/photo-1620916566395-065894ea3858?w=600&h=800&fit=crop",
  },
]
</script>
