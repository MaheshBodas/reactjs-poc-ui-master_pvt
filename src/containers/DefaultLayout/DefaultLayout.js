import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { getToken } from '../../utils/auth'
import { authenticationService } from '../../_services'
import { Container } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  signOut(e) {
    e.preventDefault()
    authenticationService.logout()
    this.props.history.push('/login')    
  }

  render() {
    const { user, loggedIn = false, isAdmin } = this.props;
    console.log('In DefaultLayout.js User ' + user + ' LoggedIn ' + loggedIn)          
    return (
      <div className="app">        
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader isAdmin={isAdmin} onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            {/* <AppSidebarMinimizer /> */}
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>                 
                  {/* Working DND */}
                  {routes.map((route, idx) => { 
                    // const testSurvive = getToken()                   
                    return loggedIn && route.component ? (
                      // return false ? (
                      <Route
                        key={idx.toString()}
                        id={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}                        
                        render={props => (
                          <route.component {...props} />
                        )} 
                        />
                    ) : (<Redirect key={idx.toString()} id={idx} from="/" to="/login" />);
                  })}
                  {/* Working DND */}
                  <Redirect from="/" to="/dashboard" />                  
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  // const { user, loggedIn } = authentication;
  const { user, loggedIn, isAdmin, loading } = authentication;
  return {
      user,
      loggedIn,
      alert,
      isAdmin,
      loading
  };
}

const ConnectedDefaultLayout = connect(mapStateToProps)(DefaultLayout);
export { ConnectedDefaultLayout as DefaultLayout }; 
