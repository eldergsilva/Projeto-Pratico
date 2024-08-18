# Amazon Beauty co

**Amazon Beauty co** é uma API para uma loja de cosméticos naturais, desenvolvida com Node.js e MongoDB. O sistema inclui funcionalidades para cadastro e login de usuários, CRUD de produtos e carrinho (em desenvolvimento). 

![Imagem do Projeto](https://link-para-sua-imagem.com/imagem.png)

## Badges

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)

## Instalação

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/eldergsilva/Projeto-Pratico.git
    ```

2. **Navegue até o diretório do projeto**:

    ```bash
    cd Projeto-Pratico
    ```

3. **Instale as dependências**:

    Navegue para o diretório `api` e execute:

    ```bash
    cd api
    npm install
    ```

4. **Configure o banco de dados MongoDB**:

    - Crie um arquivo `.env` na pasta `api` com as seguintes variáveis de ambiente:

      ```dotenv
      MONGODB_URI=<SUA_URI_DO_MONGODB>
      JSON_SECRET=<SEU_SEGREDO_JSON>
      ```

    - Substitua `<SUA_URI_DO_MONGODB>` com a URI de conexão do MongoDB e `<SEU_SEGREDO_JSON>` com um segredo para JWT.

5. **Inicie o servidor**:

    Na pasta `api`, execute:

    ```bash
    npm run start
    ```

## Uso

- Acesse o front-end na pasta `app` através do arquivo `index.html` para testar a interação com a API.

## Funcionalidades

- **Cadastro de Usuário**: Permite aos usuários se registrarem.
- **Login de Usuário**: Permite aos usuários fazer login.
- **CRUD de Usuário**: Cadastrar, buscar, editar e deletar usuários.
- **CRUD de Produto**: Adicionar, buscar, editar e deletar produtos.
- **CRUD de Carrinho** (em desenvolvimento).

## Testes

- Execute os testes automatizados:

    ```bash
    cd api
    npm test
    ```

## Capturas de Tela

### Tela Inicial

![Captura de Tela - Tela Inicial](https://link-para-sua-imagem.com/tela-inicial.png)

### Tela de Cadastro

![Captura de Tela - Tela de Cadastro](https://link-para-sua-imagem.com/tela-cadastro.png)

## Contribuição

Se desejar contribuir, faça um fork do repositório, faça suas alterações e envie um pull request. Consulte o [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

## Contato

Para mais informações ou dúvidas, entre em contato com [Elder Gomes](mailto:eldergsilva@gmail.com).
