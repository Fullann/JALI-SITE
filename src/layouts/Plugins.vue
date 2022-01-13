<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">

      <div
        class="w-full bg-gray-200 dark:bg-gray-900 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      >
        <Header />

        <div class="min-h p-6 bg-gray-200 dark:bg-gray-900">
          <fade-transition>
            <keep-alive include="DashboardHome,Logs,Commands" :max="3">
              <router-view />
            </keep-alive>
          </fade-transition>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h {
  min-height: calc(100% - 8rem);
}
</style>

<script>
import { mapState } from "vuex";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { FadeTransition } from "vue2-transitions";

export default {
  name: "Plugins",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    Header,
    Footer,
    FadeTransition,
  },
};
</script>
