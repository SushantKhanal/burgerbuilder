import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route path='/burgerbuilder' exact component={BurgerBuilder}/>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/logout' component={LogOut}/>
              {/* <Redirect from='/' to='/burgerbuilder'/> */}
            </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
