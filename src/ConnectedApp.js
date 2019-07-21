import { connect } from 'react-redux';
import App from './App'
function mapStateToProps(state) {
  const { alert, authentication } = state;
  const { user, loggedIn } = authentication;
  return {
      user,
      loggedIn,
      alert
  };
}

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
