const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const idatavenda = document.querySelector(".datavenda");
const iproduto = document.querySelector(".produto");
const ifornecedor = document.querySelector(".fornecedor");
const icliente = document.querySelector(".cliente");


function cadastrar(){
  fetch("http://localhost8080/vendas",
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application-json"
    },
    method: "POST",
    body: JSON.stringify({
      datavenda: idatavenda.value,
      produto: iproduto.value,
      fornecedor: ifornecedor.value,
      cliente: icliente.value
    })
  })

  .then(function (res) { console.log(res) })
  .catch(function (res) { console.log(res) })
}
