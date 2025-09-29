<template>
  <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', false)" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('cancel')">Cancelar</v-btn>
        <v-btn color="error" text @click="$emit('confirm')">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  dialog: Boolean,
  title: String,
  message: String,
});
defineEmits(['update:dialog', 'confirm', 'cancel']);
</script>