<template>
  <nav
    class="wizard_bottom_nav fixed right-0 bottom-0 left-0 z-20 border-t border-gray-25 bg-white lg:hidden"
    aria-label="Video creation progress"
  >
    <div class="flex items-center justify-around px-8 py-4">
      <div
        v-for="step in steps"
        :key="step.id"
        class="relative flex flex-col items-center"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
          :class="activeStep === step.id ? 'text-[#5F3AA7]' : 'text-[#9c9da6]'"
        >
          <component :is="step.icon" class="h-7 w-7" />
        </div>
        <span
          v-if="activeStep === step.id"
          class="absolute -bottom-1 h-1 w-8 rounded-full bg-[#5F3AA7]"
          aria-hidden="true"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { h } from "vue"

defineProps({
  activeStep: {
    type: String,
    default: "product",
  },
})

const ProductIcon = {
  render() {
    return h("svg", { viewBox: "0 0 32 32", fill: "none" }, [
      h("path", {
        d: "M6 12L16 6L26 12V22L16 28L6 22V12Z",
        fill: "currentColor",
        opacity: "0.2",
      }),
      h("path", {
        d: "M6 12L16 6L26 12V22L16 28L6 22V12Z",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linejoin": "round",
      }),
      h("path", {
        d: "M16 17V28M6 12L16 17L26 12",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linejoin": "round",
      }),
    ])
  },
}

const VideoIcon = {
  render() {
    return h("svg", { viewBox: "0 0 32 32", fill: "none" }, [
      h("rect", {
        x: 5,
        y: 9,
        width: 16,
        height: 14,
        rx: 2,
        fill: "currentColor",
        opacity: "0.2",
      }),
      h("rect", {
        x: 5,
        y: 9,
        width: 16,
        height: 14,
        rx: 2,
        stroke: "currentColor",
        "stroke-width": "1.5",
      }),
      h("path", {
        d: "M21 14L27 11V21L21 18V14Z",
        fill: "currentColor",
        opacity: "0.35",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linejoin": "round",
      }),
    ])
  },
}

const ScriptIcon = {
  render() {
    return h("svg", { viewBox: "0 0 32 32", fill: "none" }, [
      h("path", {
        d: "M9 6H20L25 11V26H9V6Z",
        fill: "currentColor",
        opacity: "0.2",
      }),
      h("path", {
        d: "M9 6H20L25 11V26H9V6Z",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linejoin": "round",
      }),
      h("path", {
        d: "M20 6V11H25M13 16H21M13 20H18",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
      }),
    ])
  },
}

const steps = [
  { id: "product", icon: ProductIcon },
  { id: "video-type", icon: VideoIcon },
  { id: "script", icon: ScriptIcon },
]
</script>
