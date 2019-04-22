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
    
        case actionTypes.STORE_ORDERS:
            return utils.updateObject(state, {orders: action.orders, error: false});

        case actionTypes.POST_ORDER_SUCCESS:
            return utils.updateObject(state, {orders: state.orders.concat(action.order), purchased: true})
            
        case actionTypes.FETCH_ORDERS_FAILED:
            return utils.updateObject(state, {error: true})

        case actionTypes.ORDERS_LOADING_TRUE:
            return utils.updateObject(state, {loading: true})
 
        case actionTypes.ORDERS_LOADING_FALSE:
            return utils.updateObject(state, {loading: false})
  
        case actionTypes.PURCHASING_INIT:
            return utils.updateObject(state, {purchased: false})
    
        default:
            return state;          
    }

}

export default orders;
