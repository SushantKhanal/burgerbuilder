import Axios from "axios";

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authStart = () => {
    return dispatch => {
        dispatch(onAuthStart());
        Axios.post("")
            .then(response=>{
                dispatch(onAuthSuccess());
            }, error=> {
                dispatch(onAuthFailure());
            })
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

export const onAuthSuccess = (response) => (
    {
        type: AUTH_SUCCESS,
        payload: response.data,
    }
)    
