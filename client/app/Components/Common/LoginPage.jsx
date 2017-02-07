import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import Auth from '../../authenticate.js';
import Login from './Login.jsx';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      },
      loading: false
    };
    this.processLogin = this.processLogin.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }


  processLogin(e) {
    e.preventDefault();
    this.setState({loading: true});
    axios.post('/auth/login', {
      email: this.state.user.email,
      password: this.state.user.password
    }).then( (res) => {
      if(res.data.errors) {
        this.setState({errors: res.data.errors});
      } else {
        Auth.authenticateUser(res.data.oauth_key, res.data.json.refresh_token);
        sessionStorage.setItem('email', this.state.user.email);
        this.setState({errors: {}, loading: false});
        browserHistory.push('/');
      }
    }).catch( (err) => {
      console.log(err);
    });

  }

  updateUserState(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user});
  }

  render() {
    return(
      <Login onSubmit={this.processLogin} onChange={this.updateUserState}
        errors={this.state.errors} user={this.state.user} loading={this.state.loading}/>
    );
  }
}

export default LoginPage;
