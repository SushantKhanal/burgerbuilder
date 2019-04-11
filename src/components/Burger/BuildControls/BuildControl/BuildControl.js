import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} 
            disabled={props.disabled.less}
            onClick={props.decrease}>Less</button>
        <button className={classes.More} 
            disabled={props.disabled.more}
            onClick={props.increase}>More</button>
    </div>
);

export default buildControl;