<template>
  <div class="sticky top-0 z-40">
    <div
      class="
        w-full
        h-20
        md:h-16
        px-6
        shadow-lg
        bg-gray-100
        dark:bg-gray-800
        flex
        items-center
        justify-between
      "
    >
      <!-- left navbar -->
      <div class="flex flex-row">
        <div class="flex">
          <!-- mobile hamburger -->
          <div class="text-gray-500 lg:hidden flex items-center mr-4">
            <button
              name="toggle-sidebar"
              class="
                hover:text-red-500 hover:border-white
                focus:outline-none
                navbar-burger
              "
              @click="toggleSidebar()"
            >
              <svg
                class="h-5 w-5"
                v-bind:style="{ fill: 'currentColor' }"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- right navbar -->
      <div class="flex items-center relative">
        <LanguageSwitcher />
        <button
          name="toggle-theme"
          class="rounded-md mr-3 hover:text-red-500 focus:outline-none"
          @click="toggleTheme()"
          aria-label="Toggle color mode"
        >
          <template v-if="!dark">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              ></path>
            </svg>
          </template>
          <template v-else>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </template>
        </button>
        <button
          name="toggle-notifications"
          class="rounded-md mr-3 hover:text-red-500 focus:outline-none"
          @click="toggleNotifications()"
          aria-label="Toggle Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class="fill-current"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
            />
          </svg>
        </button>
        <img
          v-if="auth"
          :src="avatar"
          alt="avatar"
          class="w-12 h-12 cursor-pointer rounded-full shadow-lg"
          @click="toggleDropDown()"
        />
        <a
          v-else
          :href="loginUrl"
          class="
            text-lg
            font-medium
            hover:text-red-500
            transition
            duration-150
            ease-in-out
          "
          >{{ $t("navbar.login") }}</a
        >
      </div>
    </div>

    <!-- notifications menu -->
    <div
      class="
        absolute
        bg-white
        dark:bg-gray-700
        shadow-xl
        text-gray-500
        dark:text-gray-100
        rounded-b-lg
        w-48
        bottom-10
        right-0
        mr-6
      "
      :class="notificationsOpen ? '' : 'hidden'"
    >
      <notifications />
    </div>
    <!-- notifications menu end -->

    <!-- dropdown menu -->
    <div
      class="
        absolute
        bg-white
        dark:bg-gray-700
        mt-1
        shadow-xl
        text-gray-500
        dark:text-gray-100
        rounded-lg
        w-48
        bottom-10
        right-0
        mr-6
      "
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <a
        href="#"
        class="
          block
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-gray-100
          dark:hover:bg-gray-800
        "
      >
        {{ username }}
      </a>
      <router-link
        :to="{ path: 'settings' }"
        class="
          block
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-gray-100
          dark:hover:bg-gray-800
        "
        >{{ $t("navbar.settings") }}</router-link
      >
      <router-link
        :to="{ path: '/' }"
        class="
          block
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-gray-100
          dark:hover:bg-gray-800
        "
        >{{ $t("dashboard.home") }}</router-link
      >
      <button
        name="logout"
        @click="logout()"
        class="
          block
          w-full
          text-left
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-red-400
          dark:hover:bg-red-400
        "
      >
        {{ $t("navbar.logout") }}
      </button>
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "@/config";
import queryString from "@/utils/queryString";

import LanguageSwitcher from "@/components/LanguageSwitcher";

import Notifications from "./Notifications";

export default {
  name: "Navbar",
  components: {
    Notifications,
    LanguageSwitcher,
  },
  computed: {
    ...mapState([
      "sideBarOpen",
      "dark",
      "user",
      "stateParam",
      "currency",
    ]),
    ...mapGetters({ auth: "ifAuthenticated" }),
    state() {
      return btoa(this.stateParam);
    },
    username() {
      return this.user
        ? `${this.user.username}#${this.user.discriminator}`
        : "Anonymous";
    },
    avatar() {
      return this.user
        ? `${this.cdn}/avatars/${this.user.id}/${this.user.avatar}.png`
        : "";
    },
    loginUrl() {
      const loginParams = {
        client_id: config.clientId,
        redirect_uri: `${config.home}dashboard/home`,
        response_type: "token",
        scope: "identify guilds",
        state: this.state,
      };
      return `${config.discordApi}/oauth2/authorize${queryString(loginParams)}`;
    },
    increase() {
      return this.percentage && parseFloat(this.percentage) < 0 ? false : true;
    },
  },
  data() {
    return {
      dropDownOpen: false,
      notificationsOpen: false,
      cdn: config.discordCdn
    };
  },
  methods: {
    toggleDropDown() {
      this.notificationsOpen = false;
      this.dropDownOpen = !this.dropDownOpen;
    },
    toggleNotifications() {
      this.dropDownOpen = false;
      this.notificationsOpen = !this.notificationsOpen;
    },
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
    logout() {
      this.dropDownOpen = false;
      this.notificationsOpen = false;
      this.$store.dispatch("logout");
    },
  },
};
</script>