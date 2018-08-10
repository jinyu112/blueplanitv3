import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ApiService extends Component {

  getData(term, latlon, city, date, string_date,search_radius_miles) {
      return axios.post('http://localhost:4200/api', {
          term: term,
          latlon: latlon,
          city: city,
          date: date,
          string_date: string_date,
          search_radius_miles: search_radius_miles, //make sure this is an integer
      })
      .catch(err => console.log(err));
  };
}

export default ApiService
