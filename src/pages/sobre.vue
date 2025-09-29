<template>
  <v-container>
    <div class="mt-2 pb-4">
      <h1 class="text-h4 font-weight-black">Sobre o Projeto</h1>
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        Estatísticas dinâmicas do catálogo de filmes.
      </p>
    </div>
    <v-divider class="mb-6"></v-divider>

    <v-row>
      <v-col cols="12" md="4">
        <v-card
          variant="tonal"
          color="primary"
          class="d-flex flex-column"
          height="100%"
        >
          <v-card-text class="flex-grow-1 d-flex flex-column justify-center align-center text-center">
            <div>
              <v-icon icon="mdi-movie-open-outline" size="48" class="mb-2"></v-icon>
              <div class="text-h2 font-weight-black">{{ totalFilmes }}</div>
              <div class="text-h6 font-weight-regular">Filme(s) no Catálogo</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card
          variant="tonal"
          height="100%"
        >
          <v-card-title>
            Filmes por Gênero
          </v-card-title>
          <v-card-text v-if="Object.keys(filmesPorGenero).length > 0">
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="(contagem, genero) in filmesPorGenero"
                :key="genero"
                :color="getColorForGenre(genero)"
                variant="elevated"
                size="large"
              >
                {{ genero }}: {{ contagem }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-text v-else class="text-grey d-flex align-center justify-center fill-height">
            <p>Nenhum filme cadastrado para gerar estatísticas.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import useFilmes from '@/composables/useFilmes';

const { filmes } = useFilmes();

const totalFilmes = computed(() => {
  return filmes.value.length;
});

const filmesPorGenero = computed(() => {
  return filmes.value.reduce((acc, filme) => {
    const genero = filme.genero || 'Não categorizado';
    if (!acc[genero]) {
      acc[genero] = 0;
    }
    acc[genero]++;
    return acc;
  }, {});
});

// Função para dar cores diferentes e aleatórias para os chips de gênero
const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'deep-purple-accent-4', 'pink-accent-3', 'teal', 'orange'];
const getColorForGenre = (genero) => {
  let hash = 0;
  for (let i = 0; i < genero.length; i++) {
    hash = genero.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};
</script>