<template>
  <section class="flex w-full flex-1 flex-col pt-8 md:pt-10xl">
    <div class="w-full">
      <h1 class="heading_h6_semibold tracking-tight primary_text_color">
        My Videos
      </h1>
      <p class="label_1_regular mt-md secondary_text_color">
        Download and share your videos for the world to see!
      </p>

      <div class="mt-6xl border-b border-gray-25">
        <nav class="flex flex-wrap gap-3xl md:gap-6xl" aria-label="Video filters">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="cursor-pointer border-0 bg-transparent pb-lg label_2_regular"
            :class="activeTab === tab.id
              ? 'font-semibold text-[#5E39A6]'
              : 'secondary_text_color hover:primary_text_color'"
            @click="handleTabChange(tab.id)"
          >
            <span class="relative inline-block">
              {{ tab.label }} ({{ tab.count }})
              <span
                v-if="activeTab === tab.id"
                class="absolute bottom-[-12px] left-0 z-10 h-1 w-full rounded-full bg-[#5E39A6]"
                aria-hidden="true"
              />
            </span>
          </button>
        </nav>
      </div>
    </div>

    <div class="mt-6xl w-full flex-1">
      <VideoTabEmptyState
        v-if="showTabEmptyState"
        :message="emptyMessage"
      />

      <div
        v-else
        ref="gridRef"
        class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4  md:gap-5"
        @click="closeMenu"
      >
        <MyVideoCard
          v-for="video in filteredVideos"
          :key="video.id"
          :video="video"
          :menu-open="openMenuVideoId === video.id"
          @toggle-menu="toggleMenu(video.id)"
          @close-menu="closeMenu"
          @preview="$emit('preview', $event)"
          @regenerate="$emit('regenerate', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import VideoTabEmptyState from "./VideoTabEmptyState.vue"
import MyVideoCard from "./MyVideoCard.vue"

const props = defineProps({
  videos: {
    type: Array,
    default: () => [],
  },
})

defineEmits(["preview", "regenerate", "delete"])

const activeTab = ref("all")
const openMenuVideoId = ref(null)
const gridRef = ref(null)

const toggleMenu = (videoId) => {
  openMenuVideoId.value = openMenuVideoId.value === videoId ? null : videoId
}

const closeMenu = () => {
  openMenuVideoId.value = null
}

const handleDocumentClick = (event) => {
  if (openMenuVideoId.value === null) return
  if (gridRef.value?.contains(event.target)) return
  closeMenu()
}

const handleTabChange = (tabId) => {
  activeTab.value = tabId
  closeMenu()
}

onMounted(() => {
  document.addEventListener("click", handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick)
})

const counts = computed(() => ({
  all: props.videos.length,
  completed: props.videos.filter((v) => v.status === "completed").length,
  generating: props.videos.filter((v) => v.status === "generating").length,
  drafted: props.videos.filter((v) => v.status === "drafted").length,
  failed: props.videos.filter((v) => v.status === "failed").length,
}))

const tabs = computed(() => [
  { id: "all", label: "All", count: counts.value.all },
  { id: "completed", label: "Completed", count: counts.value.completed },
  { id: "generating", label: "Generating", count: counts.value.generating },
  { id: "drafted", label: "Drafted", count: counts.value.drafted },
  { id: "failed", label: "Failed", count: counts.value.failed },
])

const filteredVideos = computed(() => {
  if (activeTab.value === "all") return props.videos
  return props.videos.filter((v) => v.status === activeTab.value)
})

const emptyMessages = {
  all: "No videos yet.",
  completed: "No completed videos yet.",
  generating: "No videos generating yet.",
  drafted: "No drafted videos yet.",
  failed: "No failed videos yet.",
}

const emptyMessage = computed(() => emptyMessages[activeTab.value])

const showTabEmptyState = computed(() => filteredVideos.value.length === 0)
</script>
