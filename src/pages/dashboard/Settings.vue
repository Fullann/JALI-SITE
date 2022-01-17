<template>
  <div id="settings">
    <breadcrumbs :name="$t('sidebar.settings')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("settings.general") }}</p>
      <div class="flex">
        <label class="block w-1/2 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t("settings.prefix")
          }}</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="$"
            v-model="currentPrefix"
            @change="onPrefixChange"
          />
        </label>
      </div>
    </div>
  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs";

import config from "@/config";
import fetch from "@/utils/fetch";
import queryString from "@/utils/queryString";

export default {
  name: "Settings",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      defaultPrefix: "<",
      currentPrefix: "",
      botEnabled: true,
    };
  },
  methods: {
    onPrefixChange() {
      //change prefix endpoint
      if (!this.currentGuildId || !this.auth) {
        this.$toast.info("No guild has been selected");
        return;
      }

      fetch(
        `${config.botApi}/mappings/prefix${queryString({
          guildId: this.currentGuildId,
        })}`,
        {
          method: "post",
          headers: {
            authorization: this.token,
          },
          body: JSON.stringify({ prefix: this.currentPrefix }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.botEnabled = this.currentPrefix.length < 15 ? true : false;
            this.$toast.success(
              `Prefix has been updated to ${this.currentPrefix}`
            );
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() =>
          this.$toast.warning("Failed to change prefix. Are you offline?")
        );
    },
    refresh(val) {
      if (!this.auth) return;
      fetch(`${config.botApi}/guilds/${this.currentGuildId}`,
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: this.token,
          },
          body: JSON.stringify({settings: { guiID: this.currentGuildId }}),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.botEnabled = this.currentPrefix.length < 15 ? true : false;
            this.$toast.info("Settings refreshed");
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() =>
          this.$toast.warning("Failed to refresh. Are you offline?")
        );

      fetch(`${config.botApi}/mappings/coin/${val}`, {
        headers: {
          authorization: this.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.coinKind) {
            this.$refs.coins.value = response.coinKind;
          }
        })
        .catch(() =>
          this.$toast.warning("Failed to refresh. Are you offline?")
        );
    },
  },
  watch: {
    currentGuildId(val) {
      this.refresh(val);
    },
  },
  mounted() {
    this.currentGuildId && this.refresh(this.currentGuildId);
  },
};
</script>