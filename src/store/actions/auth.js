import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH'
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

let burgerbuilderApiKey = 'AIzaSyDoZndbbBn8cw1Zega3rztgWVg0C0DDwK4';
let signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + burgerbuilderApiKey;
let signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + burgerbuilderApiKey;
let getAccountInfoUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=' + burgerbuilderApiKey;

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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
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

export const setAuthRedirectPath = (path) => (
    {
        type: SET_AUTH_REDIRECT_PATH,
        path,
    }
)

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return  {
                type: AUTH_LOGOUT,
            }
}

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

export const onGetAccountInfo = (token, expirationDate) => {
    return dispatch => {
        axios.post(getAccountInfoUrl, {idToken: token})
            .then(response=>{
                dispatch(onAuthSuccess(token, response.data.users[0].localId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            },error=>{

            })
    }
}

export const onCheckAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                //send request to get userID
                dispatch(onGetAccountInfo(token, expirationDate));
            } else {
                dispatch(logout());
            }
        }
    }
}
