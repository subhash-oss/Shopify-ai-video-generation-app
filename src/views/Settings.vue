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

    <div class="relative z-10 flex min-h-screen w-full flex-col px-6xl pb-10 pt-5xl md:px-13xl">
      <SettingsHeader />

      <main class="mt-8 w-full flex-1">
        <div>
          <h1 class="heading_h6_semibold tracking-tight primary_text_color">
            Settings
          </h1>
          <p class="label_1_regular mt-md secondary_text_color">
            Download and share your videos for the world to see!
          </p>
        </div>

        <div class="mt-6xl">
          <SettingsTabs v-model:active-tab="activeTab" />
        </div>

        <div class="mt-5xl">
          <AccountSettings v-if="activeTab === 'account'" />

          <SettingsTabPlaceholder
            v-else-if="activeTab === 'shopify'"
            title="Shopify Store"
            description="Connect and manage your Shopify store integration."
          />
          <SettingsTabPlaceholder
            v-else-if="activeTab === 'billing'"
            title="Plan & Billing"
            description="View your plan, billing history, and payment methods."
          />
          <SettingsTabPlaceholder
            v-else-if="activeTab === 'security'"
            title="Security"
            description="Manage your password, sessions, and account security."
          />
          <SettingsTabPlaceholder
            v-else-if="activeTab === 'data-privacy'"
            title="Data & Privacy Settings"
            description="Control how your data is stored and used."
          />
          <SettingsTabPlaceholder
            v-else-if="activeTab === 'notifications'"
            title="Notifications"
            description="Choose how and when you receive notifications."
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import SettingsHeader from "../components/Settings/SettingsHeader.vue"
import SettingsTabs from "../components/Settings/SettingsTabs.vue"
import AccountSettings from "../components/Settings/AccountSettings.vue"
import SettingsTabPlaceholder from "../components/Settings/SettingsTabPlaceholder.vue"

const activeTab = ref("account")
</script>
