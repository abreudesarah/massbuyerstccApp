const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const inome = document.querySelector(".nome");
const iemail = document.querySelector(".email");
const inascimento = document.querySelector(".nascimento");
const isenha = document.querySelector(".senha");
const itelefone = document.querySelector(".telefone");


function cadastrar(){
  fetch("http://localhost8080/clientes",
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application-json"
    },
    method: "POST",
    body: JSON.stringify({
      nome: inome.value,
      email: iemail.value,
      nascimento: inascimento.value,
      senha: isenha.value,
      telefone: itelefone.value
    })
  })

  .then(function (res) { console.log(res) })
  .catch(function (res) { console.log(res) })
}
