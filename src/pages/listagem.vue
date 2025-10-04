<template>
  <v-container>
    <v-row class="mt-2 pb-4 align-center">
      <v-col>
        <h1 class="text-h4 font-weight-black">Catálogo de Filmes</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          Explore, busque e ordene os filmes da sua coleção.
        </p>
      </v-col>
    </v-row>
    <v-divider class="mb-6"></v-divider>

    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="termoBusca"
          label="Buscar por título..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="ordenacao"
          label="Ordenar por"
          :items="opcoesOrdenacao"
          item-title="texto"
          item-value="valor"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="filme in filmesFiltradosEOrdenados"
        :key="filme.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <FilmeCard :filme="filme" />
      </v-col>
    </v-row>

    <v-row v-if="filmesFiltradosEOrdenados.length === 0" class="mt-8">
      <v-col class="text-center text-grey">
        <p>Nenhum filme encontrado.</p>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import useFilmes from '@/composables/useFilmes';
import FilmeCard from '@/components/FilmeCard.vue';

const { filmes } = useFilmes();

const termoBusca = ref('');
const ordenacao = ref('titulo-asc');
const opcoesOrdenacao = ref([
  { texto: 'Título (A-Z)', valor: 'titulo-asc' },
  { texto: 'Título (Z-A)', valor: 'titulo-desc' },
  { texto: 'Nota (Maior para Menor)', valor: 'nota-desc' },
  { texto: 'Nota (Menor para Maior)', valor: 'nota-asc' },
]);

const filmesFiltradosEOrdenados = computed(() => {
  let filmesProcessados = [...filmes.value];

  if (termoBusca.value) {
    filmesProcessados = filmesProcessados.filter(filme =>
      filme.titulo.toLowerCase().includes(termoBusca.value.toLowerCase())
    );
  }

  switch (ordenacao.value) {
    case 'titulo-asc':
      filmesProcessados.sort((a, b) => a.titulo.localeCompare(b.titulo));
      break;
    case 'titulo-desc':
      filmesProcessados.sort((a, b) => b.titulo.localeCompare(a.titulo));
      break;
    case 'nota-desc':
      filmesProcessados.sort((a, b) => b.nota - a.nota);
      break;
    case 'nota-asc':
      filmesProcessados.sort((a, b) => a.nota - b.nota);
      break;
  }

  return filmesProcessados;
});
</script>