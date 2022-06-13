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
        this.utensils = data.ustensils;
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
                this.utensils.forEach(element => {
                    elements.push(element);
                })
                break;
            default:
                break;
        }
        return elements;
    }
// Filtrage des ingredients
    filterIngredients(ingredients) {
        let isMatchingIngredients = true;
        ingredients.forEach(ing=> {
            const isMatchingCurIng = this.ingredients.find(i => i.ingredient === ing);
            isMatchingIngredients = !!isMatchingCurIng&&isMatchingIngredients;
        })
        return isMatchingIngredients;
    }
// Filtrage des appareils
    filterDevice(device) {
        let isMatchingDevice = true;
            device.forEach(dev=> {
                const isMatchingCurDev = this.appliance.includes(dev);
                isMatchingDevice = !!isMatchingCurDev&&isMatchingDevice;
            })
        return isMatchingDevice;
    }
// Filtrage des ustensiles
    filterUtensil(utensil) {
        let isMatchingUtensil = true;
            utensil.forEach(uten=> {
                const isMatchingCurUten = this.utensils.includes(uten);
                isMatchingUtensil = !!isMatchingCurUten&&isMatchingUtensil;
            })
            return isMatchingUtensil;
    }
// Filtrage via la Search bar
// Recherche ingredients, description et nom de recette
    searchInput(searchInput) {
        let isMatchingInput = true;
        let matchName = false;
        let matchDescr = false;
        let matchIngr = false;
        if(searchInput) {
            matchName = this.name.toLowerCase().includes(searchInput.toLowerCase());
            matchDescr = this.description.toLowerCase().includes(searchInput.toLowerCase());
            for (let index = 0; index < this.ingredients.length; index++) {
                if(this.ingredients[index].ingredient.toLowerCase().includes(searchInput.toLowerCase())) {
                    matchIngr = true;
                }
            }
            isMatchingInput = matchName||matchDescr||matchIngr;
        }
        return isMatchingInput;
    }
// Méthode principale de la gestion de filtrage & recherche
// Si searchInput renvoie "true" la recette sera affichée
    isMatchingAllFilters(ingredients, device, utensil, searchInput) {

        const isMatchingIngredients = this.filterIngredients(ingredients);
        const isMatchingDevice = this.filterDevice(device);
        const isMatchingUtensil = this.filterUtensil(utensil);
        const isMatchingInput = this.searchInput(searchInput);

        return isMatchingIngredients&&isMatchingDevice&&isMatchingUtensil&&isMatchingInput;
    }

}