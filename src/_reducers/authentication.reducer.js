import { authenticationConstants } from '../_constants';
// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {loggedIn: false};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authenticationConstants.LOGIN_FAILURE:
      return { 
        error: action.error
      };
    case authenticationConstants.LOGOUT:
      return {};
    //
    case authenticationConstants.GET_USER_DETAIL_REQUEST:
      return {
        loading: true,
        loggedIn: true,
        user: action.userName
      };
    case authenticationConstants.GET_USER_DETAIL_REQUEST_SUCCESS:
      const userDetail = action.userDetail
      let userRoles,avatar
      if (userDetail.is_superuser === true) {
        userRoles = 'admin'        
        avatar = './static/admin_office.gif'
      } else {
        userRoles = 'editor'        
        avatar = './static/editor.gif'        
      }
      return {
        loading: false,
        loggedIn: true,       
        userRoles: userRoles,
        isAdmin: userDetail.is_superuser,
        user: userDetail.username,
        avatar: avatar
      };
    case authenticationConstants.GET_USER_DETAIL_REQUEST_FAILURE:
      return { 
        error: action.error
      };    
    default:
      return state
  }
}