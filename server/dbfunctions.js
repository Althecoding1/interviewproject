const db = require('./dbConnection.js');
const bcrypt = require('bcrypt');

module.exports = {

  storeUser: (payload, data, callback) => {
    module.exports.retrieveUser(payload, (rows) => {
      if(rows.length > 0) {
        let userExists = "User already exists in database";
        return callback(userExists, null);
      } else {
        bcrypt.hash(payload.password, 10, (err, hash) => {
          db.query("INSERT INTO Users (`user_id`, `name`, `password`, `email`) VALUES ('" + data.json._id + "', '" + payload.name + "', '" + hash + "', '" + payload.email + "');",(err, rows) => {
            if(err) {
              throw err;
            } else {
              let userCreated = JSON.stringify(rows);
              userCreated = JSON.parse(userCreated);
              userCreated = "New User Successfully Created " + userCreated;
              return callback(userCreated, data);
            }
          });
        })
      }
    })
  },

  retrieveUser: (data, callback) => {
    db.query("SELECT user_id, password FROM Users WHERE email='" + data.email + "';", (err, rows) => {
      if(err) {
        return callback([]);
      } else {
        rows = JSON.stringify(rows);
        rows = JSON.parse(rows);
        if(rows.length === 0) {
          return callback([]);
        }
        bcrypt.compare(data.password, rows[0].password).then( (res) => {
          if(res) {
            return callback(rows);
          } else {
            return callback([]);
          }
        })
      }
    });
  }

}
