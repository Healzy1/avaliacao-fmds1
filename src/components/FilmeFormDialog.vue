<template>
  <v-dialog :model-value="dialog" @update:model-value="fechar" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="filmeEditado.titulo"
                  label="Título do Filme"
                  :rules="[v => !!v || 'Título é obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="filmeEditado.genero"
                  label="Gênero"
                  :rules="[v => !!v || 'Gênero é obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="filmeEditado.nota"
                  label="Nota (0-10)"
                  type="number"
                  :rules="notaRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="fechar">
          Cancelar
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="salvar">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  dialog: Boolean,
  item: Object
});

const emit = defineEmits(['update:dialog', 'salvar']);

const form = ref(null);
const filmeEditado = ref({});

const formTitle = computed(() => {
  return props.item && props.item.id ? 'Editar Filme' : 'Novo Filme';
});

const notaRules = [
  v => !!v || 'Nota é obrigatória.',
  v => (v >= 0 && v <= 10) || 'A nota deve ser entre 0 e 10.',
];

watch(() => props.item, (novoItem) => {
  filmeEditado.value = { ...novoItem };
}, { immediate: true });

const salvar = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    emit('salvar', filmeEditado.value);
  }
};

const fechar = () => {
  emit('update:dialog', false);
};
</script>