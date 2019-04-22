import * as actionTypes from '../actions';  //same as './actions/index

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,
}

const orders = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_ORDERS:
            return {
                ...state,
                    orders: action.orders,
                    error: false,
            }
        case actionTypes.POST_ORDER_SUCCESS:
            return {
                ...state,
                    orders: state.orders.concat(action.order),
                    purchased: true,
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
        case actionTypes.PURCHASING_INIT:
            return {
                ...state,
                    purchased: false,
            }      
        default:
            return state;          
    }
}

export default orders;
