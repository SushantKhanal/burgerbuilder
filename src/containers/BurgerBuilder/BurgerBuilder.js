import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
// import Checkout from '../Checkout/Checkout';

const INGREDIENT_PRICES = {
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.9,
    meat: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        axios.get('https://burgerbuilder-6e86d.firebaseio.com/ingredients.json')
            .then(response => {
                // this.setState({ingredients: response.data})
                this.props.storeIngredients(response.data)
            })
            .catch(error => {
                this.setState({error: true})
            })
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
        this.props.removeIngredient(ingredient);
    }

    addIngredientHandler = (ingredient) => {
        this.props.addIngredient(ingredient);
    }

    purchaseHandler = () => {
       this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryArray = [];
        for(let key in this.props.ingredients) {
            queryArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]))
        }
        queryArray.push('price='+this.props.totalPrice);
        const queryString = queryArray.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryString,
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

        let burger = this.state.error ? <p>Sorry, ingredients can't be loaded!</p> : <Spinner />    

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

        if(this.state.loading) {
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
    return {
        ingredients: state.ingredients,
        totalPrice: state.price,
    }
}

const mapDispatchToProps = (dispatch) => ({
    storeIngredients : (ingredients) => dispatch({
        type: 'STORE_INGREDIENTS',
        ingredients, 
    }),
    addIngredient : (ingredient) => dispatch({
        type: 'ADD_INGREDIENT',
        ingredient,
    }),
    removeIngredient : (ingredient) => dispatch({
        type: 'REMOVE_INGREDIENT',
        ingredient,
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));