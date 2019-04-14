import React, { Component } from 'react';
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
                <ToolBar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer revealed={this.state.revealSideDrawer}  
                    removeSideDrawer={this.removeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }    

}

export default Layout;

