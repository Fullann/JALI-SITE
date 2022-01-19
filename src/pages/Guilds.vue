<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">
      <div
        class="w-full bg-gray-200 dark:bg-gray-900 min-h-screen"
        id="main-content"
      >
        <Header />
        <div class="flex justify-center">
          <div class="min-h p-6 w-5/6 bg-gray-200 dark:bg-gray-900">
            <h1 class="text-center text-2xl">{{ $t("guilds.titel") }}</h1>

            <h1 v-if="guildsJoined" class="text-left text-2xl">{{ $t("guilds.titelConfigure") }}</h1>
            <div class="block w-full lg:flex content-center">
              <Guild
                v-for="(guild, idx) in guildsJoined"
                :key="idx"
                :guild="guild"
                :isJoined="false"
              />
            </div>
            <h1 v-if="guilds" class="text-left text-2xl">{{ $t("guilds.titelAdd") }}</h1>
            <div class="block lg:flex content-center">
              <Guild
                v-for="(guild, idx) in guilds"
                :key="idx"
                :guild="guild"
                :isJoined="true"
              />
            </div>
          </div>
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

import Guild from "@/components/Guild";

export default {
  name: "Guilds",
  components: {
    Header,
    Footer,
    Guild,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
    ...mapState(["user", "token", "stateParam", "guildsJoined", "guilds"]),
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
    if (this.auth) {
      this.$store.dispatch("setGuilds", this.token);
    }
  },
};
</script>