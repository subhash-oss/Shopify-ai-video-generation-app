<template>
  <Teleport to="body">
    <Transition name="generating_video_modal_fade">
      <div
        v-if="open"
        class="generating_video_modal_overlay"
      >
        <div
          class="generating_video_modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="generating-video-title"
        >
          <h2 id="generating-video-title" class="heading_h6_semibold primary_text_color">
            Generating your video
          </h2>
          <p class="paragraph_p3_regular secondary_text_color">
            Sit back while our AI creates your video. This usually takes 3–5 minutes.
          </p>

          <div class="generating_video_progress_card">
            <div class="flex items-start justify-between gap-3">
              <span class="text-white heading_h6_bold ">{{ progress }}%</span>
              <span class="generating_video_type_badge text-white label_3_semibold p-1">
                {{ videoTypeLabel }}
              </span>
            </div>

            <div class="generating_video_progress_center">
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
              <p class="label_2_regular mt-md text-black-50">
                Generating Video...
              </p>
            </div>

            <div>
              <p class="label_1_semibold text-white">
                {{ productName }}
              </p>
              <p class="label_2_regular mt-1 text-white">
                {{ duration }}
              </p>
            </div>
          </div>
                <div class='h-[1px] bg-gray-25 mb-xl mt-xl'></div>
          <button
            type="button"
            class="generating_video_home_button label_1_semibold bg-gray-25 primary_border_color primary_text_color"
            @click="goHome"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 17.5V12.5C7.5 12.058 7.67559 11.634 7.98816 11.3215C8.30072 11.0089 8.72464 10.8333 9.16667 10.8333H10.8333C11.2754 10.8333 11.6993 11.0089 12.0118 11.3215C12.3244 11.634 12.5 12.058 12.5 12.5V17.5M4.16667 10H2.5L10 2.5L17.5 10H15.8333V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H5.83333C5.39131 17.5 4.96738 17.3244 4.65482 17.0118C4.34226 16.6993 4.16667 16.2754 4.16667 15.8333V10Z" stroke="#28293D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Back to home
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onUnmounted, ref, watch } from "vue"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

const open = defineModel({ type: Boolean, default: false })

defineProps({
  productName: {
    type: String,
    required: true,
  },
  videoTypeLabel: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: "30 sec",
  },
})

const emit = defineEmits(["home"])

const progress = ref(0)
let progressTimer = null

const clearProgressTimer = () => {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

const startProgress = () => {
  clearProgressTimer()
  progress.value = 0
  progressTimer = setInterval(() => {
    if (progress.value >= 99) {
      clearProgressTimer()
      return
    }
    progress.value += 1
  }, 35)
}

watch(open, (isOpen) => {
  if (isOpen) {
    startProgress()
    return
  }
  clearProgressTimer()
  progress.value = 0
})

onUnmounted(clearProgressTimer)

const goHome = () => {
  emit("home")
  open.value = false
}
</script>
