import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    price: 4,
    orders: [],
}

const INGREDIENT_PRICES = {
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.9,
    meat: 0.7,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                price: 4,
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
        case actionTypes.STORE_ORDERS:
            return {
                ...state,
                    orders: action.orders,
            }
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                    orders: state.orders.concat([action.oreder])
            }        
        default:
            return state;          
    }
}

export default reducer;