import burgerBuilderReducer from './burgerBuilder';
import ordersReducer from './orders';
import authReducer from './auth';
import { combineReducers } from 'redux';

export default combineReducers({
    burgerBuilder : burgerBuilderReducer,
    orders : ordersReducer,
    auth : authReducer,
})
