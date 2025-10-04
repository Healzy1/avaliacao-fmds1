import { ref, watch } from 'vue';

export default function useFilmes() {
  // Carrega os filmes do localStorage ao iniciar, ou cria um array vazio se não houver nada salvo.
  const filmes = ref(JSON.parse(localStorage.getItem('meus_filmes') || '[]'));

  const adicionarFilme = (novoFilme) => {
    // Usa 'reduce' para encontrar o maior ID existente e garantir um novo ID único.
    const maiorId = filmes.value.reduce((maxId, filme) => Math.max(filme.id || 0, maxId), 0);
    const filmeComId = { ...novoFilme, id: maiorId + 1 };
    
    filmes.value.push(filmeComId);
    return filmeComId;
  };

  const atualizarFilme = (filmeAtualizado) => {
    const index = filmes.value.findIndex(f => f.id === filmeAtualizado.id);
    if (index !== -1) {
      filmes.value[index] = filmeAtualizado;
    }
  };

  const removerFilme = (id) => {
    filmes.value = filmes.value.filter(f => f.id !== id);
  };

  // Observa a lista de 'filmes' e salva no localStorage a cada alteração.
  watch(filmes, (novoValor) => {
    localStorage.setItem('meus_filmes', JSON.stringify(novoValor));
  }, { 
    // A opção 'deep' é para detectar alterações dentro dos objetos do array (ex: editar uma nota).
    deep: true 
  });

  return {
    filmes,
    adicionarFilme,
    atualizarFilme,
    removerFilme
  };
}