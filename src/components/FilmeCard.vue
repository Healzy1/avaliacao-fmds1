<template>
  <v-card
    class="mx-auto d-flex flex-column"
    elevation="4"
    hover
    height="100%"
  >
    <v-card-title class="text-h5 pb-0">
      {{ filme.titulo }}
    </v-card-title>

    <v-card-text class="pt-2">
      <v-chip :color="getColorForGenre(filme.genero)" size="small" variant="tonal" class="mb-2">
        {{ filme.genero }}
      </v-chip>
      
      <div class="d-flex align-center">
        <v-rating
          :model-value="filme.nota / 2"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>
        <div class="text-grey ms-4">
          {{ filme.nota }} / 10
        </div>
      </div>
    </v-card-text>

    <v-spacer></v-spacer>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip text="Gerenciar na tabela">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-table-edit"
            :to="`/crud?id=${filme.id}`"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  filme: {
    type: Object,
    required: true
  }
});

// Reutilizamos a mesma lógica de cores para os chips de gênero
const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'deep-purple-accent-4', 'pink-accent-3', 'teal', 'orange'];
const getColorForGenre = (genero) => {
  if (!genero) return 'grey';
  let hash = 0;
  for (let i = 0; i < genero.length; i++) {
    hash = genero.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};
</script>