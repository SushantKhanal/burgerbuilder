import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        loading: false,
        orders: null
    }

    componentDidMount () {
        this.setState({loading:true})
        axios.get('/orders.json')
        .then(response => {
            const orders = Object.keys(response.data).map(responseKey => ({
                ...response.data[responseKey],
                id: responseKey,
            }));
            this.setState({loading: false, orders});
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
        })
    }

    render () {
        const orders = this.state.orders ? this.state.orders.map((order,index)=>
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        ) : null;
        return (
            <div>
                {this.state.loading ? <Spinner/> : orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);