import { ref, watch } from 'vue';

// O "export default function" torna esta lógica importável em qualquer componente
export default function useFilmes() {

    // "filmes" é uma referência reativa. Qualquer mudança nela atualizará a interface
    // Começa carregando os dados do localStorage ou, se não houver nada, um array vazio
    const filmes = ref(JSON.parse(localStorage.getItem('meus_filmes') || '[]'));

    // Função para adicionar um novo filme
    const adicionarFilme = (novoFilme) => {
        // Lógica para encontrar o maior ID atual
        const maiorId = filmes.value.reduce((maxId, filme) => Math.max(filme.id || 0, maxId), 0);

        // O novo filme terá o maior id + 1
        const filmeComId = { ...novoFilme, id: maiorId + 1 };
        filmes.value.push(filmeComId);
        return filmeComId;
    };

    // FUnção para atualizar um filme
    const atualizarFilme = (filmeAtualizado) => {
        const index = filmes.value.findIndex(f => f.id === filmeAtualizado.id);
        if (index !== -1) {
            filmes.value[index] = filmeAtualizado;
        }
    };

    // Função para remover um filme pelo ID
    const removerFilme = (id) => {
        filmes.value = filmes.value.filter(f => f.id !== id);
    };

    // Watch para salvar no local storage sempre que 'filmes' mudar
    watch(filmes, (novoValor) => {
        localStorage.setItem('meus_filmes', JSON.stringify(novoValor));
    }, { deep: true });

    // Retornar as referências e funções para que possam ser usadas em componentes
    return {
        filmes,
        adicionarFilme,
        atualizarFilme,
        removerFilme
    };
}