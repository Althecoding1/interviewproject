import React, { Component } from 'react';
import { Link } from 'react-router';
import { AppBar, Tabs, Tab } from 'material-ui';

import Documents from './DocumentsPres.jsx';

class Navbar extends Component {
  render() {
    return(
      <Tabs >
        <Tab label="Documents"><Documents /></Tab>
        <Tab label="Bank Account"></Tab>
        <Tab label="Transactions"></Tab>
      </Tabs>
    );
  }
}

export default Navbar;
