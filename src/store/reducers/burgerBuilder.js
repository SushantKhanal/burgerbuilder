import * as actionTypes from '../actions';  //same as './actions/index
import * as utils from '../utility';

const initialState = {
    ingredients: null,
    price: 4,
    loading: false,
    error: false,
}

const INGREDIENT_PRICES = {
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.9,
    meat: 0.7,
}

const burgerBuilder = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.STORE_INGREDIENTS:
            return utils.updateObject(state, {ingredients: action.ingredients, price: 4, error: false})

        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return utils.updateObject(state, {error: true})

        case actionTypes.INGREDIENTS_LOADING_TRUE:
            return utils.updateObject(state, {loading: true})

        case actionTypes.INGREDIENTS_LOADING_FALSE:
            return utils.updateObject(state, {loading: false})

        default:
            return state;          
    }

}

const addIngredient = (state, action) => {
    const ingredientAfterAddition = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
    const ingredientsAfterAddition = utils.updateObject(state.ingredients, ingredientAfterAddition);
    return utils.updateObject(state, {
                price: state.price + INGREDIENT_PRICES[action.ingredient],
                ingredients: ingredientsAfterAddition
            })
}

const removeIngredient = (state, action) => {
    const ingredientAfterRemoval = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
    const ingredientsAfterRemoval = utils.updateObject(state.ingredients, ingredientAfterRemoval);
    return utils.updateObject(state, {
                price: state.price - INGREDIENT_PRICES[action.ingredient],
                ingredients: ingredientsAfterRemoval
            })
}

export default burgerBuilder;
