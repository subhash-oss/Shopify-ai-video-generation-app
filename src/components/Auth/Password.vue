<template>
  <div class="flex min-h-screen items-center justify-center px-6xl">
    <div class="w-full max-w-md">

      <div class="block lg:hidden">
        <Logo />
      </div>

      <img :src="LockIcon" alt="Lock Icon">

      <h2 class="heading_h5_semibold primary_text_color mt-6xl">
        Enter Password
      </h2>

      <p class="body_2_regular secondary_text_color mt-md">
        Please enter your password to access your account securely.
      </p>

      <div class="relative mt-6xl">
        <label
          :class="[
            'absolute left-3xl transition-all duration-200 pointer-events-none z-10',
            (showPassword ? password : actualPassword) || focusedFields.password
              ? 'top-0 label_1_medium tertiary_text_color -translate-y-1/2 bg-white px-xs'
              : 'top-1/2 -translate-y-1/2 tertiary_text_color',
            errorMessage && (showPassword ? password : actualPassword) || focusedFields.password ? 'top-0' : errorMessage ? 'top-1/3' : ''
          ]"
        >
          Password
        </label>
        <div class="relative">
          <input
            :value="showPassword ? password : '*'.repeat(actualPassword.length)"
            @input="handlePasswordInput"
            @keydown="handlePasswordKeydown"
            @paste="handlePasswordPaste"
            @focus="focusedFields.password = true"
            @blur="focusedFields.password = false"
            type="text"
            class="input_box w-full pt-4xl px-xl pb-md pr-10xl password-input"
            :class="[
              inputClass(errorMessage),
              focusedFields.password ? 'border border-info-50' : ''
            ]"
          />

          <button
            type="button"
            @click="togglePassword"
            class="absolute right-xl top-1/2 -translate-y-1/2 z-20"
          >
            <img v-if="!showPassword" :src="EyeOpenIcon" alt="Show password" />
            <span v-else><img :src="EyeCloseIcon" alt="Hide password"></span>
          </button>
        </div>

        <p v-if="errorMessage" class="label_2_semibold text-error-600 mt-md flex gap-sm">
          <img :src="WarningIcon" alt=""> {{ errorMessage }}
        </p>
      </div>

      <button
        type="button"
        class="primary_button w-full mt-6xl"
        :disabled="isSubmitting"
        @click="handleSubmit"
      >
        {{ isSubmitting ? "Signing in..." : "Sign In" }}
      </button>

      <div class="flex justify-between mt-6xl">
        <span class="underline label_2_semibold cursor-pointer primary_text_color">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
        </span>
        <span class="underline label_2_semibold primary_text_color">
          <RouterLink to="/signin">Back to Sign In</RouterLink>
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import EyeOpenIcon from "../../assets/images/EyeOpen.svg"
import LockIcon from "../../assets/images/LockIcon.svg"
import EyeCloseIcon from "../../assets/images/EyeCloseIcon.svg"
import WarningIcon from "../../assets/images/WarningIcon.svg"
import Logo from "../common/Logo.vue"

const route = useRoute()
const router = useRouter()

const email = computed(() => {
  const value = route.query?.email
  return typeof value === "string" ? value : ""
})

const showPassword = ref(false)
const password = ref("")
const errorMessage = ref("")
const isSubmitting = ref(false)

const focusedFields = reactive({
  password: false,
})

const actualPassword = ref("")

onMounted(() => {
  actualPassword.value = password.value
})

watch(() => password.value, (newVal) => {
  if (showPassword.value) {
    actualPassword.value = newVal
  }
})

const togglePassword = () => {
  if (showPassword.value) {
    actualPassword.value = password.value
  } else {
    password.value = actualPassword.value
  }
  showPassword.value = !showPassword.value
}

const handlePasswordInput = (event) => {
  const inputValue = event.target.value
  const cursorPosition = event.target.selectionStart

  if (showPassword.value) {
    password.value = inputValue
    actualPassword.value = inputValue
  } else {
    setTimeout(() => {
      if (event.target && !showPassword.value) {
        event.target.value = "*".repeat(actualPassword.value.length)
        const newCursorPos = Math.min(cursorPosition, actualPassword.value.length)
        event.target.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }
}

const handlePasswordPaste = (event) => {
  if (!showPassword.value) {
    event.preventDefault()
    const pastedText = (event.clipboardData || window.clipboardData).getData("text")
    const cursorPos = event.target.selectionStart || 0

    actualPassword.value =
      actualPassword.value.substring(0, cursorPos) +
      pastedText +
      actualPassword.value.substring(cursorPos)
    password.value = actualPassword.value

    setTimeout(() => {
      if (event.target) {
        event.target.value = "*".repeat(actualPassword.value.length)
        const newCursorPos = cursorPos + pastedText.length
        event.target.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }
}

const handlePasswordKeydown = (event) => {
  if (!showPassword.value) {
    const cursorPos = event.target.selectionStart || 0

    if (event.key === "Backspace") {
      if (cursorPos > 0) {
        actualPassword.value =
          actualPassword.value.substring(0, cursorPos - 1) +
          actualPassword.value.substring(cursorPos)
        password.value = actualPassword.value
      }
      event.preventDefault()
      setTimeout(() => {
        if (event.target) {
          event.target.value = "*".repeat(actualPassword.value.length)
          event.target.setSelectionRange(Math.max(0, cursorPos - 1), Math.max(0, cursorPos - 1))
        }
      }, 0)
    } else if (event.key === "Delete") {
      if (cursorPos < actualPassword.value.length) {
        actualPassword.value =
          actualPassword.value.substring(0, cursorPos) +
          actualPassword.value.substring(cursorPos + 1)
        password.value = actualPassword.value
      }
      event.preventDefault()
      setTimeout(() => {
        if (event.target) {
          event.target.value = "*".repeat(actualPassword.value.length)
          event.target.setSelectionRange(cursorPos, cursorPos)
        }
      }, 0)
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      actualPassword.value =
        actualPassword.value.substring(0, cursorPos) +
        event.key +
        actualPassword.value.substring(cursorPos)
      password.value = actualPassword.value
      event.preventDefault()
      setTimeout(() => {
        if (event.target) {
          event.target.value = "*".repeat(actualPassword.value.length)
          event.target.setSelectionRange(cursorPos + 1, cursorPos + 1)
        }
      }, 0)
    }
  }
}

const inputClass = (error) =>
  error ? "error_border_color" : "regular_border_color"

const handleSubmit = async () => {
  errorMessage.value = ""

  if (!email.value) {
    errorMessage.value = "Email is missing. Go back and enter your email."
    return
  }

  if (!showPassword.value) {
    password.value = actualPassword.value
  }

  const pwd = password.value.trim()
  if (!pwd) {
    errorMessage.value = "Password is required"
    return
  }

  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    await router.push("/signin")
  } catch {
    errorMessage.value = "Invalid password."
  } finally {
    isSubmitting.value = false
  }
}
</script>
