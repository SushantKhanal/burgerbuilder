import * as actionTypes from '../actions';  //same as './actions/index

const initialState = {
    orders: [],
    loading: false,
    error: false,
}

const orders = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_ORDERS:
            return {
                ...state,
                    orders: action.orders,
            }
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                    orders: state.orders.concat(action.order)
            }        
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                    error: true,
            }    
        case actionTypes.ORDERS_LOADING_TRUE:
            return {
                ...state,
                    loading: true,
            }
        case actionTypes.ORDERS_LOADING_FALSE:
            return {
                ...state,
                    loading: false,
            }     
        default:
            return state;          
    }
}

export default orders;
