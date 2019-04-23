import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerbuilder" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.isAuth 
            ?  <NavigationItem link="/logout">LogOut</NavigationItem>
            :  <NavigationItem link="/auth">Authenticate</NavigationItem>  
        }
    </ul>
);

export default navigationItems;