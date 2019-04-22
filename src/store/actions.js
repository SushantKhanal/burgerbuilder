import axios from '../axios-orders';

export const STORE_INGREDIENTS = 'STORE_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';


export const onStoreIngredients = (ingredients) => (
    {
        type: STORE_INGREDIENTS,
        ingredients, 
    }
)

export const onAddIngredient = (ingredient) => (
    {
        type: ADD_INGREDIENT,
        ingredient,
    }
)

export const onRemoveIngredient = (ingredient) => (
    {
        type: REMOVE_INGREDIENT,
        ingredient,
    }
)

export const onFetchIngredients = dispatch => {
    return dispatch => {
        axios.get('https://burgerbuilder-6e86d.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(onStoreIngredients(response.data));
        })
        .catch(error => {
            
        })
    }
}