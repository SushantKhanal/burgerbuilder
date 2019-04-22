import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        this.props.setLoading();
        this.props.onFetchAndStoreIngredients()
    }

    updatePurchasableState = () => {
        const ingredients = {...this.props.ingredients};
        const sumOfIngredients = Object.keys(ingredients).reduce((sum, el)=>{
            return sum + ingredients[el];
        },0);
        if(this.state.purchaseable !== (sumOfIngredients > 0))
            this.setState({purchaseable: sumOfIngredients > 0})
    }

    removeIngredientHandler = (ingredient) => {
        if(this.props.ingredients[ingredient] < 1){
            return;
        }
        this.props.onIngredientRemoved(ingredient);
    }

    addIngredientHandler = (ingredient) => {
        if(this.props.ingredients[ingredient] >= 4) {
            return;
        }
        this.props.onIngredientAdded(ingredient);
    }

    purchaseHandler = () => {
       this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
        });

    }

    componentDidUpdate () {
        this.updatePurchasableState();
    }

    render() {
        const disabledInfo = {
            lessButton:{...this.props.ingredients},
            moreButton:{...this.props.ingredients}
        };
        const { lessButton, moreButton } = disabledInfo;
        for(let key in lessButton) {
            lessButton[key] = lessButton[key] <= 0
            moreButton[key] = moreButton[key] >= 4
        }
        let orderSummary =  null;

        let burger = this.props.error ? <p>Sorry, ingredients can't be loaded!</p> : <Spinner />    

        if(this.props.ingredients) {
            burger = 
                    <Aux>
                        <Burger ingredients={this.props.ingredients}/> 
                        <BuildControls
                            ordered={this.purchaseHandler}
                            disabled={disabledInfo}
                            purchaseable={this.state.purchaseable}
                            price={this.props.totalPrice}
                            decrease={this.removeIngredientHandler}
                            increase={this.addIngredientHandler}
                        />
                    </Aux>
            orderSummary =  
                    <OrderSummary 
                    purchasing={this.state.purchasing}
                    price={this.props.totalPrice}
                    ingredients={this.props.ingredients} 
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>        
        }   

        if(this.props.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>    
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    let { ingredients, price, loading ,error } = state.burgerBuilder;
    return {
        ingredients,
        totalPrice: price,
        loading,
        error,
    }
}

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded : (ingredient) => dispatch(actionCreators.onAddIngredient(ingredient)),
    onIngredientRemoved : (ingredient) => dispatch(actionCreators.onRemoveIngredient(ingredient)),
    onFetchAndStoreIngredients : () => dispatch(actionCreators.onFetchIngredients()),
    setLoading : () => dispatch(actionCreators.setLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));