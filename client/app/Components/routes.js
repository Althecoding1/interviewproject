import Nav from './Common/Nav.jsx';
import Home from './Common/Home.jsx';
import Login from './Common/LoginPage.jsx';
import NewUser from './Common/NewUsers.jsx';
import Navigation from './Common/Nav.jsx';
import Documents from './Dashboard/DocumentsPage.jsx';
import Auth from '../authenticate.js';

const routes = {
  component: Navigation,
  childRoutes: [
    {path: '/',
    getComponent: (location, callback) => {
      if(Auth.checkUserAuthentication()) {
        callback(null, Documents);
      } else {
        callback(null, Home);
      }}},
    {path: '/login', component: Login},
    {path: '/signup', component: NewUser},
    {path: '/logout', onEnter: (nextState, replace) => {
      Auth.deauthenticateUser();
      replace('/');
    }}
  ]
};

export default routes;
