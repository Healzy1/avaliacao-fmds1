<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="py-4" />

      <v-icon
        icon="mdi-movie-roll"
        color="primary"
        size="88"
      ></v-icon>

      <h1 class="text-h2 font-weight-black my-4">
        Bem-vindo ao <span class="text-primary">Movie Checker</span>
      </h1>

      <div class="text-h6 text-medium-emphasis font-weight-regular">
        Sua biblioteca de filmes pessoal.
        <br>
        Salve e gerencie seus filmes, adicione gêneros e atribua notas.
      </div>

      <div class="py-4" />

      <v-row class="d-flex align-center justify-center" dense>
        <v-col cols="auto">
          <v-btn
            color="primary"
            to="/listagem"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
          >
            <v-icon
              icon="mdi-view-gallery"
              size="large"
              start
            />
            Ver Catálogo
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            to="/crud"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="outlined"
          >
            <v-icon
              icon="mdi-table-edit"
              size="large"
              start
            />
            Gerenciar Filmes
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
</script>