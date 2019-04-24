import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import LogOut from './containers/Auth/LogOut/LogOut';
import Aux from './hoc/Aux';
import * as actionCreators from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount () {
    this.props.autoSignIn();
  }

  render() {

     let routes = 
        <Aux>
          <Switch>
            <Route path='/burgerbuilder' exact component={BurgerBuilder}/>
            <Route path='/auth' component={asyncAuth}/>
            <Redirect to='/burgerbuilder'/>
          </Switch>
        </Aux>

     if(this.props.isAuthenticated) {
       routes = 
          <Aux>
            <Switch>
              <Route path='/burgerbuilder' exact component={BurgerBuilder}/>
              <Route path='/checkout' component={asyncCheckout}/>
              <Route path='/orders' component={asyncOrders}/>
              <Route path='/auth' component={asyncAuth}/>
              <Route path='/logout' component={LogOut}/>
              <Redirect to='/burgerbuilder'/>
            </Switch>
          </Aux>
     }

    return (
        <div>
          <Layout>
              {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToProps = state => (
  {
    isAuthenticated : state.auth.token !== null,
  }
)

const mapDispatchToProps = dispatch => (
  {
    autoSignIn : () => (dispatch(actionCreators.onCheckAuthState())),
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
