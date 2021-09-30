let allPeople = [];
let filteredPeople = [];
let pesquisa =1;
let countFiltered = 0;
let filter = document.getElementById("filter");
let numberFormat = null;

window.addEventListener("load", () => {
  tabFilteredPeople = document.getElementById("tabFilteredPeople");
  countFilteredPeople = document.getElementById("#countFilteredPeople");
  numberFormat = Intl.NumberFormat("pt-BR");

  fetchFilter();
});


async function fetchFilter() {
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
function render() {
  renderFilteredPeoples();
  function renderFilteredPeoples() {
    doFilter();
    if (pesquisa!=1){
      let filteredPeopleHTML = 
      `<div class = "list">
        <h5><span id = "countFilteredPeople"></span> usuário(s)</h5>
        <h5>encontrados ${filteredPeople.length}</h5>
      `
      filteredPeople.forEach(pessoa => {
        const { sexo, primNome, secNome, login } = pessoa;

        const peopleHTML = `
          <div class = "text" id = "people"><ul><li>${primNome} ${secNome}</li></ul></div>
        `
        filteredPeopleHTML += peopleHTML;
      });
      tabFilteredPeople.innerHTML = filteredPeopleHTML;
    }else {
      tabFilteredPeople.innerHTML = "";
    }
  }
}
function doFilter() { 
  pesquisa =filter.value;
  if (filter.value==""){pesquisa = 1}
    filteredPeople = allPeople.filter(item => `${item.primNome} ${item.secNome}`.includes(pesquisa));
    filteredPeople.sort((a,b)=>{
      return a.primNome.localeCompare(b.primNome);
    });
    //    console.log(filteredPeople);
  
  // const filteredPeople = allPeople.filter(person => 
  //   { 
  //     return allPeople.name.first.contains("a"); 
  //   });
  //   console.log(filteredPeople)
}
// let urlText = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
// let teste = fetch(urlText);
// let rodar;
// rodar=teste
// .then((response) => response.json())
// .then(function(data){
//   console.log(data);
// });

// console.log(rodar);
//.then((response)        é a função que trata a promessa de retorno.
//=> response.json()      converte meu retorno (o prometido) para um arquivo .json
//then(function(data){    quando há um dado json ele retorna uma funcao anonima com data contido