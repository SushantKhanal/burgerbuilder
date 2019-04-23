import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        revealSideDrawer: false,
    }

    removeSideDrawerHandler = () => {
        this.setState({
            revealSideDrawer: false,
        })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState, props) => (
            {revealSideDrawer: !prevState.revealSideDrawer,}
        ));
    }

    render () {
        return (
            <Aux>
                <ToolBar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} revealed={this.state.revealSideDrawer}  
                    removeSideDrawer={this.removeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }    

}

const mapStateToProps = state => (
    {
        isAuthenticated : state.auth.token !== null
    }
)

export default connect(mapStateToProps)(Layout);

