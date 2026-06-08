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
        <nav class="flex flex-wrap gap-3xl md:gap-6xl " aria-label="Video filters">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="cursor-pointer border-0 bg-transparent pb-lg label_2_regular"
            :class="activeTab === tab.id
              ? 'text-[#5E39A6]'
              : 'secondary_text_color hover:primary_text_color'"
            @click="activeTab = tab.id"
          >
            <span class="relative inline-block">
              {{ tab.label }} ({{ tab.count }})
              <span
                v-if="activeTab === tab.id"
                class="absolute bottom-[-12px] left-0 z-10 h-1 w-full bg-[#5E39A6]"
                aria-hidden="true"
              />
            </span>
          </button>
        </nav>
      </div>
    </div>

    <div class="flex flex-1 items-center justify-center py-12 md:py-16">
      <VideoTabEmptyState
        v-if="showTabEmptyState"
        :message="emptyMessage"
      />

      <div
        v-else
        class="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="glass_card"
        >
          <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-[#f3e8ff] to-[#ede9fe]">
            <span
              v-if="video.status === 'generating'"
              class="text-sm font-semibold text-[#7c3aed]"
            >
              Generating...
            </span>
            <span
              v-else-if="video.status === 'completed'"
              class="text-sm font-semibold text-gray-600"
            >
              Video ready
            </span>
            <span
              v-else
              class="text-sm font-semibold text-red-500"
            >
              Failed
            </span>
          </div>
          <div class="px-4 py-3">
            <p class="truncate text-sm font-semibold text-gray-800">
              {{ video.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import VideoTabEmptyState from "./VideoTabEmptyState.vue"

const props = defineProps({
  videos: {
    type: Array,
    default: () => [],
  },
})

const activeTab = ref("all")

const counts = computed(() => ({
  all: props.videos.length,
  completed: props.videos.filter((v) => v.status === "completed").length,
  generating: props.videos.filter((v) => v.status === "generating").length,
  failed: props.videos.filter((v) => v.status === "failed").length,
}))

const tabs = computed(() => [
  { id: "all", label: "All", count: counts.value.all },
  { id: "completed", label: "Completed", count: counts.value.completed },
  { id: "generating", label: "Generating", count: counts.value.generating },
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
  failed: "No failed videos yet.",
}

const emptyMessage = computed(() => emptyMessages[activeTab.value])

const showTabEmptyState = computed(() => filteredVideos.value.length === 0)
</script>
