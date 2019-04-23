import * as actionTypes from '../actions/';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authenticationStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authenticationSuccess(state, action)
        case actionTypes.AUTH_FAILURE: return authenticationFailure(state, action)
        default: return state
    }
}

const authenticationStart = (state, action) => (
    updateObject(state, {error: null, loading: true})
)

const authenticationSuccess = (state, action) => (
    updateObject(state, {token: action.idToken, userId: action.userId, error: null, loading: false})
)

const authenticationFailure = (state, action) => (
    updateObject(state, {loading: false, error: action.error})
)

export default reducer;