const express = require('express');
const validator = require('validator');
const dbQuery = require('../dbfunctions.js');
const synapseAPI = require('../synapseAPI.js');

const Router = new express.Router();

let user;

Router.post('/updateDocs', (req, res) => {

  const docsPayload = {
    documents: [
      {
        alias: req.body.alias,
        entity_type: req.body.entity,
        entity_scope: req.body.scope,
        day: req.body.date.day,
        month: req.body.date.month,
        year: req.body.date.year,
        address_street: req.body.street,
        address_city: req.body.city,
        address_subdivision: req.body.state,
        address_postal_code: req.body.zipcode,
        address_country_code: req.body.country,
        virtual_docs: [{
          document_value: req.body.value || null,
          document_type: req.body.type
        }],
        physical_docs: [
          {
            document_value: Helpers.urlToBase64('http://my.url.com'),
            document_type: 'GOVT_ID'
          },
          {
            document_value: Helpers.fileToBase64('/path/to/file'),
            document_type: 'SELFIE'
          }
        ],
        social_docs: [{
          document_value: 'https://www.facebook.com/sankaet',
          document_type: 'FACEBOOK'
        }]
      }
    ]
  };
  synapseAPI.updateUserDocuments(docsPayload)

})

module.exports = Router;
