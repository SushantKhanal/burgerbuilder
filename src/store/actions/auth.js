import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

let burgerbuilderApiKey = 'AIzaSyDoZndbbBn8cw1Zega3rztgWVg0C0DDwK4';
let signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + burgerbuilderApiKey;
let signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + burgerbuilderApiKey;

export const onAuthRequest = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(onAuthStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = signinUrl
        if(isSignUp){url = signupUrl}
        axios.post(url, authData)
            .then(response => {
                dispatch(onAuthSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(onAuthFailure(error.response.data.error));
            });    
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => (
    {
        type: AUTH_LOGOUT,
    }
)


export const onAuthStart = () => (
    {
        type: AUTH_START,
    }
) 

export const onAuthFailure = (error) => (
    {
        type: AUTH_FAILURE,
        error,
    }
) 

export const onAuthSuccess = (idToken, userId) => (
    {
        type: AUTH_SUCCESS,
        idToken,
        userId,
    }
)    
