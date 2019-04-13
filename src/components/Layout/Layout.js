import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        revealSideDrawer: false,
        revealBackdrop: false,
    }

    removeSideDrawerHandler = () => {
        this.setState({
            revealSideDrawer: false,
            revealBackdrop : false,
        })
    }

    revealSideDrawerHandler = () => {
        this.setState({
            revealSideDrawer: true,
            revealBackdrop: true,
        });
    }

    render () {
        return (
            <Aux>
                <ToolBar revealSideDrawer={this.revealSideDrawerHandler}/>
                <SideDrawer revealed={this.state.revealSideDrawer} 
                    open={this.state.revealBackdrop} 
                    removeSideDrawer={this.removeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }    

}

export default Layout;

