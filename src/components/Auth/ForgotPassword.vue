<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">

      <div class="block lg:hidden">
        <Logo />
      </div>

      <img :src="LockIcon" alt="Lock Icon">

      <h2 class="heading_h5_semibold primary_text_color mt-6xl">
        Forgot Password
      </h2>

      <p class="body_2_regular secondary_text_color mt-md">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form @submit.prevent="handleSubmit">

        <div class="relative mt-6xl">
          <label
            :class="[
              'absolute left-3xl transition-all duration-200 pointer-events-none z-10',
              form.email || focusedFields.email
                ? 'top-0 label_1_medium tertiary_text_color -translate-y-1/2 bg-white px-xs'
                : 'top-1/2 -translate-y-1/2 tertiary_text_color',
              errors.email && form.email || focusedFields.email ? 'top-0' : errors.email ? 'top-1/3' : ''
            ]"
          >
            Email
          </label>
          <input
            v-model="form.email"
            @focus="focusedFields.email = true"
            @blur="focusedFields.email = false"
            type="text"
            class="input_box w-full pt-4xl px-xl pb-md"
            :class="[
              inputClass(errors.email),
              focusedFields.email ? 'border border-info-50' : ''
            ]"
          />
          <p v-if="errors.email" class="label_2_semibold text-error-600 mt-md flex gap-sm">
            <img :src="WarningIcon" alt=""> {{ errors.email }}
          </p>
        </div>

        <button
          type="submit"
          class="primary_button w-full mt-6xl label_1_semibold"
        >
          Send Reset Link
        </button>
      </form>

      <p class="label_1_medium mt-6xl flex justify-center">
        <RouterLink
          to="/signin"
          class="ml-1 cursor-pointer underline primary_text_color"
        >
          Back to Sign In
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import Logo from "../common/Logo.vue"
import LockIcon from "../../assets/images/LockIcon.svg"
import WarningIcon from "../../assets/images/WarningIcon.svg"

const router = useRouter()

const form = reactive({
  email: "",
})

const errors = reactive({
  email: "",
})

const focusedFields = reactive({
  email: false,
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass = (error) =>
  error ? "error_border_color" : "regular_border_color"

const handleSubmit = async () => {
  errors.email = ""

  if (!form.email) {
    errors.email = "Email is required"
    return
  }

  if (!emailRegex.test(form.email)) {
    errors.email = "Enter a valid email address"
    return
  }

  await router.push("/reset-link")
}
</script>
