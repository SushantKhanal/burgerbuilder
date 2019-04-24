import axios from '../../axios-orders';

export const STORE_ORDERS = 'STORE_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS_FAILED = 'FETCH_ORDERS_FAILED';
export const ORDERS_LOADING_TRUE = 'ORDERS_LOADING_TRUE';
export const ORDERS_LOADING_FALSE = 'ORDERS_LOADING_FALSE';
export const PURCHASING_INIT = 'PURCHASING_INIT';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';

export const onPurchasingInit = () => (
    {
        type: PURCHASING_INIT,
    }
)

export const onStoreOrders = (orders) => (
    {
        type: STORE_ORDERS,
        orders,
    }
)

export const onFetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(onOrdersLoading());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                dispatch(onOrdersLoaded());
                const orders = Object.keys(response.data).map(responseKey => ({
                    ...response.data[responseKey],
                    id: responseKey,
                }));
                dispatch(onStoreOrders(orders));
            })
            .catch(error => {
                dispatch(onOrdersLoaded());
                dispatch(onFetchOrdersFailed())
            })
    }
}

export const onOrdersLoading = () => (
    {
        type: ORDERS_LOADING_TRUE,
    }
)

export const onOrdersLoaded = () => (
    {
        type: ORDERS_LOADING_FALSE,
    }
)

export const onFetchOrdersFailed = () => (
    {
        type: FETCH_ORDERS_FAILED,
    }
)

export const onPurchaseBurger = (order, token) => {
    return dispatch => {
        axios.post('/orders.json?auth='+token, order)
            .then(response => {
                dispatch(onPostOrderSuccess(order));
            })
            .catch(error => {

            })
    }

}

export const onPostOrderSuccess = (order) => (
    {
        type: POST_ORDER_SUCCESS,
        order,
    }
)










