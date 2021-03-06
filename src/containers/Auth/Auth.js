import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../utils/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
            }
        },
        formIsValid: false,
        isSignup: true,
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormObject = updateObject(this.state.controls[inputIdentifier], {
            valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            value: event.target.value,
            touched: true,
        })
        const updatedForm = updateObject(this.state.controls, {
            [inputIdentifier]: updatedFormObject,
        })
        let isValid = true;
        for (let key in updatedForm) {
            isValid = updatedForm[key].valid && isValid;
        }
        this.setState({
            controls: updatedForm,
            formIsValid: true,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthRequest(
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignup    
        );
    }

    switchAuthModeHandler = () => {
        this.setState((prevState)=> ({isSignup: !prevState.isSignup}));
    }

    componentDidMount () {
        if(!this.props.building && this.props.authRedirectPath !== '/burgerbuilder'){
            this.props.setAuthRedirectPath()
        }
    }

    render() {

        const formElementArray = Object.keys(this.state.controls).map(
            key=> ({id: key, config: this.state.controls[key]})
            );

        const form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                shouldValidate={Object.keys(formElement.config.validation).length>0}
                valid={formElement.config.valid}
                touched={formElement.config.touched}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)}
            />
        ))
        
        let errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;
        
        let authenticated = null;    

        if(this.props.isAuthenticated) {
            authenticated = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            this.props.loading ? <Spinner/> :
            <div className={classes.Auth}>
                {authenticated}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
                <Button btnType="Danger" clicked = {this.switchAuthModeHandler}>
                    Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        )

    }

}

const mapStateToProps = state => (
    {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
)

const mapDispatchToProps = dispatch => (
    {
        onAuthRequest : (email, password, isSignup) => (dispatch(actionCreators.onAuthRequest(email, password, isSignup))),
        setAuthRedirectPath : () => (dispatch(actionCreators.setAuthRedirectPath('/burgerbuilder'))),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Auth);