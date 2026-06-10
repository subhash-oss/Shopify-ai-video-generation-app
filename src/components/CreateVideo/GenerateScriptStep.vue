<template>
  <section class="generate_script_step grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(35.5rem,40rem)_1fr] lg:gap-10 xl:gap-12">
    <VideoSummaryCard
      class="order-2 mt-8xl lg:order-1 lg:mt-0"
      :product="product"
      :video-type="videoType"
      :avatar="avatar"
    />

    <div class="order-1 flex flex-col lg:order-2">
      <template v-if="!scriptGenerated">
        <h1 class="heading_h6_semibold tracking-tight primary_text_color">
          Generate your script
        </h1>
        <p class="label_1_regular mt-md secondary_text_color">
          AI will write a script based on your product details automatically.
        </p>

        <div class="script_ai_box mt-7xl">
          <div class="flex items-start gap-3">
            <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#5F3AA7]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 18C16.5304 18 17.0391 18.2107 17.4142 18.5858C17.7893 18.9609 18 19.4696 18 20C18 19.4696 18.2107 18.9609 18.5858 18.5858C18.9609 18.2107 19.4696 18 20 18C19.4696 18 18.9609 17.7893 18.5858 17.4142C18.2107 17.0391 18 16.5304 18 16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18ZM16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8C18 7.46957 18.2107 6.96086 18.5858 6.58579C18.9609 6.21071 19.4696 6 20 6C19.4696 6 18.9609 5.78929 18.5858 5.41421C18.2107 5.03914 18 4.53043 18 4C18 4.53043 17.7893 5.03914 17.4142 5.41421C17.0391 5.78929 16.5304 6 16 6ZM9 18C9 16.4087 9.63214 14.8826 10.7574 13.7574C11.8826 12.6321 13.4087 12 15 12C13.4087 12 11.8826 11.3679 10.7574 10.2426C9.63214 9.11742 9 7.5913 9 6C9 7.5913 8.36786 9.11742 7.24264 10.2426C6.11742 11.3679 4.5913 12 3 12C4.5913 12 6.11742 12.6321 7.24264 13.7574C8.36786 14.8826 9 16.4087 9 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div>
              <p class="heading_h6_semibold text-[#643EAA]">
                AI powered script
              </p>
              <p class="mt-2 label_1_regular leading-relaxed secondary_text_color">
                AI analyzes your product details and automatically writes a compelling script optimized for your chosen avatar, tone, and platform. No writing skills needed.
              </p>
            </div>
          </div>
        </div>

        <label class="mt-7xl flex cursor-pointer items-center gap-3">
          <input
            v-model="wantsSuggestions"
            type="checkbox"
            class="script_checkbox h-4 w-4 shrink-0 rounded border-gray-50"
          />
          <span class="label_1_regular secondary_text_color">
            I want to add my own suggestions
          </span>
        </label>

        <div v-if="wantsSuggestions" class="mt-7xl">
          <label class="mb-2 block label_2_semibold primary_text_color">
            Describe what you want AI to rewrite
          </label>
          <textarea
            v-model="suggestions"
            rows="5"
            placeholder="e.g. Make it shorter, focus on the price, more energetic tone ..."
            class="w-full resize-none rounded-2xl regular_border_color bg-white p-xl paragraph_p3_regular secondary_text_color outline-none transition-shadow placeholder:secondary_text_color focus:border-[#5F3AA7]/40 focus:ring-2 focus:ring-[#5F3AA7]/10"
          />
        </div>

        <button
          type="button"
          class="generate_script_button mt-7xl inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-gradient-button px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px"
          @click="handleGenerateScript"
        >
          <img :src="SparkleIcon" alt="" class="h-4 w-4 brightness-0 invert" />
          Generate Script
        </button>
      </template>

      <template v-else>
        <h1 class="heading_h6_semibold tracking-tight primary_text_color">
          Edit your script
        </h1>
        <p class="label_1_regular mt-md secondary_text_color">
          AI generated this script from your product — review and edit before generating
        </p>

        <div class="script_ai_box mt-7xl">
          <div class="flex items-start gap-3">
            <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#5F3AA7]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1L9.2 5.2L13.4 6.4L9.2 7.6L8 11.8L6.8 7.6L2.6 6.4L6.8 5.2L8 1Z" />
              <path d="M12.5 10.5L13.1 12.5L15.1 13.1L13.1 13.7L12.5 15.7L11.9 13.7L9.9 13.1L11.9 12.5L12.5 10.5Z" opacity="0.7" />
            </svg>
            <div>
              <p class="heading_h6_semibold text-[#643EAA]">
                AI Summary
              </p>
              <p class="mt-2 text-sm leading-relaxed secondary_text_color">
                {{ aiSummary }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="mb-2 flex items-center justify-between gap-3">
            <label class="flex items-center gap-1.5 text-sm font-semibold primary_text_color">
              AI Generated Script
              <span class="text-[#E53935]">*</span>
              <button
                type="button"
                class="script_info_icon"
                aria-label="Script guidelines"
                title="Keep your script under 1600 characters for best results"
              >
                i
              </button>
            </label>
            <span class="text-sm secondary_text_color">
              {{ scriptLength }} / {{ maxScriptLength }}
            </span>
          </div>

          <textarea
            v-model="generatedScript"
            rows="12"
            :maxlength="maxScriptLength"
            class="script_textarea w-full resize-y"
          />
        </div>

        <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            class="script_regenerate_button label_1_semibold w-auto"
            @click="showRegenerateModal = true"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0267 8.28634C13.8694 9.4863 13.3883 10.6208 12.6352 11.5681C11.8821 12.5155 10.8853 13.24 9.75171 13.6639C8.61813 14.0878 7.39055 14.1951 6.20062 13.9743C5.01068 13.7536 3.90329 13.2131 2.9972 12.4108C2.0911 11.6085 1.4205 10.5747 1.0573 9.42022C0.694096 8.26576 0.652003 7.03422 0.935532 5.85766C1.21906 4.68111 1.81752 3.60392 2.66672 2.74164C3.51591 1.87935 4.58382 1.26449 5.7559 0.963007C9.00507 0.129674 12.3684 1.80217 13.6101 4.91884M14.0826 0.752162V4.91883H9.9159" stroke="#28293D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Regenerate
          </button>

          <button
            type="button"
            class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-gradient-button px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px sm:w-auto sm:min-w-[12rem]"
            @click="showGeneratingModal = true"
          >
            <img :src="SparkleIcon" alt="" class="h-4 w-4 brightness-0 invert" />
            Generate Video
          </button>
        </div>
      </template>
    </div>

    <RegenerateScriptModal
      v-model="showRegenerateModal"
      :initial-prompt="regeneratePrompt"
      @regenerate="handleModalRegenerate"
    />

    <GeneratingVideoModal
      v-model="showGeneratingModal"
      :product-name="product.name"
      :video-type-label="videoType.title"
      duration="30 sec"
      @home="handleGenerateVideo"
    />
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import VideoSummaryCard from "./VideoSummaryCard.vue"
import RegenerateScriptModal from "./RegenerateScriptModal.vue"
import GeneratingVideoModal from "./GeneratingVideoModal.vue"
import SparkleIcon from "../../assets/images/SparkleIcon.svg"

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  videoType: {
    type: Object,
    required: true,
  },
  avatar: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(["generate"])

const maxScriptLength = 1600
const wantsSuggestions = ref(false)
const suggestions = ref("")
const scriptGenerated = ref(false)
const generatedScript = ref("")
const aiSummary = ref("")
const showRegenerateModal = ref(false)
const regeneratePrompt = ref("")
const showGeneratingModal = ref(false)

const scriptLength = computed(() => generatedScript.value.length)

const buildAiSummary = () => {
  const avatarNote = props.avatar
    ? `, tailored for ${props.avatar.name}'s presentation style`
    : ""
  return `This script promotes the ${props.product.name} in a friendly tone${avatarNote}, focused on real user benefits like visible results, smooth texture, and fast improvements. It builds trust with a personal experience feel, highlights product safety, and ends with a natural call to action for viewers to try the product.`
}

const buildGeneratedScript = (variant = 0, rewriteSuggestion = "") => {
  const productName = props.product.name
  const suggestionNote = rewriteSuggestion
    ? `\n\n${rewriteSuggestion}`
    : wantsSuggestions.value && suggestions.value.trim()
      ? `\n\n${suggestions.value.trim()}`
      : ""

  if (props.videoType.id === "cinematic") {
    const openings = [
      `Introducing ${productName} — crafted for those who expect more from their routine.`,
      `${productName} brings professional-grade care into every frame of your day.`,
    ]
    return `${openings[variant % openings.length]}

Every detail delivers targeted care that transforms how your skin looks and feels. Radiance, balance, and confidence — delivered in one elegant formula.

Experience the difference with consistent use — smoother texture, renewed glow, and skin that feels balanced from morning to night.

${productName}. Because your routine deserves results you can see.${suggestionNote}`
  }

  const openings = [
    "If you're looking for something that actually shows results, this is it.",
    "Okay, I need to tell you about this — because it genuinely surprised me.",
  ]

  return `${openings[variant % openings.length]}

The ${productName} improves skin texture and delivers visible results in about a week of regular use. It's gentle for everyday application and leaves skin feeling calm and refreshed.

What I love is how it works without irritation — my skin felt smoother and more balanced after the first few days.

And there's zero side effects with consistent use.

If dull skin or uneven texture bothers you, give this a try — it's worth it.${suggestionNote}`
}

let regenerateCount = 0

const handleGenerateScript = () => {
  regenerateCount = 0
  aiSummary.value = buildAiSummary()
  generatedScript.value = buildGeneratedScript(regenerateCount)
  scriptGenerated.value = true
}

const handleModalRegenerate = (prompt) => {
  regeneratePrompt.value = prompt
  regenerateCount += 1
  aiSummary.value = buildAiSummary()
  generatedScript.value = buildGeneratedScript(regenerateCount, prompt)
}

const handleGenerateVideo = () => {
  emit("generate", {
    script: generatedScript.value,
    aiSummary: aiSummary.value,
    wantsSuggestions: wantsSuggestions.value,
    suggestions: suggestions.value,
  })
}
</script>
