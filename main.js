const input=document.getElementById("text-box");
const sortByName_btn=document.getElementById("sortByName");
const sortByPrice_btn=document.getElementById("sortByPrice");
const sortByRank_btn=document.getElementById("sortByRank");
const displayData=document.querySelector(".display-container");
let data;

//Fetching data from API
fetchingData();
function fetchingData(){
    const url="https://api.coinmarketcap.com/v1/ticker/?limit=150";
    fetch(url)
.then(function(response) {
return response.json();
})
.then(function(myJson) {
data=myJson;
display(data);
});
}

//Created Table
var tabl=document.createElement('table');
tabl.id="displayTable";
function display(data){     
    var row_heading = document.createElement('tr');
    var cell_heading_id=document.createElement('th');
    var cell_heading_name=document.createElement('th');
    var cell_heading_price=document.createElement('th');
    var cell_heading_rank=document.createElement('th');
    var cell_heading_symbol=document.createElement('th');
    var cell_heading_percent=document.createElement('th');
     cell_heading_id.textContent="Id";
     cell_heading_name.textContent="Name";
     cell_heading_price.textContent="price";
     cell_heading_rank.textContent="rank";
     cell_heading_symbol.textContent="symbol";
     cell_heading_percent.textContent="changeInPrice";
     row_heading.appendChild(cell_heading_id);
     row_heading.appendChild(cell_heading_name);
     row_heading.appendChild(cell_heading_price);
     row_heading.appendChild(cell_heading_rank);
     row_heading.appendChild(cell_heading_symbol);
    row_heading.appendChild(cell_heading_percent);
    tabl.appendChild(row_heading);
    displayData.appendChild(tabl);
    for(let i=0;i<data.length;i++){
        element(data[i],i+1,"name","price_usd","rank","symbol","percent_change_24h");
        }
}
function element(data,id,name,price_usd,rank,symbol,changeInPrice){
    
    var row = document.createElement("tr");
    var cell_id = document.createElement("td");
    var cell_name = document.createElement("td");
    var cell_price = document.createElement("td");
    var cell_rank = document.createElement("td");
    var cell_symbol = document.createElement("td");
    var cell_changeInPrice=document.createElement("td");
    cell_id.textContent=id;
    cell_name.textContent=data[name];
    cell_price.textContent=data[price_usd];
    cell_rank.textContent=data[rank];
    cell_symbol.textContent=data[symbol];
    cell_changeInPrice.textContent=data[changeInPrice];
    row.appendChild(cell_id);
    row.appendChild(cell_name);
    row.appendChild(cell_price);
    row.appendChild(cell_rank);
    row.appendChild(cell_symbol);
    row.appendChild(cell_changeInPrice);
    tabl.appendChild(row);
    displayData.appendChild(tabl);
}

//Search Function
function search(){
    let searchText=input.value.toUpperCase();
    table=tabl;
    let tr=table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) 
    {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(searchText) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
    }
}
sortByPrice_btn.addEventListener('click',togglePrice);
tabl.className ="asc";
function togglePrice()
{

    if(tabl.className ==="asc")
    {
        sortByPrice_btn.innerHTML = 'Price 🔼';
        sortPriceAsc();
        tabl.className="desc";          
    }
    else if(tabl.className==="desc")
    {
        sortByPrice_btn.innerHTML = 'Price 🔽';
        sortPriceDesc();  
        tabl.className="asc";  
                      
    }           
}
//Sort Price by Ascending
function sortPriceAsc()
{  
    data.sort(function(a,b){
        return a.price_usd -b.price_usd;
    })
    tabl.innerHTML="";   
    display(data);    
}
//Sort Price by Descending
function sortPriceDesc()
{  
    data.sort(function(a,b){
        return b.price_usd -a.price_usd;
    })
    tabl.innerHTML="";  
    display(data);
   
}
sortByRank_btn.addEventListener('click',toggleRrank);
let rank='asc';
function toggleRrank(){
    if(rank==='asc'){
        sortByRank_btn.innerHTML = 'Rank 🔼';
        rankAsc();       
        rank='desc'
    }
    else if(rank==='desc'){
        sortByRank_btn.innerHTML = 'Rank 🔽';
        rankDesc();
        rank='asc';
    }
}
//Sort Rank by Ascending
function rankAsc(){
    data.sort(function(a,b){
        return a.rank -b.rank;
    })
    tabl.innerHTML="";   
    display(data);
}
//Sort Rank by Decscending
function rankDesc(){
    data.sort(function(a,b){
        return b.rank -a.rank;
    })
    tabl.innerHTML="";   
    display(data);
}
sortByName_btn.addEventListener('click',toggleName);
sortByName_btn.textContent="Sort By Name";
let nameOrder="asc";
function toggleName()
{
   if(nameOrder ==="asc")
    {
        sortByName_btn.textContent="Name 🔼";
        sortNameAsc();
        nameOrder="desc";          
    }
    else if(nameOrder==="desc")
    {
        sortByName_btn.textContent="Name 🔽";
        sortNameDesc();  
        nameOrder="asc";                  
    }      
}
function sortNameAsc(){
    data.sort(function(a,b){
        var nameA=a.name.toUpperCase();
        var nameB=b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        return 0;
    })
    tabl.innerHTML="";   
    display(data);
}
function sortNameDesc(){
    data.sort(function(a,b){
        data.sort(function(a,b){
            var nameA=a.name.toUpperCase();
            var nameB=b.name.toUpperCase();
            if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
            return 0;
        })
    })
    tabl.innerHTML="";   
    display(data);
}
