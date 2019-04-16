import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.9,
    meat: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
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
        this.setState({loading: true});
        const order = {
            ingredients : {...this.state.ingredients},
            price : this.state.totalPrice,
            customer : {
                name : 'Mr A',
                address : 'Street 112',
                email : 'test@test.com',
            },
            deliveryMethod : 'fastest',
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false,});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false,});
                console.log(error);
            })
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
        let orderSummary =  
                <OrderSummary 
                purchasing={this.state.purchasing}
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} 
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
        
        if(this.state.loading) 
            orderSummary = <Spinner/>

        return (
            <Aux>
                {
                    // this.state.purchasing &&
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>}    
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
        );
    }
}

export default BurgerBuilder;