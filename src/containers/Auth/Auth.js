import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

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
            formIsValid: isValid,
        })
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
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button clicked = {()=>{console.log("clicked")}}
                        btnType="Success" disabled={!this.state.formIsValid}
                    >Submit</Button>
                </form>
            </div>
        )
    }

}

export default Auth;