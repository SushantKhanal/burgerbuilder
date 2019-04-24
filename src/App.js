import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import Aux from './hoc/Aux';
import * as actionCreators from './store/actions';

class App extends Component {
  componentDidMount () {
    this.props.autoSignIn();
  }

  render() {

     let routes = 
        <Aux>
          <Switch>
            <Route path='/burgerbuilder' exact component={BurgerBuilder}/>
            <Route path='/auth' component={Auth}/>
            <Redirect to='/burgerbuilder'/>
          </Switch>
        </Aux>

     if(this.props.isAuthenticated) {
       routes = 
          <Aux>
            <Switch>
              <Route path='/burgerbuilder' exact component={BurgerBuilder}/>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
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
