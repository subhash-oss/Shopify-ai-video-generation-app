<template>
  <div class="flex flex-col items-center justify-center py-16 text-center md:py-24">
    <div class="relative mb-5xl flex items-center justify-center">
      <div
        class="absolute h-40 w-40 rounded-full bg-[#ede9fe]/70 blur-2xl"
        aria-hidden="true"
      />
      <img
        :src="NoSearchResultsIllustration"
        alt=""
        class="relative h-auto w-[12.5rem]"
      />
    </div>

    <p class="heading_h6_medium secondary_text_color mt-0">
      No products found,
    </p>
    <p class="heading_h6_medium secondary_text_color">
      Try a different search term or category
    </p>
  </div>
</template>

<script setup>
import NoSearchResultsIllustration from "../../assets/images/NoSearchResult.svg"
</script>
