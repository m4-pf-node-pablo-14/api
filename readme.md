<h1 align="center">
  m4-pf-node-pablo-14 - Rede Social
</h1>

<p align = "center">
Este é o backend da aplicação m4-pf-node-pablo-14 - Rede Social - Uma Rede Social desenvolvida por estudantes programadores da Kenzie! O objetivo dessa aplicação é conseguir colocar em prática o que foi ensinado no quarto módulo do curso (M4) - E desenvolver hard skills e soft skills.
</p>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 06 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu perfil, seguir outros usuários, criar postagens, fazer comentários em postagens e curtir os comentários e postagens realizadas. <br/>

<a href="https://insomnia.rest/run/?label=m4-pf-node-pablo-14%20-%20Rede%20Social&uri=https%3A%2F%2F1drv.ms%2Fu%2Fs!Ai3UBiWWhoUyq9o_mVRGZkZm19STyA" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<blockquote> Para importar o JSON no Insomnia é só clicar no botão "Run in Insomnia". Depois é só seguir os passos que ele irá importar todos os endpoints em seu insomnia.
</blockquote>
<br>

A url base da API é https://m4-pf-node-pablo-14.onrender.com

## Rotas que não precisam de autenticação

<h2 align ='center'> Criação de usuário </h2>

Nessa aplicação o usuário sem fazer login pode fazer o seu cadastro para acessar a plataforma, na API podemos fazer o cadastro dessa forma:

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Bruno",
  "last_name": "Campos",
  "email": "bruno@mail.com",
  "password": "1234",
  "username": "bruno",
  "address": {
    "city": "Bruno City",
    "district": "Street Bruno",
    "number": "00",
    "state": "BR",
    "zipCode": "12345678"
  }
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "d77ea5e2-0199-4930-897d-b08ffd9739eb",
  "email": "bruno@mail.com",
  "username": "bruno",
  "name": "Bruno",
  "last_name": "Campos",
  "bio": null,
  "address": {
    "id": "a5694187-5bd0-4777-9b59-dd9eae198cae",
    "district": "Street Bruno",
    "zipCode": "12345678",
    "number": "00",
    "city": "Bruno City",
    "state": "BR"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita faltando o campo "last_name".

`POST /users - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "error": ["last_name is a required field"]
}
```

Email ou Username já cadastrado:

`POST /users - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": "user already exists"
}
```

<h2 align = "center"> Login </h2>

Nessa aplicação o usuário sem fazer login pode fazer o seu login para acessar a plataforma, na API podemos fazer o login dessa forma:

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "bruno@mail.com",
  "password": "1234"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM5MDQ1NzgsImV4cCI6MTY3Mzk5MDk3OCwic3ViIjoiNGFhMjY2NmQtZTcxMi00MTFlLTliNWEtNWVmNmFhOTYzNTNhIn0.E9bZ-U7emEPdrnnXPXeHZD-U3-v0MDqE56eV0U9cbgw"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita faltando o campo "password".

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "error": ["password is a required field"]
}
```

Email ou Password incorretos:

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "message": "wrong email or password"
}
```

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir informar as tecnologias que ele aprendeu até agora.

Podemos utilizar os query params para listar os usuario da seguinte maneira: "baseUrl/user?limit=10&page=1&lastPage=true&all=false"

"limit" serve determinar a quantidade de usuarios por pagina por padrão ele lista 10 usuarios por pagina

"page" serve determinar a pagina a ser listada

"lastPage" serve listar a ultima pagina, por padrão ela é false

"all" serve listar todos os usuarios em uma unica pagina por padrao ele é false

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "page": 1,
    "usersCount": 4,
    "numberOfPages": 1,
    "users": [
      {
        "id": "d745ee9a-34d1-428c-8827-30994acf6e54",
        "email": "rafael@mail.com",
        "username": "rafael",
        "name": "Rafael",
        "last_name": "santos",
        "bio": null,
        "address": {
          "id": "c64f1bba-c1af-4e10-9913-ad1a7b5c246c",
          "district": "Rua Jerusalém",
          "zipCode": "62280000",
          "number": "72",
          "city": "Santa Quitéria",
          "state": "CE"
        },
        "followersCount": 0,
        "followingCount": 0,
        "postsCount": 0
      },
      {
        "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
        "email": "miguel@mail.com",
        "username": "miguel",
        "name": "miguel",
        "last_name": "santos",
        "bio": null,
        "address": {
          "id": "4572eda1-7dab-45d6-ba31-74cd4bb0c389",
          "district": "Rua Jerusalém",
          "zipCode": "62280000",
          "number": "72",
          "city": "Santa Quitéria",
          "state": "CE"
        },
        "followersCount": 0,
        "followingCount": 0,
        "postsCount": 0
      },
      {
        "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa",
        "email": "joao@mail.com",
        "username": "joao",
        "name": "joao",
        "last_name": "santos",
        "bio": null,
        "address": {
          "id": "55edf645-25e4-46c8-a89f-b60efd69ebfb",
          "district": "Rua Jerusalém",
          "zipCode": "62280000",
          "number": "72",
          "city": "Santa Quitéria",
          "state": "CE"
        },
        "followersCount": 0,
        "followingCount": 0,
        "postsCount": 0
      },
      {
        "id": "2af7effa-92fd-41bc-9c96-aa581e7353e3",
        "email": "jhonDoe@mail.com",
        "username": "jhondoe",
        "name": "jhon",
        "last_name": "Doe",
        "bio": null,
        "address": {
          "id": "caae450f-7526-4387-b594-ebc59c301bdf",
          "district": "Rua Jerusalém",
          "zipCode": "62280000",
          "number": "72",
          "city": "Santa Quitéria",
          "state": "CE"
        },
        "followersCount": 0,
        "followingCount": 0,
        "postsCount": 0
      }
    ]
  }
]
```

Lembrando que no cabeçalho da resposta, temos as informações sobre a paginação, e o nextUrl para acessar a próxima página.

Cabeçalho da resposta:

> nextUrl: https://kenziehub.herokuapp.com/users?perPage=15&page=2 <br/>
> page: 1 <br/>
> perPage: 15

Podemos acessar um usuário específico utilizando o endpoint:

`GET /users/:user_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "d745ee9a-34d1-428c-8827-30994acf6e54",
  "email": "rafael@mail.com",
  "username": "rafael",
  "name": "Rafael",
  "last_name": "santos",
  "bio": null,
  "address": {
    "id": "c64f1bba-c1af-4e10-9913-ad1a7b5c246c",
    "district": "Rua Jerusalém",
    "zipCode": "62280000",
    "number": "72",
    "city": "Santa Quitéria",
    "state": "CE"
  }
}
```

<h2 align ='center'> Listar usuarios que o usuario dono do id esta seguindo</h2>

<blockquote>Na requisição e nescessario passar id do usuario que voce deseja ver a lista de pessoas que ele segue </blockquote>

<br>

`GET /following/:user_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "page": 1,
  "followersCount": 1,
  "numberOfPages": 1,
  "followers": [
    {
      "id": "b0ea9839-6dea-43eb-ba04-8b67e7d48643",
      "following": {
        "id": "d745ee9a-34d1-428c-8827-30994acf6e54",
        "username": "rafael"
      }
    }
  ]
}
```

<h2 align ='center'> Listar os usuarios que estâo seguindo o usuario dono do id</h2>

<blockquote>Na requisição e nescessario passar id do usuario que voce deseja ver a lista de pessoas que estão o seguindo </blockquote>

`Get /followers/:user_id - FORMATO DA REQUISIÇÃO`

```json

 {
	"page": 1,
	"followersCount": 3,
	"numberOfPages": 1,
	"followers": [
		{
			"id": "91f1a0c5-cced-4ce4-91a5-0e0bf9ffbaa6",
			"followers": {
				"id": "dee36bbf-b761-4634-81b9-b8a263b646df",
				"username": "miguel"
			}
		}
}
```

<h2 align ='center'> Seguir e deixar de seguir usuarios </h2>

<blockquote>Na requisição e nescessario passar id do usuario que voce deseja seguir</blockquote>

`POST /follow/:user_id - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "message": "successfully following"
}
```

<h2 align='center'> Possiveis erros </h2>

`POST /follow/:user_id - FORMATO DA RESPOSTA - STATUS 404`

caso o usuario dono da requisição ja esteja seguindo o usuario dono do id a api retornara a seguinte resposta:

```json
{
  "message": "You already follow this user"
}
```

`DELETE /follow - FORMATO DA REQUISIÇÃO`

<blockquote>Na requisição e nescessario passar id do usuario que voce deseja  deixar de seguir</blockquote>
<hr>
<h2 align ='center'> Criar postagens </h2>

Podemos criar postagens da seguinte forma:

`POST /post - FORMATO DA REQUISIÇÃO`

É nescessario passar o campo "img" ou o campo "description" na criacao de uma postagem

```json
{
  "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  "description": "Olá,Mundo!"
}
```

`POST /post - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "e380c482-cf52-4d8e-8c86-b8d626bc4e57",
  "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  "description": "Olá,Mundo!",
  "createdAt": "2023-01-17T16:36:41.712Z",
  "updateAt": "2023-01-17T16:36:41.712Z",
  "user": {
    "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
    "username": "miguel"
  }
}
```

<h2 align='center'>Possiveis erros</h2>
`POST /post - FORMATO DA RESPOSTA - STATUS 400`

caso o usuario tente criar um post com os dois campos "img" e "description" em branco tera o seguinte retorno:

```json
{
  "message": "img or description fild needs to have content"
}
```

Conseguimos atualizar as postagens
utilizando este endpoint:

`PATCH /posts/:post_id - FORMATO DA REQUISIÇÃO`

```json
{
  "description": "update description"
}
```

`PATCH /posts/:post_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "76dbb474-442c-4650-a472-b89e04603ee4",
  "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  "description": "update description",
  "createdAt": "2023-01-17T16:41:39.111Z",
  "updateAt": "2023-01-17T16:42:19.855Z",
  "user": {
    "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
    "username": "miguel"
  }
}
```

<h2 align='center'> Possiveis erros</h2>

O usuario so pode ataulizar postagens que ele mesmo criou caso tente atualizar uma postagem de outro usuario tera o seguinte retorno:

```json
{
  "message": "You don't have permission"
}
```

`GET /posts - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "page": 1,
  "postsCount": 3,
  "numberOfPages": 1,
  "posts": [
    {
      "id": "e380c482-cf52-4d8e-8c86-b8d626bc4e57",
      "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
      "description": "Olá,Mundo!",
      "createdAt": "2023-01-17T16:36:41.712Z",
      "updateAt": "2023-01-17T16:36:41.712Z",
      "user": {
        "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
        "username": "miguel"
      },
      "likesCount": 0,
      "commentsCount": 0
    },
    {
      "id": "bb7be12a-83c8-4f5e-a24e-2de1727c4191",
      "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
      "description": "Olá,Mundo!",
      "createdAt": "2023-01-17T16:37:05.064Z",
      "updateAt": "2023-01-17T16:37:05.064Z",
      "user": {
        "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
        "username": "miguel"
      },
      "likesCount": 0,
      "commentsCount": 0
    },
    {
      "id": "76dbb474-442c-4650-a472-b89e04603ee4",
      "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
      "description": "update description",
      "createdAt": "2023-01-17T16:41:39.111Z",
      "updateAt": "2023-01-17T16:42:19.855Z",
      "user": {
        "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
        "username": "miguel"
      },
      "likesCount": 0,
      "commentsCount": 0
    }
  ]
}
```

Tambem e possivel realizar a busca de um post passndo o id na url

`GET /posts/:post_id - FORMATO DA RESPOSTA STATUS 200`

```json
{
  "id": "bb7be12a-83c8-4f5e-a24e-2de1727c4191",
  "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
  "description": "Olá,Mundo!",
  "createdAt": "2023-01-17T16:37:05.064Z",
  "updateAt": "2023-01-17T16:37:05.064Z",
  "user": {
    "id": "dee36bbf-b761-4634-81b9-b8a263b646df",
    "username": "miguel"
  },
  "likes": [],
  "comments": []
}
```

<h2 align='center'> Possiveis erros</h2>
`GET /posts/:post_id - FORMATO DA RESPOSTA STATUS 404`
caso seja passado um id invaido o usuario tera o seguinte retorno
```json
{
	"message": "post not found"
}
```	
<hr>

Também é possível deletar uma postagem, utilizando este endpoint:

`DELETE /posts/:post_id - FORMATO DA RESPOSTA - STATUS 401`
caso usuario tente deletar uma postagem de outro usuario tera o seguinte retorno:

```json
{
  "message": "user does not have permission to delete this post"
}
```

`DELETE /posts/:post_id - FORMATO DA RESPOSTA - STATUS 204`

<h2>Curtir e deixar de curtir postagens</h2>
o usuario pode curtir e tambem deixar de curtir postagens da seguinte maneira

`POST /like/post/:post_id - FORMATO DA RESPOSTA STATUS 200`

```json
{
  "createdAt": "2023-01-17T18:15:06.090Z",
  "id": "2088e124-194a-46b3-91a9-e9ab3be039ed",
  "post": {
    "id": "bb7be12a-83c8-4f5e-a24e-2de1727c4191",
    "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
    "description": "Olá,Mundo!"
  },
  "user": {
    "bio": "Desenvolvedor back-end",
    "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa",
    "email": "joao@mail.com",
    "username": "joao",
    "name": "joao",
    "last_name": "santos"
  }
}
```

`DELETE /like/post/:post_id - FORMATO DA RESPOSTA STATUS 200`

<h2>Possiveis erros</h2>
`POST /like/post/:post_id - FORMATO DA RESPOSTA STATUS 404`
caso o usuario forneca o id de uma postagem que ele nao curtiu ele recebera o seguinte retorno

```json
{
  "message": "post not liked "
}
```

<h2>Criar comentarios nas posstagens</h2>
o usuario e capaz de criar comentarios nas postagens basta informar o id do post na url

`POST /comments/:post_id - FORMATO DA REQUISICÃO`

```json
{
  "text": "🚀"
}
```

`POST /comments/:post_id - FORMATO DA RESPOSTA STATUS 200`

```json
{
  "id": "1027277d-5b6d-4deb-8f8e-d39dab7fdb75",
  "text": "🚀",
  "createdAt": "2023-01-17T18:56:55.030Z",
  "updatedAt": "2023-01-17T18:56:55.030Z",
  "user": {
    "username": "joao",
    "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa"
  },
  "post": {
    "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
    "description": "Olá,Mundo!",
    "id": "e380c482-cf52-4d8e-8c86-b8d626bc4e57"
  }
}
```

<h2>Possiveis erros</h2>

caso seja passado um PostId o usuario tera a seguinte reposta
`POST /comments/:post_id - FORMATO DA RESPOSTA STATUS 404`

```json
{
  "message": "Not found!"
}
```

<strong>Editar comentarios nas postagens</strong>

`PATCH comments/:coment_id FORMATO DA REQUISICÂO STATUS 200`

```json
{
  "text": "update coment"
}
```

`PATCH comments/:coment_id FORMATO DA RESPOSTA STATUS 200`

```json
{
  "id": "16230f79-7471-4f98-8c78-ac6e23eb014f",
  "text": "update coment",
  "createdAt": "2023-01-17T19:05:02.037Z",
  "updatedAt": "2023-01-17T19:23:06.528Z",
  "user": {
    "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa",
    "username": "joao"
  },
  "post": {
    "img": "https://img.freepik.com/fotos-gratis/praia-tropical_74190-188.jpg?w=900&t=st=1673629540~exp=1673630140~hmac=819788b872002748d8b66b63ff8250376c321454fb496254632bf8d0b7ac3855",
    "description": "Olá,Mundo!",
    "id": "e380c482-cf52-4d8e-8c86-b8d626bc4e57"
  }
}
```

<strong>Deletar comentarios nas postagens</strong>
é nessecario passar o id do comentario na url da requisição

`DELETE /commnets/:coment_id FORMATO DA RESPOSTA STATUS 200`

<h2>Possiveis erros</h2>

`DELETE /commnets/:coment_id FORMATO DA RESPOSTA STATUS 404`

caso seja passado um id de um comentario invalido teremos a seguinte resposta:

```json
{
  "message": "comment not found"
}
```

<h2>Curtir e deixar de curtir comentarios em posts</h2>
È nescessario passar o id do comentario na url

`POST like/comment/:commnet_id - FORMATO DA RESPOSTA STATUS 200`

```json
{
  "user": {
    "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa",
    "name": "joao",
    "last_name": "santos",
    "password": "$2a$10$yUhq8IGXFJU0.DDal2gPouee337jKldpyoABflDXBVJqZTYNUvl2m",
    "email": "joao@mail.com",
    "username": "joao",
    "bio": "Desenvolvedor back-end",
    "isAdm": false,
    "mainInterest": null,
    "recentInterest": null,
    "createdAt": "2023-01-17T14:42:07.033Z",
    "updatedAt": "2023-01-17T17:21:30.387Z",
    "deletedAt": null
  },
  "comment": {
    "id": "16230f79-7471-4f98-8c78-ac6e23eb014f",
    "text": "🚀",
    "createdAt": "2023-01-17T19:05:02.037Z",
    "updatedAt": "2023-01-17T19:05:02.037Z"
  },
  "id": "858f359a-bd4c-40bc-b01b-fb8a1a576af0",
  "createdAt": "2023-01-17T19:05:17.639Z"
}
```

<blockquote >Para deixar de curtir um comentario devemosinformar o id do like na url da requição
</blockquote>

`DELETE /like/comment/:like_id - FORMATO DA RESPOSTA STATUS 404`

caso seja passado um like_id invalido o usuario tera o seguinte retorno:

```json
{
  "message": "like not found"
}
```

<h2 align ='center'> Atualizando os dados do usuario </h2>

`PATCH /user - FORMATO DA REQUISIÇÃO`

```json
{
  "bio": "Desenvolvedor back-end"
}
```

È possivel atualizar qualquer dado do usuario com exeção do campo "isAdm"

`PATCH /user - FORMATO DA RESPOSTA - 200`

```json
{
  "id": "b571bcb4-a946-44f1-85dc-6fd3d08c56fa",
  "email": "joao@mail.com",
  "username": "joao",
  "name": "joao",
  "last_name": "santos",
  "bio": "Desenvolvedor back-end",
  "address": {
    "id": "55edf645-25e4-46c8-a89f-b60efd69ebfb"
  }
}
```

`DELETE /user/:user_id - FORMATO  DA REQUISICÃO`

<blockquote>È nescessario passar o id do usuario na url</blockquote>
`DELETE /user/:user_id - FORMATO DA RESPOSTA - STATUS 200`

<h2 align='center'>Possiveis erros</h2>
somente usuarios que sejam  Adm podem realizar o delete de outros usuarios da plataforma.
caso o usuario que não seja Adm tente deletar outro usuario tera o seguinte retorno:

`DELETE /user/:user_id - FORMATO DA RESPOSTA - STATUS 403`

```json
{
  "message": "only admins"
}
```

---
