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
                    disabledInfoLess: props.disabled.disabledInfoLess[control.type],
                    disabledInfoMore: props.disabled.disabledInfoMore[control.type]
                }}
                decrease={() => props.decrease(control.type)}
                increase={() => props.increase(control.type)}
            />
        )}
    </div>
);

export default buildControls;