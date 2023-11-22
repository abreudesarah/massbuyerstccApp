const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const inome = document.querySelector(".nome");


function cadastrar(){
  fetch("http://localhost8080/tipos",
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application-json"
    },
    method: "POST",
    body: JSON.stringify({
      nome: inome.value
    })
  })

  .then(function (res) { console.log(res) })
  .catch(function (res) { console.log(res) })
}
