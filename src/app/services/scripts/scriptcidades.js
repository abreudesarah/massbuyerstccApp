const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const inomecidade = document.querySelector(".nomcidade");
const iestado = document.querySelector(".estado");


function cadastrar(){
  fetch("http://localhost8080/cidades",
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application-json"
    },
    method: "POST",
    body: JSON.stringify({
      nomecidade: inomecidade.value,
      estado: iestado.value
    })
  })

  .then(function (res) { console.log(res) })
  .catch(function (res) { console.log(res) })
}
