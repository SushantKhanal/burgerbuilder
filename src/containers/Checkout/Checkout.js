import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        error: false,
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    onCheckoutCancel = {this.checkoutCancelHandler}
                    onCheckoutContinue = {this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={()=>
                                <ContactData 
                                    {...this.props}
                                />
                           }/>
            </div>
        )
            
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.price,
})

export default connect(mapStateToProps)(Checkout);
