import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients : {...this.props.ingredients},
            price : this.props.price,
            customer : {
                name : 'Mr A',
                address : 'Street 112',
                email : 'test@test.com',
            },
            deliveryMethod : 'fastest',
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

    render () {
        return (
            this.state.loading ? <Spinner/> : 
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                <form style={{display: 'inline-block'}}>
                    <input className={classes.Input} type="text" placeholder="Your Name"/>
                    <input className={classes.Input} type="text" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" placeholder="Your Street"/>
                    <input className={classes.Input} type="text" placeholder="Postal Code"/>
                    <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }

}

export default ContactData;