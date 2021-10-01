let allPeople = [];
let filteredPeople = [];
let pesquisa =1;
let countFiltered = 0;
let numberFormat = null;
let qntdhomi,qntdmuie,somaidade, mediaIdade;
window.addEventListener("load", () => {
  filter = document.getElementById("filter");
  tabFilteredPeople = document.getElementById("tabFilteredPeople");
  countFilteredPeople = document.getElementById("#countFilteredPeople");
  numberFormat = Intl.NumberFormat("pt-BR");
  filter.focus();
  fetchFilter();
});



async function fetchFilter() 
{
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  allPeople = json.results.map(pessoa => {
    const { gender, name, dob, login } = pessoa;
    return {
      sexo: gender,
      primNome: name.first,
      secNome: name.last,
      idade: dob.age,
      id: login.uuid,
    }
  });
  render();
}



// Essa de baixo funciona, mas é necessário importar o ajax no HTML com o seguinte:
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 
// function fetchFilter() 
// {
//   $.ajax({
//     url: 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo',
//     dataType: 'json',
//     success: function(data) {
//       allPeople=data.results;
//       console.log(allPeople)
//     }
//   });
// }

//Essa abaixo é a mais clean de todas. Não precisa de importar nada.
//reference: https://stackoverflow.com/questions/67955033/async-await-with-fetch-js
// function fetchFilter() 
// {
//   fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
//   .then((response) => response.json())
//   .then((data)=>{
//     allPeople=data.results;
//     console.log(allPeople);
//   });
//   render();
// }



function render() {
  renderFilteredPeoples();
  function renderFilteredPeoples() {
    doFilter();
    if (pesquisa!=1){
      let filteredPeopleHTML = 
      `<div class = "list">
        <h5><span id = "countFilteredPeople"></span> Usuário(s)</h5>
        <h5>encontrados: ${filteredPeople.length}</h5>
      `
      filteredPeople.forEach(pessoa => {
        const { sexo, primNome, secNome, login, idade } = pessoa;

        const peopleHTML = `
          <div class = "text" id = "people"><ul><li>${primNome} ${secNome}, ${idade} anos</li></ul></div>
        `
        filteredPeopleHTML += peopleHTML;
        if(sexo=="male"){
          qntdhomi++;
        }else{
          qntdmuie++;
        }
        somaidade+=idade;
       
      });        
      mediaIdade=somaidade/filteredPeople.length;
      filteredPeopleHTML+=`</div>
      <div class = "list">
        <h5><span id = "stats"></span> Estatísticas:</h5>
        <div class = "text" id = "quantidade"><ul><li>${filteredPeople.length} pessoas</li></ul></div>
        <div class = "text" id = "qntdhomi"><ul><li>${qntdhomi} macho</li></ul></div>
        <div class = "text" id = "qntdmuie"><ul><li>${qntdmuie} fema</li></ul></div>
        <div class = "text" id = "veisse"><ul><li>${somaidade} veísse</li></ul></div>
        <div class = "text" id = "veisse"><ul><li>${mediaIdade} medisse</li></ul></div>
      </div>
      `
      tabFilteredPeople.innerHTML = filteredPeopleHTML;
        
    }else {
      tabFilteredPeople.innerHTML = "";
    }
  }
}

function doFilter() { 
  somaidade=0;
  mediaIdade=0;
  qntdhomi=0;
  qntdmuie=0;
  pesquisa =filter.value.toUpperCase();
  if (filter.value==""){pesquisa = 1}
    filteredPeople = allPeople.filter(item => `${item.primNome} ${item.secNome}`.toUpperCase().includes(pesquisa));
    filteredPeople.sort((a,b)=>{
      return a.primNome.localeCompare(b.primNome);
    });
  
  // const filteredPeople = allPeople.filter(person => 
  //   { 
  //     return allPeople.name.first.contains("a"); 
  //   });
}


// console.log(rodar);
//.then((response)        é a função que trata a promessa de retorno.
//=> response.json()      converte meu retorno (o prometido) para um arquivo .json
//then(function(data){    quando há um dado json ele retorna uma funcao anonima com data contido