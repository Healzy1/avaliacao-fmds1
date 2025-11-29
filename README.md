# Projeto: Movie Checker

## Descrição do Projeto

Aplicação web para catalogação e gerenciamento de uma biblioteca de filmes, desenvolvida como projeto de avaliação para a disciplina de Frameworks Modernos para Desenvolvimento de Sistemas. O projeto utiliza Vue 3, Vite e Vuetify 3, implementando um CRUD completo com persistência de dados local.

## Tema Escolhido

Biblioteca de Jogos/Filmes: CRUD de itens (título, gênero, nota); listagem com busca e ordenação; página "Sobre" com estatísticas básicas (contagem por gênero).

## Integrantes do Grupo

* **Nome Completo:** Ícaro Gabriel Alves dos Reis
    * **Matrícula:** 20230004966
* **Nome Completo:** Guilherme Henrique Anschau Xavier De Oliveira
    * **Matrícula:** 20230021439

## Como Instalar e Executar o Projeto

### Pré-requisitos

* **Node.js:** `v22.18.0` (ou uma versão compatível, como `^22.x`)
* **npm** (geralmente instalado junto com o Node.js)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Healzy1/avaliacao-fmds1.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd avaliacao-fmds1
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000` (ou em outra porta indicada no terminal, caso seja alterada).

## Acessar a Aplicação

A versão de produção deste projeto está disponível para acesso no link:

**[https://avaliacao-fmds1.vercel.app/](https://avaliacao-fmds1.vercel.app/)**

## Estrutura do Projeto

* **`/src/components`**: Contém os componentes reutilizáveis da aplicação, como `FilmeCard.vue`, `FilmeFormDialog.vue`, `ConfirmDialog.vue`, `MenuList.vue` e `AppFooter.vue`.
* **`/src/composables`**: Armazena a lógica de estado reutilizável. `useFilmes.js` é o "cérebro" que gerencia todos os dados dos filmes e a persistência em `localStorage`.
* **`/src/layouts`**: Define a estrutura visual principal da aplicação, contendo o menu de navegação e o container para as páginas.
* **`/src/pages`**: Contém os componentes de cada página/rota da aplicação (`index.vue`, `crud.vue`, `listagem.vue`, `sobre.vue`).