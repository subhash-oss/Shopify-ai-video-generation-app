<template>
  <div class="flex min-h-screen items-center justify-center px-6xl">
    <div class="w-full max-w-md">

      <div class="block lg:hidden">
        <Logo />
      </div>

      <h2 class="heading_h5_semibold primary_text_color">
        Please Verify Your Email
      </h2>

      <p class="body_2_regular secondary_text_color mt-md">
        We've sent a message to
        <span class="primary_text_color body_2_medium">{{ email || "your email" }}</span>
        with a link to activate your account. If you can't find our email, check your spam or junk folder, or click below to resend the email.
      </p>

      <button type="button" class="primary_button w-full mt-6xl" @click="handleOpenEmail">
        Open Email
      </button>

      <div class="flex justify-between mt-6xl">
        <button
          type="button"
          class="underline label_2_semibold primary_text_color"
          @click="handleResend"
        >
          {{ isResending ? "Sending..." : "Resend Verification Email" }}
        </button>
        <span class="underline label_2_semibold">
          <RouterLink to="/signup" class="primary_text_color">Back to Sign Up</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import Logo from "../common/Logo.vue"

const route = useRoute()
const isResending = ref(false)

const email = computed(() => {
  const value = route.query?.email
  return typeof value === "string" ? value : ""
})

const handleOpenEmail = () => {
  if (email.value) {
    window.location.href = `mailto:${email.value}`
    return
  }
  window.location.href = "mailto:"
}

const handleResend = async () => {
  if (isResending.value) return
  isResending.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  isResending.value = false
}
</script>
