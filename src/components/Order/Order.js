import React from 'react'
import classes from './Order.module.css';

const order = (props) => {
    let ingredientsArray = [];
    for(let key in props.ingredients) {
        if(+props.ingredients[key] !== 0) {
            ingredientsArray.push({name: key, amount: props.ingredients[key]});
        }    
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsArray.map(ingredient=>
                <span style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                    }}
                    key={ingredient.name}> 
                    {ingredient.name}: {ingredient.amount} 
                </span>)}
            </p>
            <p>Price: <strong>${+props.price.toFixed(2)}</strong></p>
        </div>
    )
}


export default order;