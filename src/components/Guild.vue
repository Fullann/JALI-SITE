<template>
  <div class="m-5 w-full lg:w-4/12">
    <div
      class="
        shadow-lg shadow-purple-200
        p-4
        rounded
        bg-gradient-to-bl
        from-purple-300
        to-blue-900
        flex flex-col
        justify-center
        items-center
        mt-4
        max-w-[24rem]
      "
    >
      <img
        class="w-20 h-20 object-cover rounded-full mb-2"
        :src="`${cdn}/icons/${guild.id}/${guild.icon}.png`"
        alt="logo"
      />
      <p class="text-gray-100 font-semibold">{{ guild.name }}</p>
    </div>
    <div class="flex justify-end">
      <a
        v-if="isJoined"
        target="_blank"
        :href="`${botUrl}${guild.id}`"
        class="
          mt-3
          sm:mt-0
          py-2
          px-5
          md:py-3 md:px-6
          bg-indigo-700
          hover:bg-indigo-600
          font-bold
          text-white
          rounded-lg
          shadow-md
        "
        >{{ $t("guilds.add") }}</a
      >
      <router-link
        v-else
        :to="{ path: 'dashboard' }"
        class="
          mt-3
          sm:mt-0
          py-2
          px-5
          md:py-3 md:px-6
          bg-indigo-700
          hover:bg-indigo-600
          font-bold
          text-white
          rounded-lg
          shadow-md
        "
      >
        {{ $t("guilds.configure") }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.active {
  box-sizing: content-box;
  border: 2px solid #f83f3f;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";
import config from "@/config";

export default {
  name: "Guild",
  props: {
    guild: Object,
    isJoined: {
      default: false,
    },
  },
  computed: {
    ...mapState(["user", "token"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      cdn: config.discordCdn,
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot&guild_id=`,
    };
  },
};
</script>