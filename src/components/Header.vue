<template>
  <nav
    class="
      flex flex-wrap
      items-center
      justify-between
      p-5
      bg-gray-100
      dark:bg-gray-800
    "
  >
    <!-- logo -->
    <router-link
      :to="{ path: '/' }"
      class="
        flex
        items-center
        justify-center
        text-3xl
        font-bold
        text-true-gray-800
        dark:text-gray-100
      "
    >
      <img
        class="w-10 h-10 mr-1 text-blue-700"
        src="@/assets/space.png"
        alt="logo"
      />
      JALI
    </router-link>
    <!-- hamburger -->
    <div class="flex md:hidden">
      <button id="hamburger">
        <div class="toggle block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
        <div class="toggle hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            />
            <path
              fill-rule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            />
          </svg>
        </div>
      </button>
    </div>
    <!-- links -->
    <div
      class="
        toggle
        hidden
        md:flex
        w-full
        md:w-auto
        text-right text-bold
        mt-5
        md:mt-0
        border-t-2 border-red-800
        md:border-none
      "
    >
      <router-link
        :to="{ path: '/' }"
        class="
          block
          md:inline-block
          text-white
          hover:text-red-500 transition duration-150 ease-in-out
          px-3
          py-3
          md:border-none
        "
        >Home</router-link>
    </div>
    <!-- cta -->
    <a
      :href="botUrl"
      target="_blank"
      class="
        toggle
        justify-center
        flex
        hidden
        md:flex
        w-full
        md:w-48
        px-4
        py-2
        text-right
        bg-gradient-to-b
        from-red-600
        to-red-700
        text-white
        hover:from-red-900
        transition
        duration-200
        ease-in-out
        rounded-lg
      "
      ><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
        />
      </svg>
      <span>{{ $t("setup.add") }}</span></a
    >
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "@/config";

export default {
  name: "Header",
  components: {},
  computed: {
    ...mapState(["sideBarOpen", "dark", "user", "stateParam"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
    };
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
  },
  mounted() {
    document.getElementById("hamburger").onclick = function toggleMenu() {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle.item(i).classList.toggle("hidden");
      }
    };
  },
};
</script>