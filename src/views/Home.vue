<template>
  <CreateVideoFlow
    v-if="showCreateFlow"
    @close="showCreateFlow = false"
    @complete="handleFlowComplete"
  />

  <div
    v-else
    class="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f3e8ff] from-0% via-[#f8f4ff] via-[5%] to-white to-20%"
  >
    <div
      class="pointer-events-none absolute -top-24 left-[10%] h-[22rem] w-[22rem] rounded-full bg-[rgba(196,181,253,0.45)] blur-[80px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-0 right-[5%] h-[18rem] w-[18rem] rounded-full bg-[rgba(221,214,254,0.4)] blur-[80px]"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6xl pt-5xl md:px-13xl"
      :class="hasVideos ? 'pb-28 lg:pb-8' : 'pb-6'"
    >
      <GlassHeader
        :show-create-button="hasVideos"
        @create="handleCreateVideo"
      />

      <main
        class="flex w-full flex-1"
        :class="hasVideos ? 'flex-col' : 'items-center justify-center'"
      >
        <VideoEmptyState v-if="!hasVideos" @create="handleCreateVideo" />
        <MyVideos
          v-else
          :videos="videos"
          @preview="handlePreviewVideo"
          @regenerate="handleRegenerateVideo"
          @delete="handleDeleteVideo"
        />
      </main>
    </div>

    <div
      v-if="hasVideos"
      class="glass_bar fixed right-0 bottom-0 left-0 z-20 p-md text-center bg-gray-25 lg:hidden"
    >
      <CreateNewVideoButton full-width @create="handleCreateVideo" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import GlassHeader from "../components/Home/GlassHeader.vue"
import VideoEmptyState from "../components/Home/VideoEmptyState.vue"
import MyVideos from "../components/Home/MyVideos.vue"
import CreateNewVideoButton from "../components/Home/CreateNewVideoButton.vue"
import CreateVideoFlow from "../components/CreateVideo/CreateVideoFlow.vue"
import VideoImageOne from "../assets/images/VideoImageOne.png"
import VideoImageTwo from "../assets/images/VideoImageTwo.png"
import VideoImageThree from "../assets/images/VideoImageThree.png"

const videos = ref([
  {
    id: 1,
    title: "Vitamin C Serum for Men",
    status: "generating",
    progress: 99,
    videoType: "AI UGC",
    duration: "16 sec",
  },
  {
    id: 2,
    title: "Purepet Adult Dry Cat Food",
    status: "completed",
    videoType: "AI UGC",
    duration: "30 sec",
    date: "May 20, 2026",
    thumbnail: VideoImageOne,
  },
  {
    id: 3,
    title: "Body & Skin Whitening Serum",
    status: "completed",
    videoType: "Cinematic",
    duration: "16 sec",
    date: "May 19, 2026",
    thumbnail: VideoImageTwo,
  },
  {
    id: 4,
    title: "Vitamin C Serum for Men",
    status: "completed",
    videoType: "AI UGC",
    duration: "16 sec",
    date: "May 19, 2026",
    thumbnail: VideoImageThree,
  },
])
const showCreateFlow = ref(false)

const hasVideos = computed(() => videos.value.length > 0)

const handleCreateVideo = () => {
  showCreateFlow.value = true
}

const handleFlowComplete = ({ product, videoType }) => {
  showCreateFlow.value = false
  videos.value.unshift({
    id: Date.now(),
    title: product?.name ?? "Product Showcase Video",
    status: "generating",
    progress: 0,
    videoType: videoType?.title ?? "AI UGC",
    duration: "30 sec",
  })
}

const handlePreviewVideo = (video) => {
  if (video.thumbnail) {
    window.open(video.thumbnail, "_blank", "noopener,noreferrer")
  }
}

const handleRegenerateVideo = (video) => {
  const index = videos.value.findIndex((item) => item.id === video.id)
  if (index === -1) return

  videos.value[index] = {
    ...videos.value[index],
    status: "generating",
    progress: 0,
  }
}

const handleDeleteVideo = (video) => {
  videos.value = videos.value.filter((item) => item.id !== video.id)
}
</script>
