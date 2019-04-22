import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/'/>;
        if(this.props.ingredients) {
            summary = <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        onCheckoutCancel = {this.checkoutCancelHandler}
                        onCheckoutContinue = {this.checkoutContinueHandler}
                      />
        }
        return (
            <div>
                {summary}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )  
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
})

export default connect(mapStateToProps)(Checkout);
