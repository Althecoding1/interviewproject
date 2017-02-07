import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import LoadingButton from './LoadingButton.jsx';

const SignUp = ({ onSubmit, onChange, errors, user, loading }) => (

  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className='card-heading'>Sign Up</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <div className="field-line">
        <TextField floatingLabelText="Name" name="name"
          errorText={errors.name} onChange={onChange} value={user.name} />
      </div>
      <div className="field-line">
        <TextField floatingLabelText="Email" name="email"
          errorText={errors.email} onChange={onChange} value={user.email} />
      </div>
      <div className="field-line">
        <TextField floatingLabelText="Password" name="password"
          errorText={errors.password} onChange={onChange} value={user.password} />
      </div>
      <div className="field-line">
        <TextField floatingLabelText="Phone Number" name="phoneNumber"
          errorText={errors.phoneNumber} onChange={onChange} value={user.phoneNumber} />
      </div>
      {(loading) ? <LoadingButton /> :
        <div className="button-line">
          <RaisedButton type="submit" label="Create Synapse Account" primary/>
        </div>}
      <CardTitle><Link to={'/login'}>Log In</Link></CardTitle>
    </form>
  </Card>
);

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SignUp;
