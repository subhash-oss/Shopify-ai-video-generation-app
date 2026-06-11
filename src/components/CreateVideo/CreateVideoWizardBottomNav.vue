<template>
  <nav
    class="wizard_bottom_nav fixed right-0 bottom-0 left-0 z-20 border-t border-gray-25 bg-white lg:hidden"
    aria-label="Video creation progress"
  >
    <div
      ref="stepsRowRef"
      class="relative px-8 pb-3 pt-4"
    >
      <div class="flex items-center justify-around">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          :ref="(el) => setStepRef(index, el)"
          class="flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
          :class="getStepClass(step.id)"
        >
          <img :src="step.icon" alt="" class="h-9xl w-9xl" aria-hidden="true" />
        </div>
      </div>

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
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import ProductIcon from "../../assets/images/ProductIcon.svg"
import VideoIcon from "../../assets/images/VideoIcon.svg"
import ScriptIcon from "../../assets/images/ScriptIcon.svg"

const props = defineProps({
  activeStep: {
    type: String,
    default: "product",
  },
})

const steps = [
  { id: "product", icon: ProductIcon },
  { id: "video-type", icon: VideoIcon },
  { id: "script", icon: ScriptIcon },
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
