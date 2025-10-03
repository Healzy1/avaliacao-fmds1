<template>
  <v-container>
    <v-row class="pb-4 align-center mt-2">
      <v-col>
        <h1 class="text-h4 font-weight-black">Gerenciamento de Filmes</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          Adicione, edite e remova filmes do seu catálogo.
        </p>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="abrirDialogParaAdicionar" elevation="2">
          Adicionar Filme
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-row>
      <v-col>
        <v-card elevation="4">
          <v-data-table
            :headers="headers"
            :items="filmes"
            item-value="name"
            :row-props="getRowProps"
            hover
            density="comfortable"
          >
            <template v-slot:item.genero="{ item }">
              <v-chip :color="getColorForGenre(item.genero)" size="small" variant="elevated">
                {{ item.genero }}
              </v-chip>
            </template>

            <template v-slot:item.nota="{ item }">
              <div class="d-flex align-center">
                <v-progress-linear
                  :model-value="item.nota * 10"
                  :color="getNotaColor(item.nota)"
                  height="8"
                  rounded
                  class="flex-grow-1"
                ></v-progress-linear>
                <span class="ms-4 font-weight-bold">{{ item.nota }}</span>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-tooltip text="Editar Filme">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-pencil" variant="text" size="small" @click="abrirDialogParaEditar(item)"></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Remover Filme">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-delete" variant="text" size="small" @click="abrirDialogDeRemocao(item)"></v-btn>
                </template>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <FilmeFormDialog
      v-model:dialog="dialogVisivel"
      :item="itemSelecionado"
      @salvar="salvarFilme"
    />
    <ConfirmDialog
      v-model:dialog="dialogDelete"
      title="Confirmar Exclusão"
      :message="`Tem certeza que deseja remover o filme '${itemSelecionado?.titulo}'?`"
      @confirm="confirmarRemocao"
      @cancel="dialogDelete = false"
    />
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :timeout="3000"
      location="bottom right"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<style>
/* ... (os estilos continuam os mesmos) ... */
.highlight-row {
  background-color: rgba(var(--v-theme-primary), 0.15) !important;
  transition: background-color 0.5s ease-out;
}
.flash-row {
  animation: blink-effect 1.5s ease-in-out;
}
@keyframes blink-effect {
  0% { background-color: transparent; }
  25% { background-color: rgba(var(--v-theme-success), 0.25); }
  50% { background-color: transparent; }
  75% { background-color: rgba(var(--v-theme-success), 0.25); }
  100% { background-color: transparent; }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useFilmes from '@/composables/useFilmes';
import FilmeFormDialog from '@/components/FilmeFormDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const snackbar = ref({ visible: false, text: '', color: '' });
const showSnackbar = (text, color) => {
  snackbar.value.text = text;
  snackbar.value.color = color;
  snackbar.value.visible = true;
};
const { filmes, adicionarFilme, atualizarFilme, removerFilme } = useFilmes();
const route = useRoute();
const highlightedId = ref(null);
const flashingId = ref(null);
const dialogVisivel = ref(false);
const itemSelecionado = ref(null);
const dialogDelete = ref(false);
const headers = ref([
  { title: 'Título', align: 'start', key: 'titulo', width: '40%' },
  { title: 'Gênero', align: 'center', key: 'genero' },
  { title: 'Nota', align: 'center', key: 'nota' },
  { title: 'Ações', align: 'center', key: 'actions', sortable: false },
]);
onMounted(() => {
  const idFromQuery = Number(route.query.id);
  if (idFromQuery) {
    highlightedId.value = idFromQuery;
    setTimeout(() => {
      highlightedId.value = null;
    }, 3000);
  }
});
const getRowProps = ({ item }) => {
  const props = { class: '' };
  if (item.id === flashingId.value) {
    props.class = 'flash-row';
  }
  else if (item.id === itemSelecionado.value?.id || item.id === highlightedId.value) {
    props.class = 'highlight-row';
  }
  return props;
};
const abrirDialogParaAdicionar = () => {
  itemSelecionado.value = {};
  dialogVisivel.value = true;
};
const abrirDialogParaEditar = (item) => {
  itemSelecionado.value = { ...item };
  dialogVisivel.value = true;
};
const salvarFilme = (item) => {
  let savedItem;
  if (item.id) {
    atualizarFilme(item);
    savedItem = item;
  } else {
    savedItem = adicionarFilme(item);
  }
  dialogVisivel.value = false;
  itemSelecionado.value = null;
  flashingId.value = savedItem.id;
  setTimeout(() => {
    flashingId.value = null;
  }, 1500);
  showSnackbar('Filme salvo com sucesso!', 'success');
};
const abrirDialogDeRemocao = (item) => {
  itemSelecionado.value = item;
  dialogDelete.value = true;
};
const confirmarRemocao = () => {
  removerFilme(itemSelecionado.value.id);
  dialogDelete.value = false;
  itemSelecionado.value = null;
  showSnackbar('Filme removido.', 'info');
};

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

const getNotaColor = (nota) => {
  if (nota >= 8) return 'success';
  if (nota >= 5) return 'warning';
  return 'error';
};
</script>