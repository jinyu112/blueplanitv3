import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class emailService extends Component {
  sendEmail(data) {
      return axios.post('http://localhost:4200/email', {
          message: data.message,
          email: data.email,
          location: data.location,
          total: data.total,
      }).then((response) => {
          console.log(response);
      })
  };
}

export default emailService;
