import React, { Component } from 'react';
import Menus from './components/Menus';
import Home from './components/Home';
import NotFound from './components/NotFound'
import OrderFood from './components/OrderFood.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
const routers = [
  {
    path: '/test-fresher',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/order-food',
    exact: false,
    main: ({ match, history, location }) => <OrderFood match={match} history={history} location={location} />
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />
  }
]

// App.PropTypes = {

// }

function App() {
  function showContentMenus(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }

  return (
    <Router>
      <div className="App">
        <Menus />
        <Switch>
          {showContentMenus(routers)}
        </Switch>
      </div>
    </Router>
  );

}


export default App;
