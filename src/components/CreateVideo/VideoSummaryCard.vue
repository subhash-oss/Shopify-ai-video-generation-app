<template>
  <aside class="glass_card flex flex-col overflow-hidden rounded-3xl p-5 md:p-6">
    <div class="relative mx-auto mb-6 h-44 w-full max-w-[15rem]">
      <div
        class="absolute top-0 left-0 h-32 w-32 overflow-hidden rounded-2xl border-2 border-white shadow-md"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>
      <div
        v-if="avatar"
        class="absolute right-0 bottom-0 h-28 w-28 overflow-hidden rounded-2xl border-2 border-white shadow-lg"
      >
        <img
          :src="avatar.image"
          :alt="avatar.name"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <div class="glass_inset rounded-2xl p-4 md:p-5">
      <dl class="space-y-3">
        <div class="flex gap-2 text-sm">
          <dt class="shrink-0 font-medium secondary_text_color">Product :</dt>
          <dd class="font-semibold primary_text_color">{{ product.name }}</dd>
        </div>
        <div class="flex gap-2 text-sm">
          <dt class="shrink-0 font-medium secondary_text_color">Video type :</dt>
          <dd class="font-semibold primary_text_color">{{ videoType.title }}</dd>
        </div>
        <div v-if="avatar" class="flex gap-2 text-sm">
          <dt class="shrink-0 font-medium secondary_text_color">Avatar :</dt>
          <dd class="font-semibold primary_text_color">{{ avatar.name }}</dd>
        </div>
        <div class="flex gap-2 text-sm">
          <dt class="shrink-0 font-medium secondary_text_color">Duration :</dt>
          <dd class="font-semibold primary_text_color">{{ duration }}</dd>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <dt class="shrink-0 font-medium secondary_text_color">Credits :</dt>
          <dd class="flex items-center gap-1.5 font-semibold primary_text_color">
            {{ credits }} Credit
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M9.87891 19.7578C15.3349 19.7578 19.7578 15.3349 19.7578 9.87891C19.7578 4.42294 15.3349 0 9.87891 0C4.42294 0 0 4.42294 0 9.87891C0 15.3349 4.42294 19.7578 9.87891 19.7578Z" fill="#FFC843" />
              <path d="M10.2134 5.78852L11.3152 8.02093C11.3696 8.13092 11.4746 8.20731 11.596 8.22509L14.0596 8.58315C14.3656 8.62772 14.4876 9.00355 14.2664 9.21935L12.4838 10.9569C12.396 11.0426 12.3558 11.1662 12.3764 11.2871L12.7973 13.7406C12.8495 14.0453 12.5296 14.2778 12.2561 14.1338L10.0527 12.9753C9.94401 12.9182 9.81426 12.9182 9.7056 12.9753L7.50216 14.1338C7.2284 14.2776 6.90877 14.0453 6.96102 13.7406L7.38186 11.2871C7.40271 11.1662 7.36254 11.0426 7.27451 10.9569L5.49191 9.21935C5.27062 9.00355 5.39268 8.6275 5.69871 8.58315L8.16229 8.22509C8.28369 8.20753 8.38885 8.13114 8.44307 8.02093L9.5449 5.78852C9.68123 5.51125 10.0764 5.51125 10.2134 5.78852Z" fill="#FFC843" />
            </svg>
          </dd>
        </div>
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
