import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import LoadingButton from './LoadingButton.jsx';

const Login = ({onSubmit, onChange, errors, user, loading}) => (

  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className='card-heading'>Log In</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <div className="field-line">
        <TextField floatingLabelText="Email" name="email"
          errorText={errors.email} onChange={onChange} value={user.email} />
      </div>
      <div className="field-line">
        <TextField floatingLabelText="Password" name="password"
          errorText={errors.password} onChange={onChange} value={user.password} />
      </div>
        {(loading) ? <LoadingButton /> :
          <div className="button-line">
            <RaisedButton type="submit" label="Login To Account" primary  />
          </div>}
      <CardTitle><Link to={'/signup'}>Sign Up</Link></CardTitle>
    </form>
  </Card>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Login;
