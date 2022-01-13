<template>
<div  v-if="description != undefined">
  <div class="w-full mt-8 px-3">
    <div
      class="w-full flex justify-between rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 mb-8 xl:mb-0"
    >
      <div>
        <p class="text-lg mb-1">{{ command }}</p>
        <p class="text-sm mb-1">{{ description }}</p>
      </div>
    </div>
  </div>
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

export default {
  name: "Command",
  props: {
    id: String,
    command: String,
    description: String,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
};
</script>