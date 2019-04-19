import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

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
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: '',
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
                value: '',
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients : {...this.props.ingredients},
            price : this.props.price,
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/burgerbuilder');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let updatedForm = {...this.state.orderForm};  
        //this is not a deep clone, inner nested Objects like the values of country, name, delivery method are not cloned
        //instead there is a pointer to the original and hence changing anything there will mutate the original state
        let updatedFormObject = {...updatedForm[inputIdentifier]}
        //since its the 'value' property we're going to update, it is enough
        //but were we to update anything inside the object of elementConfig we would mutate the original state
        updatedFormObject["value"] = event.target.value;
        this.setState({orderForm: 
            {
                ...updatedForm,
                [inputIdentifier] : updatedFormObject,
            }
        });
    }

    render () {
        const formElementArray = Object.keys(this.state.orderForm).map(
            key=> ({id: key, config: this.state.orderForm[key]})
            );
        return (
            this.state.loading ? <Spinner/> : 
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                <form>
                    {formElementArray.map(
                        elem=><Input 
                                key = {elem.id} 
                                elementType={elem.config.elementType} 
                                elementConfig={elem.config.elementConfig} 
                                value={elem.config.value}
                                changed={(event)=>this.inputChangedHandler(event, elem.id)}
                              />
                    )}
                    <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;