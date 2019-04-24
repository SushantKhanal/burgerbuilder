import authReducer from './auth';
import * as actionTypes from '../actions';

describe('auth reducer', ()=> {
    // beforeEach(()=>{
    //     authReducer.
    // })

    it('should return the initial state', ()=>{
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/burgerbuilder',
        })
    })

    it('should store the token upon login', () => {
        expect(authReducer({
            token: null, 
            userId: null, 
            error: null, 
            loading: false, 
            authRedirectPath: '/burgerbuilder'
        }, {
            type: actionTypes.AUTH_SUCCESS, 
            idToken:'some-token', 
            userId:'some-user-id'
            }
        )).toEqual({
            token: 'some-token', 
            userId: 'some-user-id', 
            error: null, 
            loading: false, 
            authRedirectPath: '/burgerbuilder'
        })
    })
})

