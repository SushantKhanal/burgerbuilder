import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

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

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = isValid && (value.trim() !== '');
        }
        if(rules.minLength) {
            isValid = isValid && (value.trim().length >= rules.minLength);
        }
        if(rules.maxLength) {
            isValid = isValid && (value.trim().length <= rules.maxLength);
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {...this.state.controls}
        const updatedFormObject = {...this.state.controls[inputIdentifier]}
        updatedFormObject.valid = this.checkValidity(event.target.value, updatedFormObject.validation);
        updatedFormObject.value = event.target.value;
        updatedFormObject.touched = true;
        updatedForm[inputIdentifier] = updatedFormObject;
        let isValid = true;
        for (let key in updatedForm) {
            isValid = updatedForm[key].valid && isValid;
        }
        this.setState({
            controls: updatedForm,
            // formIsValid: isValid,
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
            authenticated = <Redirect to="/burgerbuilder"/>
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
    }
)

const mapDispatchToProps = dispatch => (
    {
        onAuthRequest : (email, password, isSignup) => (dispatch(actionCreators.onAuthRequest(email, password, isSignup))),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Auth);