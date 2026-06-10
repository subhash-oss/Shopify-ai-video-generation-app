<template>
  <Teleport to="body">
    <Transition name="regenerate_script_modal_fade">
      <div
        v-if="open"
        class="regenerate_script_modal_overlay"
        @click.self="close"
      >
        <div
          class="regenerate_script_modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="regenerate-script-title"
        >
          <div class="flex items-start justify-between gap-4">
            <h2 id="regenerate-script-title" class="heading_h6_semibold primary_text_color">
              Regenerate script
            </h2>
            <button
              type="button"
              class="regenerate_script_modal_close bg-gray-25 border border-gray-25 rounded-md p-lg"
              aria-label="Close"
              @click="close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M9 1L1 9M1 1L9 9" stroke="#28293D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </button>
          </div>

          <p class="paragraph_p3_regular secondary_text_color">
            Describe what you want AI to rewrite
          </p>

          <textarea
            v-model="rewritePrompt"
            rows="5"
            placeholder="e.g. Make it shorter, focus on the price, more energetic tone ..."
            class="regenerate_script_modal_textarea mt-xl regular_border_color p-xl paragraph_p3_regular secondary_text_color"
          />

           <div class='h-[1px] bg-gray-25 mb-xl mt-xl'></div>

          <button
            type="button"
            class="regenerate_script_modal_button"
            :disabled="!canSubmit"
            @click="submit"
          >
            <img :src="SparkleIcon" alt="" class="h-4 w-4 brightness-0 invert" />
            Regenerate Script
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

const open = defineModel({ type: Boolean, default: false })

const props = defineProps({
  initialPrompt: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["regenerate"])

const rewritePrompt = ref("")

const canSubmit = computed(() => rewritePrompt.value.trim().length > 0)

watch(open, (isOpen) => {
  if (isOpen) {
    rewritePrompt.value = props.initialPrompt
  }
})

const close = () => {
  open.value = false
}

const submit = () => {
  if (!canSubmit.value) return
  emit("regenerate", rewritePrompt.value.trim())
  close()
}
</script>
