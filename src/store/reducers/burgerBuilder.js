import * as actionTypes from '../actions';  //same as './actions/index

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
            return {
                ...state,
                ingredients: action.ingredients,
                price: 4,
                error: false,
            }
        case actionTypes.ADD_INGREDIENT:
            const priceAddition = INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                    price: state.price + priceAddition,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] + 1
                    }
            }
        case actionTypes.REMOVE_INGREDIENT:
            const priceSubtraction = INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                    price: state.price - priceSubtraction,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] - 1
                    }
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                    error: true,
            }
        case actionTypes.INGREDIENTS_LOADING_TRUE:
            return {
                ...state,
                    loading: true,
            }
        case actionTypes.INGREDIENTS_LOADING_FALSE:
            return {
                ...state,
                    loading: false,
            }                  
        default:
            return state;          
    }
}

export default burgerBuilder;