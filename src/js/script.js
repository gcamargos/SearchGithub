//funcao [para facilitar o instanciamento de elementos
function instancie(element) {
  return document.querySelector(element)
}

var input = instancie('#user')
var button = instancie('.search-btn')
var nome = instancie('.name')
let name_error = instancie('.name-error')
let name_user = instancie('.name-user')
let img_user = instancie('.image-user')
var dados,user;




//funcao que pegara a api e o dado passado para pesquisa
function PegarApi(url, nome) { //url da api e o dado que ira pesquisar
  fetch(url + nome).then(response => { //pega a resposta obtida e retorna em formato json
    if(nome == ''){
      window.alert('preencha a caixa ')

    }/*
    if(!response.ok){ //se a response nao estiver ok, seja devido um erro 404 por exemplo execute a linah de baixo

    console.log('erro no bagui')
    window.alert('preencha a caixa ')
      
    }*/

    return response.json()

  }).then(data => { //pega os dados em json e coloca na variavel dados
    dados = data;
  }).catch(function(error){
    console.log(error) // o catch sera usado para erros de conexao com o servidor ou seja, quando a api estiver com a url errada pro exemplo
  })

}


function iniciarApp(user) { //pega a api e o nome do usuario que quer pesquisar passado por parametro
  PegarApi('https://api.github.com/users/',user)
  setTimeout(function () { //depois de 2 segundos ele executa a funcao para msotrar na tela para dar tempo de mostrar
    imprime();
  }, 1000);
}



function imprime() { //funcao que imprimi os dados na tela
  nome.innerHTML = ''

  if(dados.name == undefined){
    name_error.style.display= 'block'

  }else{
    name_error.style.display = 'none'
    nome.innerHTML = dados.name
    img_user.src = dados.avatar_url
    console.log(dados.name)
  }
}


function search(){ //funcao de click do mouse, ira pegar o valor do input e ira levar como parametro
  // para a funcao iniciarApp
user = input.value
iniciarApp(user)
}
