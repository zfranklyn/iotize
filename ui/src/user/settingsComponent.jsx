import React, { Component } from 'react';
import {
    Modal,
} from 'react-bootstrap';

class SettingsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      if (this.props.accountCreated) {
          return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

        </Modal>
          );
      }
      else {
          return (
        <div>
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.accountCreated ? 'Settings' : 'Sign Up'}</Modal.Title>
                </Modal.Header>

            </Modal>
        </div>
          );
      }
  }
}

export default SettingsComponent;
