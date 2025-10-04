<template>
  <v-container>
    <div class="mt-2 pb-4">
      <h1 class="text-h4 font-weight-black">Dashboard do Catálogo</h1>
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        Uma análise completa dos filmes que você cadastrou.
      </p>
    </div>
    <v-divider class="mb-6"></v-divider>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="primary" class="d-flex flex-column justify-center text-center" height="150">
          <v-icon icon="mdi-movie-open-outline" size="32" class="mb-2"></v-icon>
          <div class="text-h4 font-weight-black">{{ totalFilmes }}</div>
          <div class="text-body-1">Filme(s) no Catálogo</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="amber" class="d-flex flex-column justify-center text-center" height="150">
          <v-icon icon="mdi-star-half-full" size="32" class="mb-2"></v-icon>
          <div class="text-h4 font-weight-black">{{ mediaGeralNotas }}</div>
          <div class="text-body-1">Média Geral</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="secondary" class="d-flex flex-column justify-center text-center" height="150">
          <v-icon icon="mdi-trophy-outline" size="32" class="mb-2"></v-icon>
          <div class="text-h4 font-weight-black">{{ generoFavorito }}</div>
          <div class="text-body-1">Gênero Favorito</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card variant="tonal" class="mt-4">
          <v-card-title>Distribuição das Notas</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, index) in distribuicaoNotas" :key="index">
                <v-list-item-title class="font-weight-medium">{{ item.faixa }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.contagem }} filme(s)</v-list-item-subtitle>
                <template v-slot:append>
                  <div style="width: 150px">
                    <v-progress-linear :model-value="(item.contagem / totalFilmes) * 100" :color="item.cor" height="8" rounded></v-progress-linear>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-card variant="tonal" class="mt-4" color="success">
          <v-card-title>Filme(s) com Maior Nota ({{ melhoresFilmes.nota }})</v-card-title>
          <v-card-text>
            <v-chip v-for="filme in melhoresFilmes.filmes" :key="filme.id" class="ma-1">
              {{ filme.titulo }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="tonal" class="mt-4" color="error">
          <v-card-title>Filme(s) com Menor Nota ({{ pioresFilmes.nota }})</v-card-title>
          <v-card-text>
            <v-chip v-for="filme in pioresFilmes.filmes" :key="filme.id" class="ma-1">
              {{ filme.titulo }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card variant="tonal" class="mt-4">
          <v-card-title>Média de Nota por Gênero</v-card-title>
          <v-card-text>
             <v-list>
              <v-list-item v-for="(media, genero) in mediaPorGenero" :key="genero">
                <v-list-item-title class="font-weight-medium">{{ genero }}</v-list-item-title>
                <template v-slot:append>
                  <div class="d-flex align-center">
                    <v-rating :model-value="media / 2" color="amber" density="compact" half-increments readonly size="small"></v-rating>
                    <span class="ms-2 text-body-2 font-weight-bold">({{ media.toFixed(1) }})</span>
                  </div>
                </template>
              </v-list-item>
            </v-list>
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

const totalFilmes = computed(() => filmes.value.length);

const filmesPorGenero = computed(() => {
  return filmes.value.reduce((acc, filme) => {
    // Sanitiza o nome do gênero para agrupar de forma consistente (ex: "Ação" e " ação " viram "Ação").
    let genero = filme.genero?.trim() || 'Não categorizado';
    genero = genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    
    if (!acc[genero]) acc[genero] = 0;
    acc[genero]++;
    return acc;
  }, {});
});

const mediaGeralNotas = computed(() => {
  if (totalFilmes.value === 0) return 'N/A';
  const soma = filmes.value.reduce((acc, filme) => acc + Number(filme.nota), 0);
  return (soma / totalFilmes.value).toFixed(1);
});

const generoFavorito = computed(() => {
  const generos = filmesPorGenero.value;
  if (Object.keys(generos).length === 0) return 'N/A';
  return Object.keys(generos).reduce((a, b) => generos[a] > generos[b] ? a : b);
});

const melhoresFilmes = computed(() => {
  if (totalFilmes.value === 0) return { nota: 'N/A', filmes: [] };
  const maxNota = Math.max(...filmes.value.map(f => f.nota));
  return {
    nota: maxNota,
    filmes: filmes.value.filter(f => f.nota == maxNota)
  };
});

const pioresFilmes = computed(() => {
  if (totalFilmes.value === 0) return { nota: 'N/A', filmes: [] };
  const minNota = Math.min(...filmes.value.map(f => f.nota));
  return {
    nota: minNota,
    filmes: filmes.value.filter(f => f.nota == minNota)
  };
});

const mediaPorGenero = computed(() => {
  const generos = {};
  filmes.value.forEach(filme => {
    let genero = filme.genero?.trim() || 'Não categorizado';
    genero = genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    if (!generos[genero]) {
      generos[genero] = { soma: 0, contagem: 0 };
    }
    generos[genero].soma += Number(filme.nota);
    generos[genero].contagem++;
  });

  const medias = {};
  for (const genero in generos) {
    medias[genero] = generos[genero].soma / generos[genero].contagem;
  }
  return medias;
});

const distribuicaoNotas = computed(() => {
  const faixas = {
    'Excelentes (9-10)': { contagem: 0, cor: 'success' },
    'Muito Bons (7-8.9)': { contagem: 0, cor: 'teal' },
    'Regulares (5-6.9)': { contagem: 0, cor: 'warning' },
    'Fracos (< 5)': { contagem: 0, cor: 'error' },
  };

  filmes.value.forEach(filme => {
    const nota = Number(filme.nota);
    if (nota >= 9) faixas['Excelentes (9-10)'].contagem++;
    else if (nota >= 7) faixas['Muito Bons (7-8.9)'].contagem++;
    else if (nota >= 5) faixas['Regulares (5-6.9)'].contagem++;
    else faixas['Fracos (< 5)'].contagem++;
  });

  return Object.entries(faixas).map(([faixa, dados]) => ({ faixa, ...dados }));
});
</script>