import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../../store/actions';

class LogOut extends Component {
    componentWillMount() {
        this.props.logOut();
    }

    render() {
        return <Redirect to='/auth'/>
    }
}

const mapDispatchToProps = dispatch => (
    {
        logOut : () => dispatch(actionCreators.logout())
    }
)

export default connect(null, mapDispatchToProps)(LogOut);