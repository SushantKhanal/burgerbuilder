import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        error: false,
        totalPrice: 0,
    }

    componentWillMount () {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()){
        //     if(param[0] === 'price'){
        //         price = +param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1]
        //     }
        // }
        // console.log(ingredients);
        this.setState({ingredients: this.props.ingredients, totalPrice: this.props.totalPrice})
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
                    ingredients={this.state.ingredients}
                    onCheckoutCancel = {this.checkoutCancelHandler}
                    onCheckoutContinue = {this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={()=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>}/>
            </div>
        )
            
    }
}

const mapStateToProps = (state, action) => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
})

export default connect(mapStateToProps)(Checkout);
