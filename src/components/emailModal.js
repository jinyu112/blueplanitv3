import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import emailService from './emailService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';



class EmailModal extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };
        this.emailService = new emailService();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
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
               email: 'aliguan726@gmail.com',
               location: located.results[0].formatted_address,
               total: totalCost,
           }

           this.emailService.sendEmail(data);
       });

    }

    render() {
      return (
          <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>

           <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
                <Button onClick={this.handleEmail}>Send Email</Button>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.closeModal}>Close</Button>
           </Modal.Footer>
         </Modal>
      );
    }
  }

export default EmailModal;
