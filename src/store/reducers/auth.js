import * as actionTypes from '../actions/';
import { updateObject } from '../../utils/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/burgerbuilder',
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authenticationStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authenticationSuccess(state, action)
        case actionTypes.AUTH_FAILURE: return authenticationFailure(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state
    }
}

const setAuthRedirectPath = (state, action) => (
    updateObject(state, {authRedirectPath: action.path})
)

const authLogout = (state, action) => (
    updateObject(state, {token: null, userId: null})
)

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