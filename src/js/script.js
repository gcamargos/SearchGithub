//funcao [para facilitar o instanciamento de elementos
function instancie(element) {
  return document.querySelector(element)
}

let clear = document.querySelectorAll('.clear')
var input = instancie('#user')
var button = instancie('.search-btn')
var nome = instancie('.name')
let name_error = instancie('.name-error')
let name_user = instancie('.name-user')
let img_user = instancie('.image-user')
var dados, repos, user;
let profile = instancie('.profile')
let followers = instancie('.followers')
let following = instancie('.following')
let repos_num = instancie('.repos_num')
let list = instancie('.list')
const ApiProfile = 'https://api.github.com/users/';



//funcao que pegara a api e o dado passado para pesquisa
function PegarApiProfile(url, nome) { //url da api e o dado que ira pesquisar
  fetch(url + nome).then(response => { //pega a resposta obtida e retorna em formato json
    if (nome == '') {
      window.alert('preencha a caixa ')

    }
    /*
        if(!response.ok){ //se a response nao estiver ok, seja devido um erro 404 por exemplo execute a linah de baixo

        console.log('erro no bagui')
        window.alert('preencha a caixa ')
          
        }*/

    return response.json()

  }).then(data => { //pega os dados em json e coloca na variavel dados
    dados = data;
  }).catch(function (error) {
    console.log(error) // o catch sera usado para erros de conexao com o servidor ou seja, quando a api estiver com a url errada pro exemplo
  })

}

//funcao que pegara a api e o dado passado para pesquisa de repositorios
function PegarApiRepos(url, nome) { //url da api e o dado que ira pesquisar
  fetch(url + nome).then(response => { //pega a resposta obtida e retorna em formato json
    if (nome == '') {
      window.alert('preencha a caixa ')

    }

    return response.json()

  }).then(data2 => { //pega os dados em json e coloca na variavel repos
    repos = data2;
  }).catch(function (error) {
    console.log(error) // o catch sera usado para erros de conexao com o servidor ou seja, quando a api estiver com a url errada pro exemplo
  })

}


function iniciarApp(user) { //pega a api e o nome do usuario que quer pesquisar passado por parametro
  PegarApiProfile(ApiProfile, user)
  PegarApiRepos(`https://api.github.com/users/${user}/repos`, ' ') /*pegar a api de repositorio */
  setTimeout(function () { //depois de 2 segundos ele executa a funcao para msotrar na tela para dar tempo de mostrar
    imprime();

  }, 1000);

}


function Repo_acess() {
  let num = dados.public_repos;


  for (let i = 0; i < num; i++) {

    var li = document.createElement("LI")
    let A = document.createElement("A")
    let att = document.createAttribute("href")
    let text = document.createTextNode(repos[i].name)
    att.value = repos[i].svn_url
    A.setAttributeNode(att)
    A.setAttribute('target','_blank')
    li.appendChild(text)
    li.appendChild(A)
    li.setAttribute("class","clr")
    A.appendChild(text)
    list.appendChild(li)


  }
  console.log(repos.svn_url)


}




function imprime() { //funcao que imprimi os dados na tela

  clear.innerHTML = ''
  //enquanto a lista tiver filhos apague-os, esse codigo serve para apagar os intens,
  //da lsita toda vez que for fazer outra requsiicao
  while(list.hasChildNodes()){
    list.removeChild(list.firstChild)
  }


  if (dados.name == undefined) {
    name_error.style.display = 'block'

  } else {
    name_error.style.display = 'none'
    nome.innerHTML = dados.name
    img_user.src = dados.avatar_url
    profile.innerHTML = 'Clique para ir !'
    profile.style.color = 'blue'
    profile.href = dados.html_url
    followers.innerHTML = dados.followers
    following.innerHTML = dados.following
    repos_num.innerHTML = dados.public_repos

    setTimeout(function(){
      Repo_acess()

    },1000)

  }

}


function search() { //funcao de click do mouse, ira pegar o valor do input e ira levar como parametro
  // para a funcao iniciarApp
  user = input.value
  iniciarApp(user)

}