
[![MIT License][license-shield]][license-url]
# API de Universidades do Brasil
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
     <ul>
        <li><a href="#exemplos-de-pesquisa-na-api-hospedada">Exemplos</a></li>
     </ul>
    </li>
    <li>
      <a href="#dependências">Dependências</a>
    </li>
    <li>
      <a href="#instalação-e-execução">Instalação e execução</a>
      <ul>
        <li><a href="#opção-1-rodando-o-container-docker-localmente">Opção 1</a></li>
        <li><a href="#opção-2-rodando-a-api-localmente-com-node">Opção 2</a></li>
      </ul>
    </li>
    <li><a href="#testes-de-api">Testes de api</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#licença">Contato</a></li>
  </ol>
</details>

# Sobre o projeto
> Fornece um endpoint para pesquisa de universidades do Brasil.

Uma API que lista as universidades do Brasil com informações sobre nome, domínios e páginas web. [Demo](https://brazil-universities-api.herokuapp.com/search) hospedada em container Docker na [Heroku](https://devcenter.heroku.com/articles/container-registry-and-runtime)


## Exemplos de pesquisa na API hospedada

```
https://brazil-universities-api.herokuapp.com/search
 https://brazil-universities-api.herokuapp.com/search?universityName=Estacio
https://brazil-universities-api.herokuapp.com/search?universityName=Universidade&stateProvince=Maranhao 
````    

Endpoints de pesquisa:
```
/search
/search?universityName=Universidade
/search?universityName=Universidade&stateProvince=Maranhao
```

Mais informações acesse a documentação da API feita com  [Swagger](https://swagger.io/) acessando o endpoint abaixo:

```
/api-docs
```

# Dependências
- [NodeJS](https://nodejs.org/pt-br/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://labs.play-with-docker.com/)
# Instalação e execução
## Opção 1 Rodando o container Docker localmente
1. Baixe e instale o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/install/)
2. Clone este repositório para sua máquina	 
4. Renomeie o arquivo **.env.docker.example**  para **.env**
5. Rode o comando abaixo para iniciar todos os containers. Esse comando irá baixar as imagens e executar os containers.
```bash
docker-compose up
```
6. Abra no navegador a URL abaixo para verificar se a API está em execução corretamente.
```
http://localhost:8088/
```
Se tudo estiver OK, você receberá uma resposta para a requisição semelhante a esta:
```json
{
	"author":{
		"name":"João Pedro de Freitas Brito",
		"website":"https://github.com/joaoplay16"
	},
	"github":"https://github.com/joaoplay16/brazil-university-api",
	"example":"https://brazil-universities-api.herokuapp.com/search"
}
```

## Opção 2 Rodando a API localmente com Node
1. Clone este repositório para sua máquina	
2. Renomeie o arquivo **.env.example**  para **.env** e adicione a URI do banco de dados MongoDB.
```
MONGODB_URI=<YOUR_MONGODB_URI>
```
3. Execute o comando `yarn install` para instalar as dependências.
4. Execute o comando `yarn dev` para iniciar o servidor em modo de desenvolvimento.
5. Abra no navegador a URL abaixo para verificar se a API está em execução corretamente.
```
http://localhost:8088/
```
Se tudo estiver OK, você receberá uma resposta para a requisição semelhante a esta:
```json
{
	"author":{
		"name":"João Pedro de Freitas Brito",
		"website":"https://github.com/joaoplay16"
	},
	"github":"https://github.com/joaoplay16/brazil-university-api",
	"example":"https://brazil-universities-api.herokuapp.com/search"
}
```

# Testes de API

Os testes foram realizados com  [Jest](https://jestjs.io/)

#### Executando os testes

Para rodar os testes execute o comando:

```bash
yarn test
```
ou
```bash
yarn test:watch
```
# Licença
Distribuído sob a licença do MIT. Ver `LICENSE` para mais informações.

# Contato
joaoplay16@gmail.com

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/joaoplay16/brazil-universities-api/blob/main/LICENSE