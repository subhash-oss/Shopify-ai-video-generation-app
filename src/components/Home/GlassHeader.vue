<template>
  <header class="glass_panel flex w-full items-center justify-between px-xxl md:px-6xl py-3xl">
    <div class="glass_panel_sheen" aria-hidden="true" />

    <div class="relative z-10">
      <LogoForHeader />
    </div>

    <div class="relative z-10 flex items-center gap-3">
      <div class="glass_inset_pill flex items-center gap-2 px-4 py-xl rounded-xl">
        <span class="flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.87891 19.7578C15.3349 19.7578 19.7578 15.3349 19.7578 9.87891C19.7578 4.42294 15.3349 0 9.87891 0C4.42294 0 0 4.42294 0 9.87891C0 15.3349 4.42294 19.7578 9.87891 19.7578Z" fill="#FFC843"/>
            <path d="M9.87891 17.5625C14.1224 17.5625 17.5625 14.1224 17.5625 9.87891C17.5625 5.63537 14.1224 2.19531 9.87891 2.19531C5.63537 2.19531 2.19531 5.63537 2.19531 9.87891C2.19531 14.1224 5.63537 17.5625 9.87891 17.5625Z" fill="#D38700"/>
            <path d="M10.2134 5.78852L11.3152 8.02093C11.3696 8.13092 11.4746 8.20731 11.596 8.22509L14.0596 8.58315C14.3656 8.62772 14.4876 9.00355 14.2664 9.21935L12.4838 10.9569C12.396 11.0426 12.3558 11.1662 12.3764 11.2871L12.7973 13.7406C12.8495 14.0453 12.5296 14.2778 12.2561 14.1338L10.0527 12.9753C9.94401 12.9182 9.81426 12.9182 9.7056 12.9753L7.50216 14.1338C7.2284 14.2776 6.90877 14.0453 6.96102 13.7406L7.38186 11.2871C7.40271 11.1662 7.36254 11.0426 7.27451 10.9569L5.49191 9.21935C5.27062 9.00355 5.39268 8.6275 5.69871 8.58315L8.16229 8.22509C8.28369 8.20753 8.38885 8.13114 8.44307 8.02093L9.5449 5.78852C9.68123 5.51125 10.0764 5.51125 10.2134 5.78852Z" fill="#FFC843"/>
          </svg>
        </span>
        <span class="label_1_medium tracking-tight text-[#5F3AA7]">12 credits</span>
      </div>

      <RouterLink
        to="/settings"
        class="glass_inset_button flex h-11 w-11 items-center justify-center"
        aria-label="Settings"
      >
        <img :src="SettingsGearIcon" alt="" class="h-5 w-5" />
      </RouterLink>

      <div v-if="showCreateButton" class="hidden lg:block">
        <CreateNewVideoButton @create="$emit('create')" />
      </div>
    </div>
  </header>
</template>

<script setup>
import LogoForHeader from "../common/LogoForHeader.vue"
import CreateNewVideoButton from "./CreateNewVideoButton.vue"
import SettingsGearIcon from "../../assets/images/SettingsGearIcon.svg"

defineProps({
  showCreateButton: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["create"])
</script>
