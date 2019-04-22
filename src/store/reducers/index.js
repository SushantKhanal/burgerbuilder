import burgerBuilder from './burgerBuilder';
import orders from './orders';
import { combineReducers } from 'redux';

export default combineReducers({
    burgerBuilder,
    orders,
})
