import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from '../Burger/Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ing=>{
		    for(let i =0; i<props.ingredients[ing]; i++) {
			    return <BurgerIngredient key={ing + i} type={ing}/>;
            }
            return null;
    })
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;