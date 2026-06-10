<template>
  <div ref="dropdownRef" class="relative w-full lg:min-w-[10rem]">
    <button
      type="button"
      class="category_dropdown_trigger"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <svg
        class="h-4 w-4 shrink-0 text-[#28293d] transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="category_dropdown_menu"
      role="listbox"
    >
      <button
        v-for="(option, index) in options"
        :key="option.value"
        type="button"
        role="option"
        class="category_dropdown_option"
        :class="{ 'category_dropdown_option_divider': index < options.length - 1 }"
        :aria-selected="modelValue === option.value"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)
const dropdownRef = ref(null)

const selectedLabel = computed(() => {
  return props.options.find((option) => option.value === props.modelValue)?.label ?? props.options[0]?.label
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value) => {
  emit("update:modelValue", value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside)
})
</script>
