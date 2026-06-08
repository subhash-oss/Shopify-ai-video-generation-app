<template>
  <div class="rounded-2xl bg_secondary_color p-6xl primary_border_color">
    <!-- Full name -->
    <div>
      <label class="label_2_semibold flex items-center gap-lg primary_text_color">
        Full name
        <img :src="WarningGrayIcon" alt="" class="h-4 w-4 opacity-60" />
      </label>

      <div class="mt-sm flex w-full flex-col gap-xl sm:flex-row sm:items-center">
        <input
          v-model="fullName"
          type="text"
          :disabled="!isEditingName"
          class="settings_input h-12 flex-1 sm:max-w-md"
          :class="!isEditingName ? 'settings_input_disabled' : 'settings_input_active'"
        />

        <div v-if="!isEditingName" class="flex gap-xl">
          <button
            type="button"
            class="settings_edit_button"
            aria-label="Edit full name"
            @click="startEditingName"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M12.75 2.25L15.75 5.25L6.75 14.25H3.75V11.25L12.75 2.25Z" stroke="#28293d" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div v-else class="flex gap-xl">
          <button
            type="button"
            class="settings_secondary_button"
            @click="cancelEditingName"
          >
            Cancel
          </button>
          <button
            type="button"
            class="settings_primary_button"
            @click="saveName"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Email -->
    <div class="mt-10xl">
      <label class="label_2_semibold primary_text_color">Email:</label>
      <div class="mt-sm">
        <input
          :value="email"
          type="email"
          disabled
          class="settings_input settings_input_disabled h-12 w-full sm:max-w-md"
        />
      </div>
    </div>

    <!-- Password -->
    <div class="mt-10xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="label_1_semibold primary_text_color">
          Create your password
        </h3>
        <p class="label_1_regular mt-md secondary_text_color">
          Create a strong password to keep your account safe.
        </p>
      </div>
      <button type="button" class="settings_outline_button shrink-0">
        Create password
      </button>
    </div>

    <!-- Connected social accounts -->
    <div class="mt-10xl">
      <h3 class="heading_h6_semibold primary_text_color">
        Connected social accounts
      </h3>
      <p class="label_1_regular mt-md secondary_text_color">
        Services that you use to log in to Genius AI
      </p>

      <div class="mt-10xl flex max-w-xl items-center justify-between gap-4">
        <div class="flex items-center gap-6xl">
          <div class="flex h-10 w-10 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.6 12.2273C21.6 11.5182 21.5364 10.8364 21.4182 10.1818H12V14.05H17.3818C17.15 15.3 16.4455 16.3591 15.3864 17.0682V19.5773H18.6182C20.5091 17.8364 21.6 15.2727 21.6 12.2273Z" fill="#4285F4" />
              <path d="M12 22C14.7 22 16.9636 21.1045 18.6182 19.5773L15.3864 17.0682C14.4909 17.6682 13.3455 18.0227 12 18.0227C9.39545 18.0227 7.19091 16.2636 6.40455 13.9H3.06364V16.4909C4.70909 19.7591 8.09091 22 12 22Z" fill="#34A853" />
              <path d="M6.40455 13.9C6.20455 13.3 6.09091 12.6591 6.09091 12C6.09091 11.3409 6.20455 10.7 6.40455 10.1V7.50909H3.06364C2.38636 8.85909 2 10.3864 2 12C2 13.6136 2.38636 15.1409 3.06364 16.4909L6.40455 13.9Z" fill="#FBBC05" />
              <path d="M12 5.97727C13.4682 5.97727 14.7864 6.48182 15.8227 7.47273L18.6909 4.60455C16.9591 2.99091 14.6955 2 12 2C8.09091 2 4.70909 4.24091 3.06364 7.50909L6.40455 10.1C7.19091 7.73636 9.39545 5.97727 12 5.97727Z" fill="#EA4335" />
            </svg>
          </div>
          <div>
            <p class="label_1_medium primary_text_color">Google</p>
            <p class="label_1_bold primary_text_color">Charlene Reed</p>
          </div>
        </div>
        <button type="button" class="settings_disconnect_button">
          Disconnect
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import WarningGrayIcon from "../../assets/images/WarningIcon.svg"

const fullName = ref("Cliff Booth")
const savedName = ref("Cliff Booth")
const email = "cliff Booth@iboson.io"
const isEditingName = ref(false)

const startEditingName = () => {
  isEditingName.value = true
}

const cancelEditingName = () => {
  fullName.value = savedName.value
  isEditingName.value = false
}

const saveName = () => {
  savedName.value = fullName.value
  isEditingName.value = false
}
</script>
