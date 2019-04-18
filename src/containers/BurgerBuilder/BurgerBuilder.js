import React, { Component } from 'react';
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
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        axios.get('https://burgerbuilder-6e86d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchasableState = () => {
        const ingredients = {...this.state.ingredients};
        const sumOfIngredients = Object.keys(ingredients).reduce((sum, el)=>{
            return sum + ingredients[el];
        },0);
        if(this.state.purchaseable !== (sumOfIngredients > 0))
            this.setState({purchaseable: sumOfIngredients > 0})
    }

    removeIngredientHandler = (ingredient) => {
        const priceRemoval = INGREDIENT_PRICES[ingredient];
        this.setState((prevState, props)=>{
            if (prevState.ingredients[ingredient] !== 0)
                return{
                    ingredients : {...prevState.ingredients, [ingredient] : prevState.ingredients[ingredient] - 1},
                    totalPrice : prevState.totalPrice - priceRemoval,
                }
            return prevState;    
        })
    }

    addIngredientHandler = (ingredient) => {
        const priceAddition = INGREDIENT_PRICES[ingredient];
        this.setState((prevState, props)=>{
            if (prevState.ingredients[ingredient] !== 4)
                return{
                    ingredients : {...prevState.ingredients, [ingredient] : prevState.ingredients[ingredient] + 1},
                    totalPrice: prevState.totalPrice + priceAddition,
                }
            return prevState;    
        })
    }

    purchaseHandler = () => {
       this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryArray = [];
        for(let key in this.state.ingredients) {
            queryArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]))
        }
        queryArray.push('price='+this.state.totalPrice);
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
            lessButton:{...this.state.ingredients},
            moreButton:{...this.state.ingredients}
        };
        const { lessButton, moreButton } = disabledInfo;
        for(let key in lessButton) {
            lessButton[key] = lessButton[key] <= 0
            moreButton[key] = moreButton[key] >= 4
        }
        let orderSummary =  null;

        let burger = this.state.error ? <p>Sorry, ingredients can't be loaded!</p> : <Spinner />    

        if(this.state.ingredients) {
            burger = 
                    <Aux>
                        <Burger ingredients={this.state.ingredients}/> 
                        <BuildControls
                            ordered={this.purchaseHandler}
                            disabled={disabledInfo}
                            purchaseable={this.state.purchaseable}
                            price={this.state.totalPrice}
                            decrease={this.removeIngredientHandler}
                            increase={this.addIngredientHandler}
                        />
                    </Aux>
            orderSummary =  
                    <OrderSummary 
                    purchasing={this.state.purchasing}
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients} 
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

export default withErrorHandler(BurgerBuilder, axios);