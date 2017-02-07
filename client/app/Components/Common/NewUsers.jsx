import React, { Component } from 'react';
import render from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

import Auth from '../../authenticate.js';
import SignUp from './SignUp.jsx';

class NewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
        phoneNumber: ''
      },
      loading: false
    };

    this.processSubmit = this.processSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  processSubmit(e) {

    e.preventDefault();
    this.setState({loading: true});
    axios.post('/auth/signup', {
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password,
      phoneNumber: this.state.user.phoneNumber
    }).then( (res) => {
      if(res.data.errors) {
        this.setState({errors: res.data.errors});
      } else {
        Auth.authenticateUser(res.data.oauth_key, res.data.json.refresh_token);
        this.setState({errors: {}, loading: false});
        browserHistory.push('/');
      }
    }).catch( (err) => {
      console.log(err);
    });

  }

  logOut(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user});
  }

  render() {
    return(
      <SignUp onSubmit={this.processSubmit} onChange={this.logOut}
        errors={this.state.errors} user={this.state.user} loading={this.state.loading}/>
    );
  }
}

export default NewUsers;
