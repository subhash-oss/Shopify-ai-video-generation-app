<template>
  <header class="glass_panel flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6xl md:py-3xl">
    <div class="glass_panel_sheen" aria-hidden="true" />

    <button
      type="button"
      class="glass_inset_button relative z-10 flex h-11 w-11 shrink-0 items-center justify-center"
      aria-label="Go back"
      @click="$emit('back')"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="#6F707D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <nav
      class="relative z-10 hidden flex-1 lg:flex"
      aria-label="Video creation steps"
    >
      <div
        ref="stepsRowRef"
        class="relative mx-auto flex items-center justify-center gap-6 pb-3 lg:gap-10"
      >
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          :ref="(el) => setStepRef(index, el)"
          type="button"
          class="cursor-default border-0 bg-transparent label_1_semibold font-medium transition-colors"
          :class="getStepClass(step.id)"
        >
          <span class="inline-flex items-center gap-2">
            <img :src="step.icon" alt="" class="h-10xl w-10xl shrink-0" aria-hidden="true" />
            {{ step.label }}
          </span>
        </button>

        <div
          class="wizard_progress_track absolute bottom-0"
          :style="trackStyle"
          aria-hidden="true"
        >
          <div
            class="wizard_progress_fill"
            :style="{ width: fillWidth }"
          />
        </div>
      </div>
    </nav>

    <div class="relative z-10 flex flex-1 items-center justify-end gap-3 lg:flex-none">
      <div class="glass_inset_pill flex items-center gap-2 px-4 py-xl rounded-xl">
        <span class="flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9.87891 19.7578C15.3349 19.7578 19.7578 15.3349 19.7578 9.87891C19.7578 4.42294 15.3349 0 9.87891 0C4.42294 0 0 4.42294 0 9.87891C0 15.3349 4.42294 19.7578 9.87891 19.7578Z" fill="#FFC843" />
            <path d="M9.87891 17.5625C14.1224 17.5625 17.5625 14.1224 17.5625 9.87891C17.5625 5.63537 14.1224 2.19531 9.87891 2.19531C5.63537 2.19531 2.19531 5.63537 2.19531 9.87891C2.19531 14.1224 5.63537 17.5625 9.87891 17.5625Z" fill="#D38700" />
            <path d="M10.2134 5.78852L11.3152 8.02093C11.3696 8.13092 11.4746 8.20731 11.596 8.22509L14.0596 8.58315C14.3656 8.62772 14.4876 9.00355 14.2664 9.21935L12.4838 10.9569C12.396 11.0426 12.3558 11.1662 12.3764 11.2871L12.7973 13.7406C12.8495 14.0453 12.5296 14.2778 12.2561 14.1338L10.0527 12.9753C9.94401 12.9182 9.81426 12.9182 9.7056 12.9753L7.50216 14.1338C7.2284 14.2776 6.90877 14.0453 6.96102 13.7406L7.38186 11.2871C7.40271 11.1662 7.36254 11.0426 7.27451 10.9569L5.49191 9.21935C5.27062 9.00355 5.39268 8.6275 5.69871 8.58315L8.16229 8.22509C8.28369 8.20753 8.38885 8.13114 8.44307 8.02093L9.5449 5.78852C9.68123 5.51125 10.0764 5.51125 10.2134 5.78852Z" fill="#FFC843" />
          </svg>
        </span>
        <span class="label_1_medium tracking-tight text-[#5F3AA7]">12 credits</span>
      </div>

      <RouterLink
        to="/settings"
        class="glass_inset_button flex h-11 w-11 items-center justify-center lg:hidden"
        aria-label="Settings"
      >
        <img :src="SettingsGearIcon" alt="" class="h-5 w-5" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import SettingsGearIcon from "../../assets/images/SettingsGearIcon.svg"
import ProductIcon from "../../assets/images/ProductIcon.svg"
import VideoIcon from "../../assets/images/VideoIcon.svg"
import ScriptIcon from "../../assets/images/ScriptIcon.svg"

const props = defineProps({
  activeStep: {
    type: String,
    default: "product",
  },
})
defineEmits(["back"])

const steps = [
  { id: "product", label: "1. Select product", icon: ProductIcon },
  { id: "video-type", label: "2. Video type", icon: VideoIcon },
  { id: "script", label: "3. Script", icon: ScriptIcon },
]

const stepOrder = steps.map((step) => step.id)

const stepsRowRef = ref(null)
const stepButtonRefs = ref([])

const trackStyle = ref({
  left: "0px",
  width: "0px",
})

const fillWidth = ref("0%")

const setStepRef = (index, el) => {
  if (el) stepButtonRefs.value[index] = el
}

const updateProgressBar = () => {
  const row = stepsRowRef.value
  const buttons = stepButtonRefs.value.filter(Boolean)

  if (!row || buttons.length !== steps.length) return

  const rowRect = row.getBoundingClientRect()
  const firstRect = buttons[0].getBoundingClientRect()
  const lastRect = buttons[buttons.length - 1].getBoundingClientRect()
  const activeIndex = Math.max(0, stepOrder.indexOf(props.activeStep))
  const activeRect = buttons[activeIndex].getBoundingClientRect()

  const trackLeft = firstRect.left - rowRect.left
  const trackWidth = lastRect.right - firstRect.left
  const fillPx = activeRect.right - firstRect.left

  trackStyle.value = {
    left: `${trackLeft}px`,
    width: `${trackWidth}px`,
  }

  fillWidth.value = trackWidth > 0
    ? `${(fillPx / trackWidth) * 100}%`
    : "0%"
}

const getStepClass = (stepId) => {
  const activeIndex = stepOrder.indexOf(props.activeStep)
  const stepIndex = stepOrder.indexOf(stepId)

  if (stepIndex === activeIndex) return "wizard_step_active"
  if (stepIndex < activeIndex) return "wizard_step_completed"
  return "wizard_step_inactive"
}

let resizeObserver = null

onMounted(() => {
  nextTick(() => {
    updateProgressBar()

    if (typeof ResizeObserver !== "undefined" && stepsRowRef.value) {
      resizeObserver = new ResizeObserver(() => updateProgressBar())
      resizeObserver.observe(stepsRowRef.value)
    }

    window.addEventListener("resize", updateProgressBar)
  })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener("resize", updateProgressBar)
})

watch(
  () => props.activeStep,
  () => nextTick(updateProgressBar),
)
</script>
