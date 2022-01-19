<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">
      <div
        class="w-full bg-gray-200 dark:bg-gray-900 min-h-screen"
        id="main-content"
      >
        <Header />

        <div class="min-h p-6 flex justify-center bg-gray-200 dark:bg-gray-900">
          <h1 class="text-2xl">{{ $t("guilds.titel") }}</h1>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import config from "@/config";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Guilds",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
    ...mapState(["user", "stateParam"]),
    state() {
      return btoa(this.stateParam);
    },
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
    };
  },
  beforeMount() {
    if (this.auth) this.$store.dispatch("setGuilds", this.token);
  },
};
</script>