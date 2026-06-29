<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f3e8ff] from-0% via-[#f8f4ff] via-[5%] to-white to-20%">
    <div
      class="pointer-events-none absolute -top-24 left-[10%] h-[22rem] w-[22rem] rounded-full bg-[rgba(196,181,253,0.45)] blur-[80px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-0 right-[5%] h-[18rem] w-[18rem] rounded-full bg-[rgba(221,214,254,0.4)] blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6xl pb-24 pt-5xl lg:px-13xl lg:pb-8">
      <CreateVideoWizardHeader
        :active-step="headerStep"
        @back="handleBack"
      />

      <CreateVideoWizardBottomNav
        :active-step="headerStep"
      />

      <main class="mt-8 flex w-full flex-1 flex-col">
        <SelectProductStep
          v-if="currentView === 'product'"
          @select="handleProductSelect"
        />
        <SelectVideoTypeStep
          v-else-if="currentView === 'video-type'"
          @select="handleVideoTypeSelect"
        />
        <SelectAvatarStep
          v-else-if="currentView === 'avatar'"
          @back="currentView = 'video-type'"
          @select="handleAvatarSelect"
        />
        <GenerateScriptStep
          v-else-if="currentView === 'script'"
          :product="selectedProduct"
          :video-type="selectedVideoType"
          :avatar="selectedAvatar"
          @generate="finishFlow"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import CreateVideoWizardHeader from "./CreateVideoWizardHeader.vue"
import CreateVideoWizardBottomNav from "./CreateVideoWizardBottomNav.vue"
import SelectProductStep from "./SelectProductStep.vue"
import SelectVideoTypeStep from "./SelectVideoTypeStep.vue"
import SelectAvatarStep from "./SelectAvatarStep.vue"
import GenerateScriptStep from "./GenerateScriptStep.vue"

const emit = defineEmits(["close", "complete"])

const currentView = ref("product")
const selectedProduct = ref(null)
const selectedVideoType = ref(null)
const selectedAvatar = ref(null)

const headerStep = computed(() => {
  if (currentView.value === "product") return "product"
  if (currentView.value === "script") return "script"
  return "video-type"
})

const handleBack = () => {
  if (currentView.value === "script") {
    if (selectedVideoType.value?.id === "ai-ugc") {
      currentView.value = "avatar"
      return
    }
    currentView.value = "video-type"
    return
  }
  if (currentView.value === "avatar") {
    currentView.value = "video-type"
    return
  }
  if (currentView.value === "video-type") {
    currentView.value = "product"
    return
  }
  emit("close")
}

const handleProductSelect = (product) => {
  selectedProduct.value = product
  currentView.value = "video-type"
}

const handleVideoTypeSelect = (videoType) => {
  selectedVideoType.value = videoType
  selectedAvatar.value = null
  if (videoType.id === "ai-ugc") {
    currentView.value = "avatar"
    return
  }
  currentView.value = "script"
}

const handleAvatarSelect = (avatar) => {
  selectedAvatar.value = avatar
  currentView.value = "script"
}

const finishFlow = () => {
  emit("complete", {
    product: selectedProduct.value,
    videoType: selectedVideoType.value,
    avatar: selectedAvatar.value,
  })
}
</script>
