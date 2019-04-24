import React from 'react';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.revealed)  {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
    <Aux>
        <Backdrop show={props.revealed} clicked={props.removeSideDrawer}/>
        <div className={attachedClasses.join(' ')} onClick={props.removeSideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </div>
    </Aux>    
    )
};
    
export default sideDrawer;