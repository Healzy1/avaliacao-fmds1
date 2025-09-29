<template>
  <v-list density="compact" nav>
    <v-list-item
      :prepend-icon="rail ? 'mdi-menu' : 'mdi-chevron-left'"
      :title="!rail ? 'Movie Checker' : ''"
      class="font-weight-bold"
      nav
      @click.stop="$emit('toggle-rail')"
    >
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item
      v-for="item in menuItems"
      :key="item.value"
      :prepend-icon="item.icon"
      :title="item.title"
      :value="item.value"
      :to="item.to"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list-item @click="toggleTheme">
      <template v-slot:prepend>
        <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
      </template>
      <v-list-item-title>
        {{ theme.global.current.value.dark ? 'Modo Escuro' : 'Modo Claro' }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';

defineProps({
  rail: Boolean
});

defineEmits(['toggle-rail']);

const theme = useTheme();

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});

const menuItems = ref([
  { title: 'Início', icon: 'mdi-home', value: 'inicio', to: '/' },
  { title: 'CRUD (Tabela)', icon: 'mdi-table', value: 'crud', to: '/crud' },
  { title: 'Listagem (Cards)', icon: 'mdi-view-gallery', value: 'listagem', to: '/listagem' },
  { title: 'Sobre', icon: 'mdi-information', value: 'sobre', to: '/sobre' }
]);
</script>