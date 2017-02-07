import React, { Component } from 'react';
import render from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Webcam from 'react-webcam';
import TextField from 'material-ui/TextField';

class LoadWebCam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: ''
    };
    this.takeScreenShot = this.takeScreenShot.bind(this);
  }

  takeScreenShot() {
    let newScreenshot = this.refs.webcam.getScreenshot();
    const documents = this.state.screenshot;
    this.setState({screenshot: newScreenshot});
  }

  render() {
    return(
      <div>
        <Webcam ref="webcam" audio={false}/>
          <div className="button-line">
            <RaisedButton type="button" label="Take a snapshot" onClick={this.takeScreenShot} primary/>
          </div>
      </div>
    );
  }
}

export default LoadWebCam;
