<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
    <BrandingSection />
    <PasswordForm />
  </div>
</template>

<script setup>
import BrandingSection from "../components/Auth/BrandingSection.vue"
import PasswordForm from "../components/Auth/Password.vue"
</script>
