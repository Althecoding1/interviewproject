const Synapsepay = require('synapsepay');
const Clients = Synapsepay.Clients;
const Helpers = Synapsepay.Helpers;
const Users = Synapsepay.Users;

const db = require('./dbfunctions.js');

const client = new Clients(
  'id-8cebd353-7269-489d-a7f8-85d35fef23bf',
  'secret-1b0ab167-3482-41db-b607-d9bd13c714af',
  false
);
let user;
let users;

module.exports = {

  getUsers: (req, res) => {
    let options = {
      page: '',
      per_page: '',
      query: ''
    };
    Users.get(
      client,
      options,
      function(err, usersResponse) {
        users = usersResponse;
      });
  },

  getUser: (data, callback) => {
    let client_id;
    let p = new Promise(function(resolve, reject) {
      db.retrieveUser(data, (rows) => {
        rows = JSON.stringify(rows);
        rows = JSON.parse(rows);
        if(rows.length === 0) {
          let error = "No user found or wrong password";
          return callback(error, null);
        }
        resolve(rows[0].user_id)
      })
    });
    p.then( (res) => {
      let options = {
        _id: res,
        fingerprint: '123456',
        ip_address: Helpers.getUserIP()
      };
      Users.get(
        client,
        options,
        function(errResp, userResponse) {
          callback(null, userResponse);
        });
    });
  },

  getUserObject: (email, callback) => {
    let p = new Promise(function(resolve, reject) {
      db.retrieveUserObject(email, (id) => {
        resolve(id);
      })
    });
    p.then( (res) => {
      let options = {
        _id: res,
        fingerprint: '123456',
        ip_address: Helpers.getUserIP()
      };
      Users.get(
        client,
        options,
        function(errResp, userResponse) {
          if(errResp) {
            console.log(errResp);
          } else {
            callback(userResponse);
          }
        }
      )
    });
  },

  newUser: (data, callback) => {
    let payload = {
      logins: [{
        email: data.email,
        password: data.password,
        read_only: false
      }],
      phone_numbers: [data.number],
      legal_names: [data.name],
      extra: {}
    }
    Users.create( client, "123456", Helpers.getUserIP(), payload,
    function(err, userResponse){
      if(err) {
        console.log(err);
      } else {
        db.storeUser(data, userResponse, (response, tokens) => {
          if(!tokens) {
            return callback(response);
          }
          return callback(tokens);
        });
        }
      }
    )
  }

  // updateUserDocuments: (data) => {
  //
  // }

}
