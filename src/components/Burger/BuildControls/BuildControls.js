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
        {controls.map((control,index) => 
            <BuildControl 
                key={control.label + index}
                label={control.label}
                type={control.type}
                decrease={props.decrease}
                increase={props.increase}
            />
        )}
    </div>
);

export default buildControls;