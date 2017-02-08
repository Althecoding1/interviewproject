import React, { Component } from 'react';
import render from 'react-dom';
import axios from 'axios';

import Documents from './AddDocuments.jsx';
import Auth from '../../authenticate.js';
import Webcam from 'react-webcam';

class DocumentsPres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entities: ['Not Known', 'Airport', 'Arts & Entertainment', 'Automotive', 'Banks & Financial Services', 'Bar', 'Book Store', 'Buisness Services', 'Religious Organization', 'Club', 'Community/Government', 'Concert Venue', 'Doctor', 'Event Planning/Event Services', 'Food/Grocery', 'Health/Medical/Pharmacy', 'Home Improvement', 'Hospital/Clinic', 'Hotel', 'Landmark', 'Lawyer', 'Library', 'Licensed Financial Representative', 'Local Business', 'Middle School', 'Movie Theater', 'Museum/Art Gallery', 'Outdoor Gear/Sporting Goods', 'Pet Services', 'Professional Services', 'Public Places', 'Real Estate', 'Restaurant/Cafe', 'School', 'Shopping/Retail', 'Spas/Beauty/Personal Care', 'Sports Venue', 'Sports/Recreation/Activities', 'Tours/Sightseeing', 'Train Station', 'Transportation', 'University', 'Aerospace/Defence', 'Automobiles and Parts', 'Bank/Financial Institution', 'Biotechnology', 'Cause', 'Chemicals', 'Community Organization', 'Company', 'Computers/Technology', 'Consulting/Business Services', 'Education', 'Elementary School', 'Energy/Utility', 'Engineering/Construction', 'Farming/Agriculture', 'Food/Beverages', 'Government Organization', 'Health/Beauty', 'Health/Medical/Pharmaceuticals', 'Industrials', 'Insurance Company', 'Internet/Software', 'Legal/Law', 'Media/News/Publishing', 'Mining/Materials', 'Non-Government Organization', 'Non-Profit Organization', 'Organization', 'Political Organization', 'Political Party', 'Preschool', 'Retail and Consumer Merchandise', 'Small Business', 'Telecommunication', 'Transport/Freight', 'Travel/Leisure'],
      documents: {
        name: '',
        email: Auth.getUserEmail(),
        phoneNumber: '',
        alias: '',
        entity: '',
        type: '',
        street: '',
        states: '',
        zipcode: '',
        country: '',
        dob: '',
        screenshot: ''
      },
    };

    this.processSubmit = this.processSubmit.bind(this);
    this.updateDocDataChange = this.updateDocDataChange.bind(this);
    this.updateDocDataClick = this.updateDocDataClick.bind(this);
    this.getScreenshot = this.getScreenShot.bind(this);
  }

  processSubmit(e) {
    e.preventDefault();
    console.log(this.state.documents);
    axios.post('/api/updateDocs', {
      documents: this.state.documents
    }).then( (res) => {
      console.log(res);
    })
  }

  updateDocDataChange(e) {
    const name = e.target.name;
    const documents = this.state.documents;
    documents[name] = e.target.value;
    this.setState({documents});
  }

  updateDocDataClick(e, time) {
    if(time) {
      const documents = this.state.documents;
      const dob = "dob";
      documents[dob] = time;
      this.setState({documents});
      return;
    }
    if(typeof e === 'number') {
      const documents = this.state.documents;
      const type = "type";
      let specify = this.state.entities[e];
      documents[type] = specify;
      this.setState({documents});
    } else {
        const documents = this.state.documents;
        const entity = "entity";
        let text = e.target.innerText;
        console.log(text);
        documents[entity] = text;
        this.setState({documents});
      }
  }

  getScreenShot(e) {
    console.log(e);
    let url = e.target.value;
  }

  render() {
    return(
      <Documents entities={this.state.entities} onSubmit={this.processSubmit}
        onChange={this.updateDocDataChange} onClick={this.updateDocDataClick}
        documents={this.state.documents} onUpdate={this.getScreenShot}
      />
    );
  }
}

export default DocumentsPres;
