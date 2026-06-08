<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
    <BrandingSection />
    <ForgotPasswordForm />
  </div>
</template>

<script setup>
import BrandingSection from "../components/Auth/BrandingSection.vue"
import ForgotPasswordForm from "../components/Auth/ForgotPassword.vue"
</script>
