<template>
  <article
    class="relative aspect-[1.5/2.5] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(95,58,167,0.12)]"
    :class="{ group: isInteractive }"
  >
    <div
      v-if="video.status === 'generating'"
      class="relative flex h-full flex-col justify-between overflow-hidden p-4xl"
    >
      <GeneratingVideoBackground />

      <div class="relative z-10 flex items-start justify-between gap-3">
        <span class="heading_h6_bold text-white">{{ video.progress ?? 0 }}%</span>
        <span class="rounded-full border border-white/45 px-2.5 py-0.5 label_3_semibold text-white">
          {{ video.videoType }}
        </span>
      </div>

      <div class="relative z-10 flex flex-1 flex-col items-center justify-center py-4">
        <div class="relative flex items-center justify-center">
          <img
            :src="SparkleIcon"
            alt=""
            class="generating_video_sparkle_main h-8 w-8 brightness-0 invert"
          />
          <img
            :src="SparkleIcon"
            alt=""
            class="generating_video_sparkle_left absolute -left-5 top-1 h-4 w-4 brightness-0 invert opacity-80"
          />
          <img
            :src="SparkleIcon"
            alt=""
            class="generating_video_sparkle_right absolute -right-5 top-2 h-3.5 w-3.5 brightness-0 invert opacity-70"
          />
        </div>
        <p class="label_2_regular mt-md text-white/80">
          Generating Video...
        </p>
      </div>

      <div class="relative z-10">
        <p class="label_1_semibold text-white">
          {{ video.title }}
        </p>
        <p class="label_2_regular mt-1 text-white/80">
          {{ video.duration }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="relative h-full w-full"
    >
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 from-25% to-transparent" />

      <div
        class="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-300 group-hover:border-white/20"
        aria-hidden="true"
      />

      <span class="absolute right-3 top-3 z-10 rounded-full border border-white/45 px-2.5 py-0.5 label_3_semibold text-white">
        {{ video.videoType }}
      </span>

      <div
        v-if="isInteractive"
        class="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5"
      >
        <div
          v-if="menuOpen"
          class="absolute right-0 bottom-full z-20 mb-2 w-[10.5rem] overflow-hidden rounded-2xl border border-white/80 bg-white/70 p-1 shadow-[0_12px_40px_rgba(40,41,61,0.18)] backdrop-blur-lg"
          @click.stop
        >
          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-3 border-0 border-b border-gray-25 bg-transparent px-3 py-2.5 text-left label_2_regular primary_text_color transition-colors hover:bg-white/60"
            @click.stop="handleMenuAction('preview')"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4.66699 3.33301L11.3337 8.00033L4.66699 12.6677V3.33301Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Preview
          </button>
          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-3 border-0 border-b border-gray-25 bg-transparent px-3 py-2.5 text-left label_2_regular primary_text_color transition-colors hover:bg-white/60"
            @click.stop="handleMenuAction('regenerate')"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.3337 8.00033C13.3337 10.9459 10.9459 13.3337 8.00033 13.3337C5.05481 13.3337 2.66699 10.9459 2.66699 8.00033C2.66699 5.05481 5.05481 2.66699 8.00033 2.66699C9.4148 2.66699 10.6909 3.21461 11.6198 4.11461M13.3337 2.66699V4.66699H11.3337" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Regenerate
          </button>
          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent px-3 py-2.5 text-left label_2_regular primary_text_color transition-colors hover:bg-white/60"
            @click.stop="handleMenuAction('delete')"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.33301 4.66699H12.6663M6.66634 4.66699V3.33366C6.66634 2.96547 6.96482 2.66699 7.33301 2.66699H8.66634C9.03453 2.66699 9.33301 2.96547 9.33301 3.33366V4.66699M12.6663 4.66699V12.667C12.6663 13.0352 12.3679 13.3337 11.9997 13.3337H3.99967C3.63148 13.3337 3.33301 13.0352 3.33301 12.667V4.66699H12.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Delete
          </button>
        </div>

        <div
          class="transition-transform duration-500 ease-out lg:group-hover:-translate-y-14"
        >
          <p class="truncate label_1_semibold text-white">
            {{ video.title }}
          </p>
          <p class="label_2_regular mt-1 text-white/80">
            {{ metaLine }}
          </p>
        </div>

        <div
          class="mt-3 flex items-center gap-2 transition-all duration-500 ease-out lg:absolute lg:inset-x-4 lg:bottom-4 lg:mt-0 lg:translate-y-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          <button
            type="button"
            class="glass_select_button_dark min-w-0 flex-1 px-4 py-2.5 label_2_semibold"
            :disabled="isDownloading"
            @click.stop="handleDownload"
          >
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.75 11.5833V13.25C0.75 13.692 0.925595 14.116 1.23816 14.4285C1.55072 14.7411 1.97464 14.9167 2.41667 14.9167H12.4167C12.8587 14.9167 13.2826 14.7411 13.5952 14.4285C13.9077 14.116 14.0833 13.692 14.0833 13.25V11.5833M11.5833 6.58333L7.41667 10.75L3.25 6.58333M7.41667 10.75V0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            {{ isDownloading ? "Downloading..." : "Download" }}
          </button>

          <button
            type="button"
            class="glass_select_button_dark flex h-10 w-10 shrink-0 items-center justify-center p-0 label_2_semibold"
            :aria-label="menuOpen ? 'Close menu' : 'More options'"
            aria-haspopup="menu"
            :aria-expanded="menuOpen"
            @click.stop="emit('toggle-menu')"
          >
            <svg
              v-if="menuOpen"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="3.5" cy="8" r="1.25" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
              <circle cx="12.5" cy="8" r="1.25" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        v-else
        class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pb-4 pt-20"
      >
        <p class="label_1_semibold text-white">
          {{ video.title }}
        </p>
        <p class="label_2_regular mt-1 text-white/80">
          {{ metaLine }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"
import GeneratingVideoBackground from "./GeneratingVideoBackground.vue"

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  menuOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["preview", "regenerate", "delete", "toggle-menu", "close-menu"])

const isDownloading = ref(false)

const isInteractive = computed(() => props.video.status === "completed" && !!props.video.thumbnail)

const metaLine = computed(() => {
  if (props.video.status === "completed" && props.video.date) {
    return `${props.video.duration} • ${props.video.date}`
  }
  return props.video.duration
})

const closeMenu = () => {
  emit("close-menu")
}

const sanitizeFilename = (name) =>
  name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "video"

const handleDownload = async () => {
  if (!props.video.thumbnail || isDownloading.value) return

  isDownloading.value = true
  const filename = `${sanitizeFilename(props.video.title)}.jpg`

  try {
    const response = await fetch(props.video.thumbnail)
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = objectUrl
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(objectUrl)
  } catch {
    const anchor = document.createElement("a")
    anchor.href = props.video.thumbnail
    anchor.download = filename
    anchor.target = "_blank"
    anchor.rel = "noopener"
    anchor.click()
  } finally {
    isDownloading.value = false
    closeMenu()
  }
}

const handleMenuAction = (action) => {
  closeMenu()

  if (action === "preview") {
    emit("preview", props.video)
    return
  }

  if (action === "regenerate") {
    emit("regenerate", props.video)
    return
  }

  if (action === "delete") {
    emit("delete", props.video)
  }
}
</script>
