<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
    <BrandingSection />
    <ResetPasswordForm />
  </div>
</template>

<script setup>
import BrandingSection from "../components/Auth/BrandingSection.vue"
import ResetPasswordForm from "../components/Auth/ResetPassword.vue"
</script>
