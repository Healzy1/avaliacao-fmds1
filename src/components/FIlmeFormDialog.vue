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
////
const emit = defineEmits(['update:dialog', 'salvar']);

// 3. Criamos uma referência para o nosso formulário
const form = ref(null);
const filmeEditado = ref({});

const formTitle = computed(() => {
  return props.item && props.item.id ? 'Editar Filme' : 'Novo Filme';
});

// 4. Criamos nosso array de regras de validação para a nota
const notaRules = [
  // Regra 1: Verifica se o campo não está vazio
  v => !!v || 'Nota é obrigatória.',
  // Regra 2: Verifica se o valor está entre 0 e 10
  v => (v >= 0 && v <= 10) || 'A nota deve ser entre 0 e 10.',
];

watch(() => props.item, (novoItem) => {
  filmeEditado.value = { ...novoItem };
}, { immediate: true });

// 5. Modificamos a função 'salvar' para verificar a validação
const salvar = async () => {
  // Acionamos a validação de todos os campos do formulário
  const { valid } = await form.value.validate();

  // Se o formulário for válido, emitimos o evento 'salvar'
  if (valid) {
    emit('salvar', filmeEditado.value);
    fechar();
  }
};

const fechar = () => {
  emit('update:dialog', false);
};
</script>