<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">

      <div class="block lg:hidden">
        <Logo />
      </div>

      <h2 class="heading_h5_semibold primary_text_color">
        Sign In
      </h2>

      <p class="body_2_regular secondary_text_color mt-md">
        Manage your posts, analytics, and campaigns with AI.
      </p>

      <GoogleSignin />

      <div class="my-3xl flex items-center gap-3xl">
        <div class="h-px flex-1 bg-gray-25"></div>
        <span class="or_text">OR</span>
        <div class="h-px flex-1 bg-gray-25"></div>
      </div>

      <form novalidate @submit.prevent="handleSubmit">

        <div class="relative">
          <label
            :class="[
              'absolute left-3xl transition-all duration-200 pointer-events-none z-10',
              form.email || focusedFields.email
                ? 'top-0 label_1_medium tertiary_text_color -translate-y-1/2 bg-white px-xs'
                : 'top-1/2 -translate-y-1/2 tertiary_text_color',
              errors.email && form.email || focusedFields.email ? 'top-0' : errors.email  ? 'top-1/3' : ''
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
          class="primary_button w-full mt-7xl label_1_semibold"
        >
          Continue
        </button>
      </form>

      <p class="body_2_regular secondary_text_color mt-6xl flex justify-center">
        Don't have an account?
        <RouterLink
          to="/signup"
          class="ml-1 font-medium underline primary_text_color"
        >
          Sign Up
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import GoogleSignin from "./GoogleSignin.vue"
import Logo from "../common/Logo.vue"
import WarningIcon from "../../assets/images/WarningIcon.svg"

const route = useRoute()
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

const handleSubmit = () => {
  errors.email = ""

  if (!form.email) {
    errors.email = "Email is required"
    return
  }

  if (!emailRegex.test(form.email)) {
    errors.email = "Enter a valid email address"
    return
  }

  router.push({
    path: "/password",
    query: { email: form.email },
  })
}

onMounted(() => {
  const emailQuery = route.query.email
  const emailValue = Array.isArray(emailQuery) ? emailQuery[0] : emailQuery
  if (emailValue && typeof emailValue === "string") {
    form.email = emailValue
  }
})
</script>
