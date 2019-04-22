import * as actionTypes from '../actions';  //same as './actions/index
import * as utils from '../utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,
}

const orders = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE_ORDERS: return storeIngredients(state, action)
        case actionTypes.POST_ORDER_SUCCESS: return registerOrderPosted(state, action)
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action)
        case actionTypes.ORDERS_LOADING_TRUE: return setOrdersLoading(state, action)
        case actionTypes.ORDERS_LOADING_FALSE: return setOrdersLoaded(state, action)
        case actionTypes.PURCHASING_INIT: return purchaseBurgerStart(state, action)
        default: return state;  
    }

}

const purchaseBurgerStart = (state, action) => (
    utils.updateObject(state, {purchased: false})
)

const setOrdersLoading = (state, action) => (
    utils.updateObject(state, {loading: true})
)

const setOrdersLoaded = (state, action) => (
    utils.updateObject(state, {loading: false})
)

const fetchOrdersFailed = (state, action) => (
    utils.updateObject(state, {error: true})
)

const storeIngredients = (state, action) => (
    utils.updateObject(state, {orders: action.orders, error: false})
)

const registerOrderPosted = (state, action) => (
    utils.updateObject(state, {orders: state.orders.concat(action.order), purchased: true})
) 

export default orders;
