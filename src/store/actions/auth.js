import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
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
                console.log(response);
                dispatch(onAuthSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                console.log(error);
                dispatch(onAuthFailure(error));
            });    
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
