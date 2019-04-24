import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions';

class Orders extends Component {

    state = {
        loading: false,
    }

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        const orders = this.props.orders ? this.props.orders.map((order,index)=>
            <Order key={order.id + index} ingredients={order.ingredients} price={order.price}/>
        ) : null;
        return (
            <div>
                {this.state.loading ? <Spinner/> : orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders.orders,
    token: state.auth.token,
    userId: state.auth.userId,
})

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actionCreators.onFetchOrders(token, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));