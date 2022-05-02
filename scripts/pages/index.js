import recipesData from '../data/recipesData.js';
import Recipe from '../models/recipe.js';
import Filter from '../templates/filter_template.js';

class Main {
    constructor() {
        this.recipes = recipesData.map(recipeData => new Recipe(recipeData));
        this.displayRecipes();
        this.displayFilters();
    };
    displayRecipes() {
        const recipesSection = document.querySelector(".recipes-section");
        this.recipes.forEach(element => { 
            recipesSection.appendChild(element.getCard());
        });
    };
    displayFilters() {
        const ingredients_filter = document.querySelector('.ingredients-filter');
        ingredients_filter.addEventListener("click", event =>{
            ingredients_filter.innerHTML = "";

        })

    }
    
    

}

new Main();