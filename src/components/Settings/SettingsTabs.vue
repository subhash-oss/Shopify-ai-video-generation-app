<template>
  <div class="relative rounded-2xl border primary_border_color bg_secondary_color p-xl">
    <button
      v-if="canScrollLeft"
      type="button"
      class="absolute top-1/2 left-2 z-10 flex h-12 w-4 -translate-y-1/2 items-center justify-center bg_secondary_color md:hidden"
      @click.stop="scrollTabs('left')"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M12.5 5L7.5 10L12.5 15" stroke="#15172E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <button
      v-if="canScrollRight"
      type="button"
      class="absolute top-1/2 right-2 z-10 flex h-12 w-4 -translate-y-1/2 items-center justify-center bg_secondary_color md:hidden"
      @click.stop="scrollTabs('right')"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.5 5L12.5 10L7.5 15" stroke="#15172E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div
      ref="tabsContainer"
      class="scrollbar-hide mx-auto flex scroll-smooth gap-xs overflow-x-auto md:gap-6xl lg:overflow-visible"
      @scroll="checkScrollPosition"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :ref="(el) => { if (el) tabRefs[tab.id] = el }"
        type="button"
        class="tab-button relative flex shrink-0 items-center justify-center gap-sm rounded-xl p-xl transition-colors md:gap-xl"
        :class="activeTab === tab.id
          ? 'label_2_semibold bg-info-50 primary_text_color'
          : 'label_2_semibold secondary_text_color hover:bg-info-50'"
        @click="handleTabClick(tab.id)"
      >
        <span class="icon-wrapper flex shrink-0 items-center justify-center">
          <component :is="tab.iconComponent" class="h-5 w-5" />
        </span>
        <span>{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { h, nextTick, onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["update:activeTab"])

const tabsContainer = ref(null)
const tabRefs = ref({})
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const icon = (paths) => (iconProps) =>
  h("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", class: iconProps?.class || "" }, paths.map((d) =>
    h("path", { d, stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })
  ))

const PersonIcon = icon([
  "M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5M6.66667 5.83333C6.66667 6.71739 7.01786 7.56523 7.64298 8.19036C8.2681 8.81548 9.11594 9.16667 10 9.16667C10.8841 9.16667 11.7319 8.81548 12.357 8.19036C12.9821 7.56523 13.3333 6.71739 13.3333 5.83333C13.3333 4.94928 12.9821 4.10143 12.357 3.47631C11.7319 2.85119 10.8841 2.5 10 2.5C9.11594 2.5 8.2681 2.85119 7.64298 3.47631C7.01786 4.10143 6.66667 4.94928 6.66667 5.83333Z",
])

const StoreIcon = icon([
  "M3.33325 6.66667L4.16659 3.33333H15.8333L16.6666 6.66667M3.33325 6.66667H16.6666M3.33325 6.66667V15.8333C3.33325 16.2754 3.50884 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V6.66667M7.49992 10.8333V13.3333M12.4999 10.8333V13.3333",
])

const MoneyIcon = icon([
  "M10.8333 16.6673H4.16667C3.72464 16.6673 3.30072 16.4917 2.98816 16.1792C2.67559 15.8666 2.5 15.4427 2.5 15.0007V5.00065C2.5 4.55862 2.67559 4.1347 2.98816 3.82214C3.30072 3.50958 3.72464 3.33398 4.16667 3.33398H15.8333C16.2754 3.33398 16.6993 3.50958 17.0118 3.82214C17.3244 4.1347 17.5 4.55862 17.5 5.00065V8.75065M7.5 14.1673H10.8333M17.5 12.5007H15.4167C15.0851 12.5007 14.7672 12.6323 14.5328 12.8668C14.2984 13.1012 14.1667 13.4191 14.1667 13.7507C14.1667 14.0822 14.2984 14.4001 14.5328 14.6345C14.7672 14.869 15.0851 15.0007 15.4167 15.0007H16.25C16.5815 15.0007 16.8995 15.1323 17.1339 15.3668C17.3683 15.6012 17.5 15.9191 17.5 16.2507C17.5 16.5822 17.3683 16.9001 17.1339 17.1345C16.8995 17.369 16.5815 17.5007 16.25 17.5007H14.1667M15.8333 17.5007V18.334M15.8333 11.6673V12.5007",
])

const ShieldIcon = icon([
  "M10 10C9.779 10 9.56703 9.9122 9.41075 9.75592C9.25447 9.59964 9.16668 9.38768 9.16668 9.16667C9.16668 8.94565 9.25447 8.73369 9.41075 8.57741C9.56703 8.42113 9.779 8.33333 10 8.33333C10.221 8.33333 10.433 8.42113 10.5893 8.57741C10.7455 8.73369 10.8333 8.94565 10.8333 9.16667C10.8333 9.38768 10.7455 9.59964 10.5893 9.75592C10.433 9.9122 10.221 10 10 10ZM10 10V12.0833M10 2.5C11.9466 4.22215 14.4871 5.11881 17.0834 5C17.4614 6.28585 17.577 7.63456 17.4235 8.96598C17.2699 10.2974 16.8503 11.5844 16.1895 12.7504C15.5288 13.9165 14.6403 14.9378 13.5771 15.7537C12.5138 16.5696 11.2973 17.1635 10 17.5C8.7027 17.1635 7.48626 16.5696 6.42298 15.7537C5.3597 14.9378 4.47128 13.9165 3.81052 12.7504C3.14976 11.5844 2.73014 10.2974 2.57659 8.96598C2.42304 7.63456 2.5387 6.28585 2.91669 5C5.51296 5.11881 8.0535 4.22215 10 2.5Z",
])

const DatabaseIcon = icon([
  "M3.33325 5C3.33325 5.66304 4.03563 6.29893 5.28587 6.76777C6.53612 7.23661 8.23181 7.5 9.99992 7.5C11.768 7.5 13.4637 7.23661 14.714 6.76777C15.9642 6.29893 16.6666 5.66304 16.6666 5M3.33325 5C3.33325 4.33696 4.03563 3.70107 5.28587 3.23223C6.53612 2.76339 8.23181 2.5 9.99992 2.5C11.768 2.5 13.4637 2.76339 14.714 3.23223C15.9642 3.70107 16.6666 4.33696 16.6666 5M3.33325 5V10M16.6666 5V10M3.33325 10C3.33325 10.663 4.03563 11.2989 5.28587 11.7678C6.53612 12.2366 8.23181 12.5 9.99992 12.5C11.768 12.5 13.4637 12.2366 14.714 11.7678C15.9642 11.2989 16.6666 10.663 16.6666 10M3.33325 10V15C3.33325 15.663 4.03563 16.2989 5.28587 16.7678C6.53612 17.2366 8.23181 17.5 9.99992 17.5C11.768 17.5 13.4637 17.2366 14.714 16.7678C15.9642 16.2989 16.6666 15.663 16.6666 15V10",
])

const BellIcon = icon([
  "M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667ZM11.4417 17.5C11.2951 17.7526 11.0849 17.9622 10.8321 18.1079C10.5794 18.2537 10.2938 18.3304 10.0033 18.3304C9.71287 18.3304 9.42732 18.2537 9.17455 18.1079C8.92178 17.9622 8.7116 17.7526 8.565 17.5",
])

const tabs = [
  { id: "account", label: "Account", iconComponent: PersonIcon },
  { id: "shopify", label: "Shopify Store", iconComponent: StoreIcon },
  { id: "billing", label: "Plan & Billing", iconComponent: MoneyIcon },
  { id: "security", label: "Security", iconComponent: ShieldIcon },
  { id: "data-privacy", label: "Data & Privacy Settings", iconComponent: DatabaseIcon },
  { id: "notifications", label: "Notifications", iconComponent: BellIcon },
]

const checkScrollPosition = () => {
  if (!tabsContainer.value) return

  const container = tabsContainer.value
  const needsScrolling = container.scrollWidth > container.clientWidth

  if (!needsScrolling) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  canScrollLeft.value = container.scrollLeft > 5
  canScrollRight.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 5
}

const handleTabClick = (tabId) => {
  emit("update:activeTab", tabId)

  nextTick(() => {
    const tabElement = tabRefs.value[tabId]
    tabElement?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    setTimeout(checkScrollPosition, 300)
  })
}

const scrollTabs = (direction) => {
  if (!tabsContainer.value) return

  const container = tabsContainer.value
  const scrollAmount = direction === "left"
    ? -(container.clientWidth / 2 + 4)
    : container.clientWidth / 2 + 4

  container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  setTimeout(checkScrollPosition, 100)
}

const onResize = () => checkScrollPosition()

onMounted(() => {
  nextTick(() => {
    checkScrollPosition()
    window.addEventListener("resize", onResize)
  })
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (max-width: 767px) {
  .tab-button {
    min-width: calc(50% - 2px);
    flex: 0 0 calc(50% - 2px);
    max-width: calc(50% - 2px);
    padding: 0.625rem 0.5rem;
  }

  .tab-button span:last-child {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .icon-wrapper :deep(svg) {
    width: 16px !important;
    height: 16px !important;
  }
}
</style>
