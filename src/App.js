import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route,Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';
import { Login } from './views/Login'
// import DefaultLayout from './containers/DefaultLayout/ExportDefaultLayout.js'
// import {DefaultLayout} from './containers/DefaultLayout'
import { history } from './_helpers';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// const DefaultLayout = import('./containers/DefaultLayout').then(module => ({ default: module.DefaultLayout }))
// Containers
// .then(module => ({ default: module.DefaultLayout }))
// Todo
const LoadableDefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout/ExportDefaultLayout'),
  loading: loading
});
// Todo

// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout').then(module => ({ default: module.DefaultLayout })))

export class App extends Component {
  constructor(props) {
      super(props);      
      history.listen((location, action) => {          
      });
  } 
  
  render() {    
    // const { user, loggedIn = false } = this.props;
    // console.log('In App.js User ' + user + ' LoggedIn ' + loggedIn)
    return (
        <Router history={history}>
          <Switch>
            <Route path="/login" name="Login Page" component={Login} />    
            <Route path="/" name="Home" component={LoadableDefaultLayout} />          
          </Switch>          
        </Router>      
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  const { user, loggedIn } = authentication;
  return {
      user,
      loggedIn,
      alert
  };
}

export default connect(mapStateToProps)(App);

