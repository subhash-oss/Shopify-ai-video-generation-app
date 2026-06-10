<template>
  <aside class="video_summary_card gradient-top-bottom">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f3e8ff]/80 to-transparent"
      aria-hidden="true"
    />

    <div class="video_summary_preview shrink-0">
      <div class="video_summary_image_product">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>
      <div
        v-if="avatar"
        class="video_summary_image_avatar"
      >
        <img
          :src="avatar.image"
          :alt="avatar.name"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <div class="video_summary_inset">
      <dl class="video_summary_details">
        <dt>Product</dt>
        <span class="video_summary_colon" aria-hidden="true">:</span>
        <dd>{{ product.name }}</dd>

        <dt>Video type</dt>
        <span class="video_summary_colon" aria-hidden="true">:</span>
        <dd>{{ videoType.title }}</dd>

        <template v-if="avatar">
          <dt>Avatar</dt>
          <span class="video_summary_colon" aria-hidden="true">:</span>
          <dd>{{ avatar.name }}</dd>
        </template>

        <dt>Duration</dt>
        <span class="video_summary_colon" aria-hidden="true">:</span>
        <dd>{{ duration }}</dd>

        <dt>Credits</dt>
        <span class="video_summary_colon" aria-hidden="true">:</span>
        <dd class="video_summary_credits">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_199_3066)">
<path d="M9.98828 19.8677C15.4443 19.8677 19.8672 15.4447 19.8672 9.98877C19.8672 4.5328 15.4443 0.109863 9.98828 0.109863C4.53231 0.109863 0.109375 4.5328 0.109375 9.98877C0.109375 15.4447 4.53231 19.8677 9.98828 19.8677Z" fill="#FFC843"/>
<path d="M9.98828 17.6724C14.2318 17.6724 17.6719 14.2323 17.6719 9.98877C17.6719 5.74524 14.2318 2.30518 9.98828 2.30518C5.74475 2.30518 2.30469 5.74524 2.30469 9.98877C2.30469 14.2323 5.74475 17.6724 9.98828 17.6724Z" fill="#D38700"/>
<path d="M10.3227 5.89814L11.4246 8.13055C11.479 8.24053 11.584 8.31693 11.7054 8.33471L14.1689 8.69277C14.475 8.73733 14.597 9.11317 14.3757 9.32897L12.5931 11.0666C12.5053 11.1522 12.4652 11.2758 12.4858 11.3967L12.9066 13.8502C12.9589 14.1549 12.639 14.3874 12.3655 14.2434L10.162 13.0849C10.0534 13.0279 9.92364 13.0279 9.81497 13.0849L7.61153 14.2434C7.33778 14.3872 7.01814 14.1549 7.07039 13.8502L7.49123 11.3967C7.51209 11.2758 7.47191 11.1522 7.38388 11.0666L5.60129 9.32897C5.38 9.11317 5.50206 8.73711 5.80809 8.69277L8.27167 8.33471C8.39307 8.31715 8.49822 8.24075 8.55245 8.13055L9.65427 5.89814C9.7906 5.62087 10.1858 5.62087 10.3227 5.89814Z" fill="#FFC843"/>
</g>
<defs>
<clipPath id="clip0_199_3066">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

          {{ credits }} Credit
        </dd>
      </dl>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
  videoType: {
    type: Object,
    required: true,
  },
  avatar: {
    type: Object,
    default: null,
  },
  duration: {
    type: String,
    default: "30 Seconds",
  },
  credits: {
    type: Number,
    default: 3,
  },
})
</script>
