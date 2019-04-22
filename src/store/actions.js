import axios from '../axios-orders';

export const STORE_INGREDIENTS = 'STORE_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const STORE_ORDERS = 'STORE_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';

export const onStoreIngredients = (ingredients) => (
    {
        type: STORE_INGREDIENTS,
        ingredients, 
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

export const onStoreOrders = (orders) => (
    {
        type: STORE_ORDERS,
        orders,
    }
)

export const onFetchOrders = dispatch => {
    return dispatch => {
        axios.get('/orders.json')
        .then(response => {
            const orders = Object.keys(response.data).map(responseKey => ({
                ...response.data[responseKey],
                id: responseKey,
            }));
            dispatch(onStoreOrders(orders));
            // this.setState({loading: false, orders});
        })
        .catch(error => {
            // this.setState({loading: false});
            console.log(error);
        })
    }
}

export const onAddOrder = order => (
    {
        type: ADD_ORDER,
        order,
    }
)






