import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from '../Burger/Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ing=>{
            let elem = [];
		    for(let i =0; i<props.ingredients[ing]; i++) {
			    elem.push(<BurgerIngredient key={ing + i} type={ing}/>);
            }
            return elem;
    }).reduce((accumulator, currentvalue) => {
        if(currentvalue.length>0){accumulator=accumulator.concat(currentvalue)}; 
        return accumulator;
    }, []); 

    (transformedIngredients.length === 0) && (transformedIngredients = <p>Please start adding ingredients</p>)

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;