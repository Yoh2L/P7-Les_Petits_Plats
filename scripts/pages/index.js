import recipesData from '../data/recipesData.js';
import Recipe from '../models/recipe.js';

class Main {
    constructor() {
        this.recipes = recipesData.map(recipeData => new Recipe(recipeData));
        this.filteredRecipes = [...this.recipes];
        this.displayRecipes();
        this.activeFilters();
        this.researchIngredient();

// Expand filters EventListener
        document.querySelector(".ingredients_search_icon").addEventListener("click", e=>{
            const ingredientsFilter = document.querySelector(".ingredients-filter");
            if(ingredientsFilter.classList.contains("expanded")) {
                ingredientsFilter.classList.remove("expanded");
            }
            else {
                ingredientsFilter.classList.add("expanded");
                this.displayFilters("ingredients");
            }
        })
    
        document.querySelector(".device_search_icon").addEventListener("click", e=>{
            const deviceFilter = document.querySelector(".device-filter");
            if(deviceFilter.classList.contains("expanded")) {
                deviceFilter.classList.remove("expanded");
            }
            else {
                deviceFilter.classList.add("expanded");
                this.displayFilters("device");
            }
        })

        document.querySelector(".utensil_search_icon").addEventListener("click", e=>{
            const utensilFilter = document.querySelector(".utensil-filter");
            if(utensilFilter.classList.contains("expanded")) {
                utensilFilter.classList.remove("expanded");
            }
            else {
                utensilFilter.classList.add("expanded");
                this.displayFilters("utensil");
            }
        })
    }

// Affichage des recettes
    displayRecipes() {
        const recipesSection = document.querySelector(".recipes-section");
        recipesSection.innerHTML = "";
        this.filteredRecipes.forEach(element => { 
            recipesSection.appendChild(element.getCard());
        })
    }

// Récupération des données + création de la liste de données du filtre
    displayFilters(filterType) {
        const filters = [];
        const filtersUl = document.querySelector(`.filter_${filterType}-list`);
        this.filteredRecipes.forEach(recipe =>{
            const elements = recipe.extractElements(filterType);
            elements.forEach(element => {
                if (!filters.includes(element)) {
                    filters.push(element);
                }
            })
        })
        filtersUl.innerHTML = "";
        filters.forEach(filter => {
            const li = document.createElement('li');
            li.innerText = filter;
            filtersUl.appendChild(li);
        })
    }

// Recherche au sein du filtre + affichage temps réel
    researchIngredient() {
        const ingredients_research_bar = document.querySelector(".ingredients_research-bar");
        let ingredients = [];
        this.filteredRecipes.forEach(recipe =>{
            const elements = recipe.extractElements("ingredients");
            elements.forEach(element => {
                if (!ingredients.includes(element)) {
                    ingredients.push(element);
                }
            })
        })

        ingredients_research_bar.addEventListener("input", (e) => {
            let test = ingredients.filter(ingredient => ingredient.toLowerCase().includes(e.target.value.toLowerCase()));
            document.querySelector('.filter_ingredients-list').innerHTML = ``;
            test.forEach(element => {
                const li = document.createElement('li');
                li.innerText = element;
                document.querySelector('.filter_ingredients-list').appendChild(li);
            })
        })
    }

// EventListener click sur liste de filtre
    activeFilters() {
        const self = this;
        document.querySelector(".filter_ingredients-list").addEventListener("click", function(e) {
            self.createFilters(e.target.innerText);
            self.filterRecipes(e.target.innerText);
            const ingredientsFilter = document.querySelector(".ingredients-filter");
            ingredientsFilter.classList.remove("expanded");
        })
    }

// Création du bouton de filtre actif
    createFilters(data) {
            document.querySelector(".active-filters").innerHTML = `        
            <div class="ingredients_active-filter">
            <span class="filter-name">${data}</span>
            <img class="circle-xmark" src="./assets/icons/circle-xmark-regular.svg" alt="">
            </div>
            `
            const ingredient_active_filter = document.querySelector('.ingredients_active-filter');
            ingredient_active_filter.addEventListener("click", e => {
                ingredient_active_filter.style.display = "none";
                this.displayRecipes();
            })
            }

// Fonction de filtres des recettes à l'activation d'un filtre
    filterRecipes(data) {
        let recipesList = [];
        this.filteredRecipes.forEach(element => { 
            let i = 0;
            let length = element.ingredients.length;
            while(i < length) {
                element.ingredients[i].ingredient.includes(data)?recipesList.push(element):"";
                i++;
            }
        })
        const recipesSection = document.querySelector(".recipes-section");
        recipesSection.innerHTML = "";
        recipesList.forEach(element => { 
            recipesSection.appendChild(element.getCard());
        }) 
    }
}

new Main();       

