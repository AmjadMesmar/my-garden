'use strict';
 const flowerArray = ['alstroemerias','gardenias','orchids','peonies','roses','sunflowers','tulips'];

 let orderdFlowerArray = [];

 const flowerForm = document.getElementById('flowerForm');
 const flowerTable = document.getElementById('flowerTable');


 function Flower (type,name,season){
    this.type = type;
     this.name = name;
     this.season = season;
     orderdFlowerArray.push(this);
 }

 Flower.prototype.flowerTableRender = function(){
     renderTable();
 }


 function getData(){
    let checked = localStorage.getItem('Flowers');
    if(checked){
    orderdFlowerArray = JSON.parse(checked);
    renderTable();
    }
 }

 function deleteRow(i){
    orderdFlowerArray.splice(i,1);
    localStorage.setItem('Flowers',JSON.stringify(orderdFlowerArray));
    renderTable();

 }

 function renderFlowerSelect (){
     const flowerSelect = document.getElementById('flowerSelect');

     for(let i in flowerArray){
    const optionEl = document.createElement('option');
    flowerSelect.appendChild(optionEl);
    optionEl.textContent = `${flowerArray[i]}`;
     }
 }

 function renderTableHeader(){
     const theadEl = document.createElement('thead');
     flowerTable.appendChild(theadEl);

     const trEL = document.createElement('tr');
     theadEl.appendChild(trEL);
     trEL.innerHTML ='<th>#</th> <th>Image</th> <th>Name</th> <th>Season</th> '
 }

 function renderTableBody(){

    for(let i in orderdFlowerArray){

    const trEL = document.createElement('tr');
    flowerTable.appendChild(trEL);

    const tdEl1 = document.createElement('td');
    trEL.appendChild(tdEl1);

    const aEL = document.createElement('a');
    tdEl1.appendChild(aEL);

    aEL.textContent = 'X';
    aEL.setAttribute('href','#');
    aEL.setAttribute('onClick',`deleteRow(${i})`);

    const tdEl2 = document.createElement('td');
    trEL.appendChild(tdEl2);

    const imgEL = document.createElement('img');
    tdEl2.appendChild(imgEL);
    imgEL.src=`./img/${orderdFlowerArray[i].type}.jpeg`;


    const tdEl3 = document.createElement('td');
    trEL.appendChild(tdEl3);
    tdEl3.textContent = `${orderdFlowerArray[i].name}`;

    const tdEl4 = document.createElement('td');
    trEL.appendChild(tdEl4);
    tdEl4.textContent = `${orderdFlowerArray[i].season}`;

    }
 }

 function renderTable (){
flowerTable.innerHTML= '';
renderTableHeader();
renderTableBody();
 }

 function clearLS (){
 localStorage.clear();
 flowerTable.innerHTML= '';
 }

 function handleSubmit(e){

    e.preventDefault();
    const nameVar = e.target.name.value;
    const selectVar = e.target.flowerSelect.value;
    const seasonVar = e.target.season.value;

    const newFlower = new Flower (selectVar,nameVar,seasonVar);

    localStorage.setItem('Flowers',JSON.stringify(orderdFlowerArray));

    flowerForm.reset();
    newFlower.flowerTableRender();
    // renderTable();

 }

flowerForm.addEventListener('submit',handleSubmit);
 renderFlowerSelect();
 getData();
