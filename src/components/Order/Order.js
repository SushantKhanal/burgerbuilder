import React from 'react'
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Cheese(2)</p>
        <p>price: <strong>$4.45</strong></p>
    </div>
)

export default order;