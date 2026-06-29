<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 lg:grid-cols-2">
      <BrandingSection />
      <SigninForm />
    </div>
  </div>
</template>

<script setup>
import BrandingSection from "../components/Auth/BrandingSection.vue"
import SigninForm from "../components/Auth/SigninForm.vue"
</script>
