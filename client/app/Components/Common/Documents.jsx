import React, { Component } from 'react';
import { render } from 'react-dom';

class Documents extends Component {
  render() {
    return(
      <div>
        <row>
          <form>
            <div className="form-group">
              <label htmlFor="addPhoneNumber">Add Phone Number: </label>
              <input type="text" className="form-control" name="phonenumber" id="addPhoneNumber" placeholder="Phone Number"/>
            </div>
            <div className="form-group">
              <label htmlFor="alias">Alias: </label>
              <input type="text" className="form-control" name="alias" id="alias" placeholder="Alias"/>
            </div>
            <div className="form-group">
              <label htmlFor="entitytype">Entity Type: </label>
              <input type="text" className="form-control" name="entitytype" id="entitytype" placeholder="Entity Type"/>
            </div>
            <div className="form-group">
              <label htmlFor="entityscope">Entity Scope: </label>
              <input type="text" className="form-control" name="entityscope" id="entityscope" placeholder="Entity Scope"/>
            </div>
          </form>
        </row>
      </div>
    );
  }
}

export default Documents;
