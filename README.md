<h1 align = "center" >
   <img src = "./src/assets/images/logo.svg" alt = "Logo LetmeAsk" />
</h1>

- [SOBRE](#-sobre)
- [TECNOLOGIAS UTILIZADAS](#-TECNOLOGIAS-UTILIZADAS)
- [COMO BAIXAR O PROJETO](#-COMO-BAIXAR-O-PROJETO)
- [REALTIME DATABASE FIREBASE](#-REALTIME-DATABASE-FIREBASE)
- [ARQUIVO env.local](#-ARQUIVO-env.local)

<h2 align = "center" >
   <a href = "https://letmeask-e0311.web.app/"> Clique aqui para acessar o projeto em produção</a>
</h2>
 
<h1 align = "center" >
   <img = src = "" alt = "Gif do desenvolvimento" />   
</h1>


## ℹ️ SOBRE

O projeto **Letmeask** é um site desenvolvido junto com a **[Rocketseat](https://rocketseat.com.br/) na edição da NLW Together**!
O objetivo do desenvolvimento é disponibilizar aos geradores de conteúdos, a criação de salas para perguntas para para usuários poderem fazer perguntas e o criador da sala poder responder em suas lives. As perguntas tem opção de 'likes', caso outros usuários tenha interesse na pergunta, deixando o gerador de conteúdo saber qual pergunta seus ouvintes estão mais interessados em saber uma resposta.
- [Prototipo realizado pela Rocketseat](https://www.figma.com/file/NnyaLK9X0J08pJFpmNB9m9/Letmeask-(Copy)?node-id=45%3A1771)

## 💻 TECNOLOGIAS UTILIZADAS

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [ReactJS](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/docs)

## 🏆 LEVANDO PARA O PRÓXIMO NÍVEL
   Metas para levar o projeto ao próximo nível :
   - [ ] RESPONSIVIDADE
   - [x] LOGOUT DO GOOGLE
   - [ ] DASHBOARD DO USUÁRIO
   - [ ] TEMAS NAS SALAS
   - [ ] LOGO DO EVENTO DA SALAS
   

## 📁 COMO BAIXAR O PROJETO
```bash
   # Crie uma pasta para o projeto
   $ mkdir nome_da_sua_pasta
   
   # Entre na pasta criada
   $ cd nome_da_sua_pasta
   
   # Clone o repositório
   $ git clone https://github.com/DevDosSantosLucas/letmeask.git
   
   # Abra a pasta
   $ cd letmeask
   
   # Instale as dependências
   $ yarn install
   
   # iniciar o projeto
   $ yarn start
````
   O projeto será aberto em seu navegador padrão em :
   https://localhosts:3000


## 🗃 REALTIME DATABASE FIREBASE
   
   crie um projeto de Authenticação no [Firebase](https://console.firebase.google.com/) 

Em https://console.firebase.google.com/ na aba de **regras** do **Realtime Database** insira o código abaixo:
```js
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"
          }
        }
      }
    }
  }
}
```
## ARQUIVO env.local
   
   Documentação [React Firebase](https://react-firebase-js.com/docs/react-firebase-auth/getting-started#get-your-firebase-config)<br>
   
      📁 **src/services/firebase.ts** nesse arquivo fica as configuraçoẽs do Firebase 
   ```js
   const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:process.env.REACT_APP_DATABASE_URL,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
  };
   ```
   
   Crie uma pasta env.local em seu projeto com o código abaixo  coloque seus dados  entre as "aspas"
   📁 env.local
   ```env
   REACT_APP_API_KEY=""
   REACT_APP_AUTH_DOMAIN=""
   REACT_APP_DATABASE_URL=""
   REACT_APP_PROJECT_ID=""
   REACT_APP_STORAGE_BUCKET=""
   REACT_APP_MESSAGING_SENDER_ID=""
   REACT_APP_APP_ID=""
   ```

   
   ---
   👨🏻‍💻 Desenvolvido por Lucas Ribeiro dos Santos

