<template>
  <section class="w-full">
    <div>
      <h1 class="heading_h5_semibold tracking-tight primary_text_color">
        Select your video type
      </h1>
      <p class="label_1_regular mt-md secondary_text_color">
        Choose how you want to showcase your product
      </p>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
import CinematicVideo from "../../assets/images/CinematicVideo.png"
import AiUgc from "../../assets/images/AiUgc.png"

defineEmits(["select"])

const videoTypes = [
  {
    id: "ai-ugc",
    title: "AI UGC",
    description: "An AI avatar presents your product like a real creator or influencer — with natural speech and lip-sync.",
    image: AiUgc,
  },
  {
    id: "cinematic",
    title: "Cinematic Product Video",
    description: "High quality AI-generated motion video showcasing your product with professional lighting and visuals.",
    image: CinematicVideo,
  },
]
</script>
