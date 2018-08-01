import React, { Component } from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import emailService from './emailService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class EmailModal extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            email: '',
        };
        this.emailService = new emailService();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }


    handleChange(e) {
        this.setState({ email: e.target.value });
    }

    handleEmail(e) {
        var geocoder = require('geocoder');
        e.preventDefault();
        var loc = this.props.location;
        var totalCost = this.props.totalCost;
        function getLocation() {
            return new Promise(function (resolve, reject) {
            geocoder.geocode(loc, function(err, lat_lon) {
                if (err) {
                  console.log(err);
                  reject(false);
                } else {
                  resolve(lat_lon);
                }
            });
          });
          }

       let locate = getLocation();
       locate.then((located) => {
           var data = {
               message: this.props.resultsArray,
               email: this.state.email,
               location: located.results[0].formatted_address,
               total: totalCost,
           }

            this.emailService.sendEmail(data).then((sent) => {
                if(sent.status == 200) {
                    alert('email sent');
                } else {
                    alert('email could not be sent');
                };
            });

       });


    }

    render() {
      return (
          <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>

           <Modal.Header closeButton>
               <Modal.Title>Send My Itinerary</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <FormControl
                   type="text"
                   value={this.state.email}
                   placeholder="Please enter your e-mail"
                   onChange={this.handleChange}
                />
            <Button className="btn btn-info" onClick={this.handleEmail}>Send Email</Button>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.closeModal}>Close</Button>
           </Modal.Footer>
         </Modal>
      );
    }
  }

export default EmailModal;
