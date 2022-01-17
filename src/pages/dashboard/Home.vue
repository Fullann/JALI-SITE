<template>
  <div id="settings">
    <breadcrumbs :name="$t('sidebar.settings')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
     
    </div>
  </div>
</template>


<script>
import {  mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs";


export default {
  name: "Home",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },  
 
};
</script>