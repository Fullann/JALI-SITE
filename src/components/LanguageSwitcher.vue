<template>
  <div class="relative">
    <button
      href="#"
      class="flex items-center"
      @click="toggleVisibility"
    >
      <span class="ml-2">{{ $i18n.locale.toUpperCase() }}</span>
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          class="heroicon-ui"
          d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
        ></path>
      </svg>
    </button>
    <transition name="dropdown-fade">
      <ul
        v-on-clickaway="hideDropdown"
        v-if="isVisible"
        ref="dropdown"
        class="
          absolute
          normal-case
          z-30
          font-normal
          xs:left-0
          lg:right-0
          bg-gray-100
          dark:bg-gray-800
          shadow
          overflow-hidden
          rounded
          w-48
          border
          mt-2
          py-1
          lg:z-20
        "
      >
        <li>
          <a
            href="#"
            @click="setLocale('en')"
            ref="account"
            class="flex items-center px-3 py-3 hover:bg-gray-200  hover:text-red-500 dark:hover:bg-gray-600"
          >
            <img
              src="@/assets/flags/flag_en.svg"
              alt="english flag"
              class="h-8 w-8"
            />
            <span class="ml-2">English</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="setLocale('fr')"
            class="flex items-center px-3 py-3 hover:bg-gray-200 hover:text-red-500 dark:hover:bg-gray-600"
          >
            <img
              src="@/assets/flags/flag_fr.svg"
              alt="french flag"
              class="h-8 w-8"
            />
            <span class="ml-2">French</span>
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      focusedIndex: 0,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    hideDropdown() {
      this.isVisible = false;
      this.focusedIndex = 0;
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale },
      });
      this.hideDropdown();
    },
  },
};
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
