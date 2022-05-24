import recipesData from '../data/recipesData.js';
import Recipe from '../models/recipe.js';

class Main {
    constructor() {
        this.recipes = recipesData.map(recipeData => new Recipe(recipeData));
        this.filteredRecipes = [...this.recipes];
        this.filters = { ingredients : [], device :[], utensil : []} ;
        this.selectedItems = {ingredients : [], device :[], utensil : []};
        this.displayRecipes();
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
        filtersUl.innerHTML = "";
        this.filters[filterType].forEach(filter => {
            const li = document.createElement('li');
            li.innerText = filter;
            filtersUl.appendChild(li);
            //Ajouter ici event listener filtre actif
            li.addEventListener("click", e => {
                switch (filterType) {
                    case "ingredients":
                        this.selectedItems.ingredients.push(e.target.innerText);
                        this.createFilters(filterType, e.target.innerText);
                        /* console.log(this.selectedItems); */
                        this.filterRecipes();
                        const ingredientsFilter = document.querySelector(".ingredients-filter");
                        ingredientsFilter.classList.remove("expanded");
                        break;
                    case "device":
                        this.selectedItems.device.push(e.target.innerText);
                        this.createFilters(filterType, e.target.innerText);
                        /* console.log(this.selectedItems); */
                        this.filterRecipes();
                        const deviceFilter = document.querySelector(".device-filter");
                        deviceFilter.classList.remove("expanded");
                        break;
                    case "utensil":
                        this.selectedItems.utensil.push(e.target.innerText);
                        this.createFilters(filterType, e.target.innerText);
                        /* console.log(this.selectedItems); */
                        this.filterRecipes();
                        const utensilFilter = document.querySelector(".utensil-filter");
                        utensilFilter.classList.remove("expanded");
                        break;
                
                    default:
                        break;
                }

            });
        })
    }

// Création du bouton de filtre actif
    createFilters(filterType, data) {
        console.log(this.selectedItems[filterType]);
        let data_class = "";
        if(/\s/.test(data)) {
            data_class = data.replaceAll(' ', '_');
        }
        else {
            data_class = data;
        }
            
        const div = document.createElement('div');
        div.classList.add(`${filterType}_active-filter`, data_class);
        const span = document.createElement('span');
        span.classList.add("filter-name");
        span.innerText = data;
        const img = document.createElement('img');
        img.classList.add("circle-xmark");
        img.src = "./assets/icons/circle-xmark-regular.svg";
        document.querySelector('.active-filters').appendChild(div);
        div.appendChild(span);
        div.appendChild(img);
        
        let toto = document.getElementsByClassName(data_class)[0];
        toto.addEventListener("click", e => {
            toto.style.display = "none"; // remove child + suppression élement du tableau
            this.selectedItems[filterType] = this.selectedItems[filterType].filter(element=>element !== data);
            this.filterRecipes();
        })

    }

// Recherche au sein du filtre + affichage temps réel
    researchIngredient() {
        const ingredients_research_bar = document.querySelector(".ingredients_research-bar");
        
        ingredients_research_bar.addEventListener("input", (e) => {
            let test = this.filters.ingredients.filter(ingredient => ingredient.toLowerCase().includes(e.target.value.toLowerCase()));
            document.querySelector('.filter_ingredients-list').innerHTML = ``;
            test.forEach(element => {
                const li = document.createElement('li');
                li.innerText = element;
                document.querySelector('.filter_ingredients-list').appendChild(li);
            })
        })
    }

// Fonction de filtres des recettes à l'activation d'un filtre
    filterRecipes() {

        this.filteredRecipes = this.recipes.filter(recipe=> recipe.isMatchingAllFilters(...Object.values(this.selectedItems), this.searchInput));
        this.displayRecipes();
        /* console.log(this.filteredRecipes); */
    }
}

new Main();       

