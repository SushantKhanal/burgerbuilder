import axios from '../../axios-orders';


export const STORE_ORDERS = 'STORE_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';

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
            })
            .catch(error => {
                
            })
    }
}

export const onAddOrder = order => (
    {
        type: ADD_ORDER,
        order,
    }
)

export const onPostOrder = (order) => {
    return dispatch => {
        axios.post('/orders.json', order)
            .then(response => {
                dispatch(onAddOrder(order));
            })
            .catch(error => {
                debugger;
                console.log(error);
            })
    }

}






