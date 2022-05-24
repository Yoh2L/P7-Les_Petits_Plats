import recipe_template from "../templates/recipe_template.js";
import ingredient_template from "../templates/ingredient_template.js";

export default class Recipe {

    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

// Création de la carte recette
    getCard() {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        article.innerHTML = recipe_template;
        article.querySelector("h3").innerText = this.name;
        article.querySelector(".time").innerText = this.time + " min";
        article.querySelector(".recipe-text").innerText = this.description;

        this.ingredients.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = ingredient_template;
            li.querySelector('.ingredient').innerText = element.ingredient;
            li.querySelector('.quantity').innerText = element.quantity !== undefined ? ` : ${element.quantity}` : "";
            li.querySelector('.unit').innerText = element.unit !== undefined ? ` ${element.unit}` : "";
            article.querySelector('.ingredients-list').appendChild(li);
        });
                
        return article;
        
    }

// Extraction de tous les éléments passés en paramètre
    extractElements(elementType) {
        let elements = [];
        switch (elementType) {
            case "ingredients":
                elements = this.ingredients.map(ingredient=> ingredient.ingredient);
                break;
            case "device" :
                elements.push(this.appliance);
                break;
            case "utensil" :
                this.ustensils.forEach(element => {
                    elements.push(element);
                })
                break;
            default:
                break;
        }

        return elements;

    }

    isMatchingAllFilters(ingredients, device, utensil, searchInput) {

// this.matchingIngredient();
//this.filterDevice();
        return this.ingredients.find(ing=>ingredients.includes(ing.ingredient));
    }

    /*
    méthode 1 : filters ingredients
    méthode 2 : filters device
    méthode 3 : filters utensil
    méthode 4 : filter searchInput
    méthode 5 matching all filters : appel des 4 précédentes

    */
}