const initialState = {
    ingredients: null,
    price: 4,
}

const INGREDIENT_PRICES = {
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.9,
    meat: 0.7,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_INGREDIENTS':
            return {
                ...state,
                ingredients: action.ingredients
            }
        case 'ADD_INGREDIENT':
            if(state.ingredients[action.ingredient] >= 4){
                return state;
            }
            const priceAddition = INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                    price: state.price + priceAddition,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] + 1
                    }
            }
        case 'REMOVE_INGREDIENT':
            if(state.ingredients[action.ingredient] < 1){
                return state;
            }
            const priceSubtraction = INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                    price: state.price - priceSubtraction,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] - 1
                    }
            }        
    }
    return state;
}

export default reducer;