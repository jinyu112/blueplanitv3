import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class EmailModal extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    render() {
      return (
          <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
           <Modal.Header closeButton>
             <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <p>Hello</p>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.closeModal}>Close</Button>
           </Modal.Footer>
         </Modal>
      );
    }
  }

export default EmailModal;
