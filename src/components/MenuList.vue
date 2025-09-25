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
  </v-list>
</template>

<script setup>
import { ref } from 'vue';

// Define que este componente aceita a propriedade 'rail'
defineProps({
  rail: Boolean
});

// Define o evento que o componente pode emitir
defineEmits(['toggle-rail']);

// Array de dados para os itens do menu
const menuItems = ref([
  { title: 'Início', icon: 'mdi-home', value: 'inicio', to: '/' },
  { title: 'CRUD (Tabela)', icon: 'mdi-table', value: 'crud', to: '/crud' },
  { title: 'Listagem (Cards)', icon: 'mdi-view-gallery', value: 'listagem', to: '/listagem' },
  { title: 'Sobre', icon: 'mdi-information', value: 'sobre', to: '/sobre' }
]);
</script>