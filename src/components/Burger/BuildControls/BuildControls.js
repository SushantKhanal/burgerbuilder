import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},

];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map((control,index) => 
            <BuildControl 
                key={control.label + index}
                label={control.label}
                disabled={{
                    less: props.disabled.lessButton[control.type],
                    more: props.disabled.moreButton[control.type]
                }}
                decrease={() => props.decrease(control.type)}
                increase={() => props.increase(control.type)}
            />
        )}
        <button onClick={props.ordered}
            className={classes.OrderButton} 
            disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
);

export default buildControls;