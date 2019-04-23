import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../../store/actions';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    placeholder: 'Delivery Method',
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false,
            },
        },
        formIsValid: false,
        loading: false,
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

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients : {...this.props.ingredients},
            orderData: formData,
            price : this.props.totalPrice,
        }
        // this.setState({loading: true});
        this.props.onPurchaseBurger(order, this.props.token);
        // this.setState({loading: false});
        // this.props.history.push('/burgerbuilder');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let updatedForm = {...this.state.orderForm};  
        //this is not a deep clone, inner nested Objects like the values of country, name, delivery method are not cloned
        //instead there is a pointer to the original and hence changing anything there will mutate the original state
        let updatedFormObject = {...updatedForm[inputIdentifier]}
        //since its the 'value' property we're going to update, it is enough
        //but were we to update anything inside the object of elementConfig we would mutate the original state
        updatedFormObject["value"] = event.target.value;
        updatedFormObject.valid = this.checkValidity(event.target.value, updatedFormObject.validation);
        updatedFormObject.touched = true;
        updatedForm[inputIdentifier] = updatedFormObject;
        let formIsValid = true;
        for(const key in updatedForm) {
            formIsValid = formIsValid && updatedForm[key].valid;
            if(!formIsValid){
                break;
            }
        }
        this.setState(
            {
                orderForm: {
                            ...updatedForm,
                            [inputIdentifier] : updatedFormObject,
                           },
                formIsValid,
        
            }
        );
    }

    render () {
        const formElementArray = Object.keys(this.state.orderForm).map(
            key=> ({id: key, config: this.state.orderForm[key]})
            );
        if(this.props.purchased) {
            this.props.history.replace('/burgerbuilder');
        }    
        return (
            this.state.loading ? <Spinner/> : 
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(
                        elem=><Input 
                                key = {elem.id} 
                                elementType={elem.config.elementType} 
                                elementConfig={elem.config.elementConfig} 
                                value={elem.config.value}
                                valid={elem.config.valid}
                                shouldValidate={elem.config.validation}
                                touched={elem.config.touched}
                                changed={(event)=>this.inputChangedHandler(event, elem.id)} 
                              />
                    )}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    purchased: state.orders.purchased,
    token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
    onPurchaseBurger: (order, token) => dispatch(actionCreators.onPurchaseBurger(order, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData),axios));
