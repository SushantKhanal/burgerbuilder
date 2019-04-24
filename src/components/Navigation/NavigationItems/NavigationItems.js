import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerbuilder" exact>Burger Builder</NavigationItem>
        {!props.isAuth 
            ?   <NavigationItem link="/auth">Authenticate</NavigationItem>  
            :   <Aux>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">LogOut</NavigationItem>
                </Aux>
        }
    </ul>
);

export default navigationItems;