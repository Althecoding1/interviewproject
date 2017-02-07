import React, { Component } from 'react';
import render from 'react-dom';

import Documents from './AddDocuments.jsx';
import Navbar from './Navbar.jsx';

class DocumentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(
      <Navbar />
    );
  }
}

export default DocumentPage;
