<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
      <MenuList :rail="rail" @toggle-rail="rail = !rail" />
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  import MenuList from '@/components/MenuList.vue'
  import AppFooter from '@/components/AppFooter.vue'
  import { ref } from 'vue'
  const drawer = ref(true)
  const rail = ref(true)
</script>