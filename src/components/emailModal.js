import React, { Component } from 'react';
import * from 'react-bootstrap';

class EmailModal extends Component {

    render() {
      return (
        <input className="block btn btn-sm btn-primary moreInfoButton" type="button" value="More Info" onClick={this.handleClick}/>
      );
    }
  }

export default EmailModal;
