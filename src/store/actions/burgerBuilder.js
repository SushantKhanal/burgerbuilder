import axios from '../../axios-orders';

export const STORE_INGREDIENTS = 'STORE_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
export const INGREDIENTS_LOADING_TRUE = 'INGREDIENTS_LOADING_TRUE';
export const INGREDIENTS_LOADING_FALSE = 'INGREDIENTS_LOADING_FALSE';

export const onStoreIngredients = (ingredients) => (
    {
        type: STORE_INGREDIENTS,
        ingredients, 
    }
)

export const onFetchIngredientsFailed = () => (
    {
        type: FETCH_INGREDIENTS_FAILED,
    }
)

export const onFetchIngredients = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-6e86d.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setLoaded());
                dispatch(onStoreIngredients(response.data));
            })
            .catch(error => {
                dispatch(setLoaded());
                dispatch(onFetchIngredientsFailed());
            })
    }
}

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

export const setLoading = () => (
    {
        type: INGREDIENTS_LOADING_TRUE,
    }
)

export const setLoaded = () => (
    {
        type: INGREDIENTS_LOADING_FALSE,
    }
)