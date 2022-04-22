var text="";
var row=document.getElementById('row');
document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    text = document.getElementById('textInput').value;
    row.innerHTML="";
    connectAPI(text);
});

function connectAPI(x){
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    .then (res=>res.json())
    .then (data=>load(data))
}

function load(x){
    console.log(x);
    console.table(x);

    for(var i=0;i<5;i++){
        var mealId= x.meals[i].idMeal;
        var mealName= x.meals[i].strMeal;
        var imgLink= x.meals[i].strMealThumb;
        var recipe= x.meals[i].strInstructions;

        var newDiv=document.createElement('div');
        newDiv.setAttribute("class","col-lg-4 col-md-6 col-12");
        newDiv.innerHTML=`<div class="self-card">
        <h3>Meal Name: ${mealName}</h3><div class="text-center">
        <img  src="${imgLink}" width="300px"></div>
        <p>Meal ID: ${mealId}</p>
        <p>Recipe: ${recipe}</p></div>`;
        row.appendChild(newDiv);
    }

    if(x.meals.length>5){
        var btnDiv=document.getElementById('buttonDiv');
        btnDiv.innerHTML=`<div id="showallbtn"><button class="submitBtn">Show All</button></div>`;
        document.getElementById('showallbtn').addEventListener('click', function(e){
            e.preventDefault();
            showMore(x);
        });
        
    } 
}

function showMore(x){
    
    for(var i=5;i<x.meals.length;i++){
        var mealId= x.meals[i].idMeal;
        var mealName= x.meals[i].strMeal;
        var imgLink= x.meals[i].strMealThumb;
        var recipe= x.meals[i].strInstructions;

        var newDiv=document.createElement('div');
        newDiv.setAttribute("class","col-lg-4 col-md-6 col-12");
        newDiv.innerHTML=`<div class="self-card">
        <h3>Meal Name: ${mealName}</h3><div class="text-center">
        <img  src="${imgLink}" width="300px"></div>
        <p>Meal ID: ${mealId}</p>
        <p>Recipe: ${recipe}</p></div>`;
        row.appendChild(newDiv);
}
}