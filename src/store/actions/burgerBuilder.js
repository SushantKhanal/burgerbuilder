import axios from '../../axios-orders';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const FETCH_INGREDIENTS_START = 'FETCH_INGREDIENTS_START';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';


export const fetchIngredientsSuccess = (ingredients) => (
    {
        type: FETCH_INGREDIENTS_SUCCESS,
        ingredients, 
    }
)

export const onFetchIngredientsFailed = () => (
    {
        type: FETCH_INGREDIENTS_FAILURE,
    }
)

export const onFetchIngredients = () => {
    return dispatch => {
        dispatch(onFetchIngredientsStart());
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(fetchIngredientsSuccess(response.data));
            })
            .catch(error => {
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

export const onFetchIngredientsStart = () => (
    {
        type: FETCH_INGREDIENTS_START,
    }
)
