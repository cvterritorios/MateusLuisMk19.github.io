const form = {
  nome: "",
  valorKz: 0,
  valorDl: 0,
  bankEnt: "",
  bankSai: "",
};
var variavel;

function escolha() {
  let another;
  let cambio = 590;
  let str = "";
  let valor = "";

  if (document.getElementById("valorKz").value != (null || "")) {
    another = document.getElementById("valorDl");
    valor = parseInt(document.getElementById("valorKz").value) / cambio;
    str = valor.toString();
    console.log(str);
    for (let i = 0; i < str.length; i++) {
      console.log(str[i]);

      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }

    // another.setAttribute("disabled", "");
  } else if (document.getElementById("valorDl").value != (null || "")) {
    another = document.getElementById("valorKz");
    valor = parseInt(document.getElementById("valorDl").value) * cambio;
    str = valor.toString();

    for (let i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }
    // another.setAttribute("disabled", "");
  } else {
  }
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("valorKz").value = "";
  document.getElementById("valorDl").value = "";
  document.getElementById("bankEnt").value = "";
  document.getElementById("bankSai").value = "";
}

function atualizar() {
  var iavel = StorageM("", "getData");
  for (let i = 0; i < iavel.length; i++) {
    createLines(iavel[i]);
  }
}

function createLines(names) {
  let Pai = document.getElementById("lines");
  variavel = StorageM(names, "get");
  console.log(variavel);

  let div = document.createElement("div");
  div.setAttribute("class", "row col-12 m-auto");
  div.setAttribute("id", "data-line");

  let div2 = document.createElement("div");
  div2.setAttribute("class", "col row inp");

  let pre = [];
  for (let i = 0; i < 5; i++) {
    pre[i] = document.createElement("pre");
    pre[i].setAttribute("class", "col inp");
  }
  pre[0].innerHTML = variavel[0];
  pre[1].innerHTML = variavel[1];
  pre[2].innerHTML = variavel[2];
  pre[3].innerHTML = variavel[3];
  pre[4].innerHTML = variavel[4];

  div.appendChild(pre[0]);
  div.appendChild(pre[1]);
  div.appendChild(pre[2]);

  div2.appendChild(pre[3]);
  div2.appendChild(pre[4]);

  div.appendChild(div2);

  Pai.appendChild(div);
}

function StorageM(pão, option) {
  let each = "";
  let iAll = 0;

  switch (option) {
    case "set":
      window.sessionStorage.setItem(pão.nome.replace(" ", ""), [
        pão.nome,
        pão.valorKz,
        pão.valorDl,
        pão.bankEnt,
        pão.bankSai,
      ]);
      let dataN = window.sessionStorage.getItem("data");
      if (dataN) {
        dataN += "," + pão.nome.replace(" ", "");
        window.sessionStorage.setItem("data", [dataN]);
      } else {
        window.sessionStorage.setItem("data", [pão.nome.replace(" ", "")]);
      }
      break;
    case "remove":
      window.sessionStorage.removeItem(pão);
      break;
    case "clear":
      window.sessionStorage.clear();
      window.location.reload();

      break;
    case "get":
      let db = window.sessionStorage.getItem(pão);
      each = "";
      let allDb = ["", "", "", "", ""];
      iAll = 0;

      for (let i = 0; i <= db.length; i++) {
        if (db[i] == "," || i == db.length) {
          allDb[iAll] = each;
          each = "";
          iAll++;
        } else {
          each += db[i];
        }
      }
      return allDb;
    case "getData":
      let dbD = window.sessionStorage.getItem("data");
      each = "";
      let allDbD = [];
      iAll = 0;

      for (let i = 0; i <= dbD.length; i++) {
        if (dbD[i] == "," || i == dbD.length) {
          allDbD[iAll] = each;
          each = "";
          iAll++;
        } else {
          each += dbD[i];
        }
      }
      return allDbD;

    default:
      break;
  }
}

function terminarDia() {
  var iavel = StorageM("", "getData");
  var totalKz = 0;
  var totalDl = 0;

  var cambilAtual = parseInt(prompt("Qual é o cambio atual?"));

  for (let i = 0; i < iavel.length; i++) {
    let newD = StorageM(iavel[i], "get");
    totalKz += parseInt(newD[1]);
    totalDl += parseInt(newD[2]);
  }

  //Total de Kz - (Total de Dollar * cambio Atual)
  let lucro = totalKz - totalDl * cambilAtual;
  alert("Terminou o dia com um Lucro de: " + lucro + "Kz");
}

function remover() {
  var client = prompt("Quem deseja remover?").replace(" ", "");
  //   StorageM(client, "remove");
  let dataN = window.sessionStorage.getItem("data");
  dataN = dataN.replace(`,${client}`, "");
  window.sessionStorage.setItem("data", [dataN]);
  window.location.reload();
}

document.getElementById("newLine").addEventListener("click", () => {
  form.nome = document.getElementById("nome").value;
  form.valorKz = parseInt(document.getElementById("valorKz").value);
  form.valorDl = parseInt(document.getElementById("valorDl").value);
  form.bankEnt = document.getElementById("bankEnt").value;
  form.bankSai = document.getElementById("bankSai").value;

  if (!form.nome.includes(" ")) {
    alert("Por favor preencha o campo nome com Nome e Sobrenome");
  } else if (!form.valorDl && !form.valorKz) {
    alert("Por favor preencha um dos valores monetarios");
  } else {
    StorageM(form, "set");
    // atualizar();
    window.location.reload();
    limpar();
  }
  // StorageM("", "clear");
});

atualizar();
