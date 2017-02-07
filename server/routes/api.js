const express = require('express');
const validator = require('validator');
const Synapsepay = require('synapsepay');
const Clients = Synapsepay.Clients;
const Helpers = Synapsepay.Helpers;
const Users = Synapsepay.Users;
const dbQuery = require('../dbfunctions.js');
const synapseAPI = require('../synapseAPI.js');
const config = require('../config.js')

const Router = new express.Router();

const client = new Clients(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  false
);
let user;
let users;

Router.post('/updateDocs', (req, res) => {
  let date = req.body.documents.dob;
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  const docsPayload = {
    documents: [
      {
        alias: req.body.documents.alias,
        entity_type: req.body.documents.entity,
        entity_scope: req.body.documents.scope,
        day: day,
        month: month,
        year: year,
        address_street: req.body.documents.street,
        address_city: req.body.documents.city,
        address_subdivision: req.body.documents.state,
        address_postal_code: req.body.documents.zipcode,
        address_country_code: req.body.documents.country,
        virtual_docs: [{
          document_value: '777772222',
          document_type: 'SSN'
        }],
        physical_docs: [],
        social_docs: []
      }
    ]
  };
  synapseAPI.getUserObject(req.body.documents.email, (user) => {
    console.log(user);
    user.update(
      docsPayload,
      (err, userResponse) => {
        console.log(this.config);
        if(err) {
          console.log(err);
        } else {
          user = userResponse;
          console.log(user);
          res.send(user);
        }
      }
    )
  })

})

module.exports = Router;
