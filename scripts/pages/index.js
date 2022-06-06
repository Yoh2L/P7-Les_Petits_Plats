import recipesData from '../data/recipesData.js';
import Recipe from '../models/recipe.js';
import activeFilter_template from '../templates/activeFilter_template.js'

const FILTERS_TYPES = ["ingredients", "device", "utensil"];

class Main {
    constructor() {
        this.recipes = recipesData.map(recipeData => new Recipe(recipeData));
        this.filteredRecipes = [...this.recipes];
        this.filters = {} ;
        this.selectedItems = {};
        this.elementSearch = {};
        FILTERS_TYPES.forEach(element => {
            this.filters[element] = [];
            this.selectedItems[element] = [];
            this.elementSearch[element] = "";
            this.initElementSearch(element);

            // Expand filters EventListener
            document.querySelector(`.${element}_search_icon`).addEventListener("click", e=>{
                if(document.querySelector(`.${element}-filter`).classList.contains("expanded")) {
                    document.querySelector(`.${element}-filter`).classList.remove("expanded")
                }
                else {
                    document.querySelector(`.${element}-filter`).classList.add("expanded");
                    this.displayFilters(element);
                }
            })
        })

        this.displayRecipes();
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

        const filtersUl = document.querySelector(`.filter_${filterType}-list`);
        this.filteredRecipes.forEach(recipe =>{
            const elements = recipe.extractElements(filterType);
            elements.forEach(element => {
                if (!this.filters[filterType].includes(element)) {
                    this.filters[filterType].push(element);
                }
            })
        })
        this.filters[filterType].sort();
        this.filters[filterType] = this.filters[filterType].filter(f => {
        return f.toLowerCase().includes(this.elementSearch[filterType].toLowerCase())&&!this.selectedItems[filterType].includes(f)
        })
        filtersUl.innerHTML = "";
        this.filters[filterType].forEach(filter => {
            const li = document.createElement('li');
            li.innerText = filter;
            filtersUl.appendChild(li);
            li.addEventListener("click", e => {
                this.selectedItems[filterType].push(e.target.innerText);
                this.createFilters(filterType, e.target.innerText);
                this.filterRecipes();
                document.querySelector(`.${filterType}-filter`).classList.remove("expanded");
            });
        })
    }

// Création du bouton de filtre actif
    createFilters(filterType, data) {
        const data_class = data.replaceAll(' ', '_');
        const div = document.createElement('div');
        div.innerHTML = activeFilter_template;
        div.classList.add(`${filterType}_active-filter`, data_class);
        div.querySelector(".filter-name").innerText = data;
        
        div.addEventListener("click", e => {
            document.querySelector('.active-filters').removeChild(div);
            this.selectedItems[filterType] = this.selectedItems[filterType].filter(element=>element !== data);
            this.filterRecipes();
        })
        document.querySelector('.active-filters').appendChild(div);
    }

// Recherche au sein du filtre + affichage temps réel
    initElementSearch(filterType) {
        document.querySelector(`.${filterType}_research-bar`).addEventListener("input", (e) => {
            this.elementSearch[filterType] = e.target.value;
            this.displayFilters(filterType);
        })
    }

// Fonction de filtres des recettes à l'activation d'un filtre
    filterRecipes() {
        this.filteredRecipes = this.recipes.filter(recipe=> recipe.isMatchingAllFilters(...Object.values(this.selectedItems), this.searchInput));
        this.displayRecipes();
    }
}

new Main();       

