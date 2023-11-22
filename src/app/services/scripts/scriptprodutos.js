const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const inome = document.querySelector(".nome");
const iprecovenda = document.querySelector(".precovenda");
const iprecorevenda = document.querySelector(".precorevenda");
const iquantidade = document.querySelector(".quantidade");


function cadastrar(){
  fetch("http://localhost8080/produtos",
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application-json"
    },
    method: "POST",
    body: JSON.stringify({
      nome: inome.value,
      precovenda: iprecovenda.value,
      precorevenda: iprecorevenda.value,
      quantidade: iquantidade.value
    })
  })

  .then(function (res) { console.log(res) })
  .catch(function (res) { console.log(res) })
}
