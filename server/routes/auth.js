const express = require('express');
const validator = require('validator');
const dbQuery = require('../dbfunctions.js');
const synapseAPI = require('../synapseAPI.js');

const Router = new express.Router();

let validateSignUp = (data) => {
  const errors = {};
  let valid = true;
  let message = '';

  if(!data || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
    valid = false;
    errors.email = "Incorret email address provided";
  }
  if(!data || typeof data.password !== 'string' || data.password.length < 5) {
    valid = false;
    errors.password = "Please provide a password with at least 5 characters";
  }
  if(!data || typeof data.name !== 'string' || data.name.trim().length === 0) {
    valid = false;
    errors.name = "Please provide a valid name";
  }
  if(!data || typeof data.phoneNumber !== 'string' || data.phoneNumber.trim().length !== 10) {
    valid = false;
    errors.phoneNumber = "Please provide a valid Phone Number";
  }
  if(!valid) {
    message = "Error with one or more fields";
  }
  return {success: valid, message, errors};
}

let validateLogIn = (data) => {
  const errors = {};
  let valid = true;
  let message = '';

  if(!data || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
    valid = false;
    errors.email = "Incorrect email address provided";
  }
  if(!data || typeof data.password !== 'string' || data.password.trim().length < 1) {
    valid = false;
    errors.password = "Please provide correct password";
  }
  if(!valid) {
    message = "Please check for form erros";
  }
  return {success: valid, message, errors};
}

Router.post('/signup', (req, res) => {
  const result = validateSignUp(req.body);
  if(!result.success) {
    return res.json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }
  synapseAPI.newUser(req.body, (user) => {
    if(typeof user === 'string') {
      return res.json({
        success: false,
        message: "Please check for form errors",
        errors: {email: user}
      });
    } else {
      return res.json(user);
    }
  });
});

Router.post('/login', (req, res) => {
  const result = validateLogIn(req.body);
  if(!result.success) {
    return res.json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }
  synapseAPI.getUser(req.body, (err, data) => {
    if(err) {
      return res.json({
        success: false,
        message: "Unable to find User with that Email Address",
        errors: {email: err}
      });
    }
    return res.json(data);
  })
});

module.exports = Router;
