<template>
  <div id="commands">
    <div class="flex justify-between">
      <breadcrumbs :name="$t('plugins.plugins')" />
    </div>
  <div class="flex justify-center">
    <p class="text-2xl mb-1">{{$t('command.titel')}}</p>
  </div>
    <template v-if="category.length">
     <div v-for="commands in category"  :key="commands.category">
        <p class="text-2xl mb-1 mt-4">{{commands.name}}</p>
        <Command
          v-for="(command, idx) in commands"
          :key="idx"
          :id="idx.toString()"
          :command="command.name"
          :description="command.description"
        />
     </div>
    </template>
    <template v-else><div class="w-full mt-8 px-3">Loading...</div></template>
  </div>
</template>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #969696;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #969696;
}
</style>

<script>
import { mapGetters } from "vuex";

import Breadcrumbs from "@/components/Breadcrumbs";
import Command from "@/components/Command";

import config from "@/config";
import fetch from "@/utils/fetch";

export default {
  name: "Commands",
  components: {
    Breadcrumbs,
    Command,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      category: [],
    };
  },
  methods: {
    refresh() {
      this.$toast.info("Loading commands");
      fetch(`${config.botApi}/commands`)
       .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        Object.keys(response.MESSAGES.COMMANDS).forEach(cat => {
          if(cat != "ADMIN" && cat != "SERVPERSO"){
            this.category.push(response.MESSAGES.COMMANDS[cat])
          }
        })      
      })
      .catch(() =>
          this.$toast.info(
            "Failed to get commands list. Are you offline?"
          )
        );
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>