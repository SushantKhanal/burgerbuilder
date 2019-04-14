import React, {Component} from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component  {

    // shouldComponentUpdate(props) {
    //     let shouldUpdateFlag = false;
    //     if(this.props.purchasing) shouldUpdateFlag = true;
    //     return shouldUpdateFlag;
    // }

    //this component could be a functional component

    componentWillUpdate() {
        console.log("Order Summary will update!")
    }

    render () {

        const ingredientSummary = Object.keys(this.props.ingredients).reduce((accumulator,el)=>{
            accumulator = accumulator.concat([<li key={el}>
                                <span style={{textTransform:'capitalize '}}>{el}</span>: {this.props.ingredients[el]}
            </li>]);
            return accumulator;
        },[]);
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }


}

export default OrderSummary;