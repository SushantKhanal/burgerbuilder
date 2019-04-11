import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

    render() {
        const disabledInfo = {
            disabledInfoLess:{...this.state.ingredients},
            disabledInfoMore:{...this.state.ingredients}
        };
        for(let key in disabledInfo.disabledInfoLess) {
            disabledInfo.disabledInfoLess[key] = disabledInfo.disabledInfoLess[key] <= 0
            disabledInfo.disabledInfoMore[key] = disabledInfo.disabledInfoMore[key] >= 4
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    decrease={this.removeIngredientHandler}
                    increase={this.addIngredientHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;