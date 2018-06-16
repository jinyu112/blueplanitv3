import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class emailService extends Component {
  sendEmail(message) {
      return axios.post('http://localhost:4200/email', {
          message: message,
      })
      .catch(err => console.log(err));
  };
}

export default emailService;
