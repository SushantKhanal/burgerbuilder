import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        }
    }

    removeIngredientHandler = (ingredient) => {
        this.setState((prevState, props)=>{
            if (prevState.ingredients[ingredient] !== 0)
                return{ingredients : {...prevState.ingredients, [ingredient] : prevState.ingredients[ingredient] - 1}}
            return prevState;    
        })
    }

    addIngredientHandler = (ingredient) => {
        this.setState((prevState, props)=>{
            if (prevState.ingredients[ingredient] !== 4)
                return{ingredients : {...prevState.ingredients, [ingredient] : prevState.ingredients[ingredient] + 1}}
            return prevState;    
        })
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls
                decrease={this.removeIngredientHandler}
                increase={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;