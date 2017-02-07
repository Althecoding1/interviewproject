import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import Auth from '../../authenticate.js';

const Navigation = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">SynapsePay</IndexLink>
      </div>
      {Auth.checkUserAuthentication() ? (
        <div className="top-bar-right">
          <Link to="/logout">Log Out</Link>
        </div> ) : (
        <div className="top-bar-right">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
    {children}
  </div>
);

Navigation.propTypes = {
  children: PropTypes.object.isRequired
};

export default Navigation;
