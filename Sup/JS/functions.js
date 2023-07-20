function Reload() {
  window.location.reload();
}

function navigate(url) {
  window.location.href = url;
}

function configBut() {
  const divPai = document.querySelector("#configBut");

  divPai.innerHTML = `<i class="text-secondary">@${User.username}  </i> <a class="btn-link" onclick="logOut()">Sair</a>`;
}

// Função para colar o conteúdo da área de transferência na caixa de texto
function colarTexto(element) {
  console.log(element.id);

  navigator.clipboard
    .readText()
    .then((text) => {
      if (element.id == "im-ticket") {
        if (text.startsWith("IM")) {
          element.value = text;
        } else {
          alertar('O "IM" está incorreto!',"danger")
          return;
        }
      }
      element.value = text;
    })
    .catch((err) => {
      console.error(
        "Não foi possível ler o texto da área de transferência: ",
        err
      );
    });
}

//Recebendo os codigos de erro, traduzindo para portugues
//E criando alertas
//    code    string    //codigo de erro
//    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
function validaAuth(code) {
  switch (code) {
    case "auth/wrong-password":
      alertar("Palavra-passe errada!", "danger");
      console.log("Palavra-passe errada!");
      break;
    case "auth/invalid-email":
      alertar("Endereço de e-mail não válido!", "danger");
      console.log("Endereço de e-mail não válido!");
      break;
    case "auth/user-disabled":
      alertar("Este utilizador foi desabilitado.", "danger");
      console.log("Este utilizador foi desabilitado.");
      break;
    case "auth/user-not-found":
      alertar("Utilizador não encontrado.", "danger");
      console.log("Utilizador não encontrado.");
      break;
    case "auth/too-many-requests":
      alertar(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
        "danger"
      );
      console.log(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
      );
      break;
    case "auth/email-already-in-use":
      alertar("Já existe uma conta neste email.", "warning");
      console.log("Já existe uma conta neste email.");
      break;
    case "auth/weak-password":
      alertar(
        "Sua palavra passe é muito fraca, tente outra por favor.",
        "warning"
      );
      console.log("Sua palavra passe é muito fraca, tente outra por favor.");
      break;
    case "auth/operation-not-allowed":
      alertar("A conta neste email foi desativada.", "warning");
      console.log("A conta neste email foi desativada.");
      break;
    default:
      break;
  }
}

function alertar(message, type) {
  let Pai = document.querySelector(`#alerta`);

  console.log(Pai);
  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", `alert alert-${type} mt-3 alert-dismissible`);
  wrapper.setAttribute("role", "alert");

  let mensagem = document.createElement("div");
  mensagem.innerHTML = `${message}`;

  wrapper.appendChild(mensagem);

  let btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn-close visually-hidden");
  btn.setAttribute("data-bs-dismiss", "alert");
  btn.setAttribute("aria-label", "Close");

  wrapper.appendChild(btn);
  Pai.appendChild(wrapper);

  setTimeout(() => {
    btn.click();
  }, [5000]);
}

// Firebase
// Firebase initialization
function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAypSg2Pz0Dcuf7pnyADEP9nYX7jp0o3wE",
    authDomain: "supervision-7cb0d.firebaseapp.com",
    projectId: "supervision-7cb0d",
    storageBucket: "supervision-7cb0d.appspot.com",
    messagingSenderId: "768957089004",
    appId: "1:768957089004:web:0a3b1b66c4092f68d7d1c9",
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// firebase.storage()

// ----------------------------- Firebase auth

function logOut() {
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.location.href.includes("index.html")) navigate("login.html");
        else navigate("login.html");
      });
  }
}

function login() {
  //Pegar valores do formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);
  //validar se nenhum dos campos está nulo
  if (email && password) {
    //Faz a requisição de login, passando o email e password como parametros
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //Caso a requisição seja bem sucedida

        // firebase.firestore().collection('users').where('uid','==',)
        alertar("Login efetuado com sucesso!", "success");

        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        // setTimeout(() => {
        //   navigate("../home.html");
        // }, [1000]);
      })
      .catch((error) => {
        //Caso a requisição dê erro

        //Reseta campo do formulario
        document.getElementById("password").value = "";

        //Chamada da função validaAuth
        validaAuth(error.code);
      });
  } else {
    //se email nulo mostra o allerta
    email ? "" : alertar("O campo email é obrigatório", "warning");
    //se password nula mostra o allerta
    password ? "" : alertar("O campo palavra passe é obrigatório", "warning");
  }
}
