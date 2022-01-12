
const buttonNewMeal = document.getElementById("button-newMeal")
buttonNewMeal.addEventListener("click",getNewMeal );

const meal= {
    name:"",
    ingredients:[]=[],
    instructions:"",
    source:"",
    picture:"",
    video:"",
    instructions:""
};



function getNewMeal(){
    buttonNewMeal.innerHTML="Processing"    
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then( meal => meal.json())
    .then(data => {creatMeal(data["meals"][0]);
    buttonNewMeal.innerHTML="Get an other one!   |  <i class='fas fa-hamburger'></i>"
    buttonNewMeal.disabled=false;
    displayNewMeal();})
    .catch((error)=>{
        buttonNewMeal.innerHTML="Ups, something went wrong :( Try it again! "
        console.log(error)
    });
    
    buttonNewMeal.innerHTML="<i class='fa fa-spinner fa-spin'></i> "
    buttonNewMeal.disabled=true;
    


}

function creatMeal(mealJson){
    console.log(mealJson)
  
    meal.ingredients=[];
    var i=1;
    while(mealJson[`strIngredient${i}`] != ""){
        var ingredientMesures = {};
        ingredientMesures.ingridient = mealJson[`strIngredient${i}`] ;
        ingredientMesures.mesure =mealJson[`strMeasure${i}`];
        meal.ingredients.push(ingredientMesures);        
        i++;
    }

    meal.name = mealJson.strMeal;
    meal.source = mealJson.strSource;
    meal.picture = mealJson.strMealThumb; 
    meal.video=mealJson.strYoutube;
    meal.instructions =mealJson.strInstructions;
   
}

function displayNewMeal(){
    console.log(meal.picture)
    if(meal.picture!=null && meal.picture!=""){
        document.querySelector('.picture-container').innerHTML = `<img src="${meal.picture}" alt="Meal Image">`
    }
    
    document.querySelector('.ingredients').innerHTML = `
    <ul>
        ${meal.ingredients.map(ingredient => `<b>${ingredient.ingridient} </b> <i>${ingredient.mesure} </i>| `).join('')}
    </ul>`

    document.querySelector('.instructions').innerHTML =  meal.instructions ;
    document.querySelector('.title').innerHTML =  `<h1>${meal.name}</h1>`;
    document.querySelector('.youtubeLink').href =  `${meal.video}`;
    document.querySelector('.youtubeLink').innerHTML =  `Watch it, mate! `;

    
    
    
}

