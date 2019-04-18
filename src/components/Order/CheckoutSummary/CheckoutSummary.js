import React from 'react';
// import { withRouter } from 'react-router-dom';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => (
        <div className={classes.CheckoutSummary}>
            <h1>We hope your burger tastes well :)</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                {props.ingredients ? <Burger ingredients={props.ingredients}/> : null}
            </div>
            <Button clicked = {props.onCheckoutCancel} btnType='Danger'>CANCEL</Button>
            <Button clicked = {props.onCheckoutContinue} btnType='Success'>CONTINUE</Button>
        </div>
)

// export default withRouter(checkoutSummary);
export default checkoutSummary;