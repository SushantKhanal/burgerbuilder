import * as actionTypes from '../actions';  //same as './actions/index

const initialState = {
    orders: [],
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
        default:
            return state;          
    }
}

export default orders;
