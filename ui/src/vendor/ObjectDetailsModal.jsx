import {
  FormGroup,
  FormControl,
  Button,
  Modal,
  Label,
  Tabs,
  Tab,
  ControlLabel,
} from 'react-bootstrap';

import React, { Component } from 'react';
import faker from 'faker';
import './VendorSection.css';
import QR from 'qrcode.react';
import axios from 'axios';

class ObjectDetailsModal extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          object: {}
        }
    }

    urlRoot = '';
    // urlRoot = 'https://cc6c85a4.ngrok.io';
    urlRoot = 'https://iotize.herokuapp.com/';
    // urlRoot = 'http://localhost:8080';
  
    componentDidMount = () => {
      console.log(`Getting details for object: ${this.props.objectId}`);
      axios.get(`${this.urlRoot}/api/object/${this.props.objectId}`)
      .then(d => d.data)
      .then((foundObject) => {
        this.setState({
          loaded: true,
          object: foundObject,
        })
      })
      .catch(console.log);
    }

    render() {
      
      if (this.state.loaded) {
        return (
          <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
            <Modal.Header>
              Object #{this.props.objectId}
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey={1} id="object-tabs">
                <Tab eventKey={1} title="Object Data">
                  <form>
                    <FormGroup>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        value={this.state.object.name}
                        onChange={() => {}}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        placeholder="textarea"
                        value={this.state.object.details.description}
                        onChange={() => {}}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Alert</ControlLabel>
                      <FormControl
                        value={this.state.object.details.customAlert}
                        onChange={() => {}}
                      />
                    </FormGroup>
                  </form>                
                </Tab>
                <Tab eventKey={2} title="Scan History">
                </Tab>
                <Tab eventKey={3} title="Settings">
                </Tab>
                <Tab eventKey={4} title="QR Code">
                  <QR value={`${this.urlRoot}/u/viewproduct/${this.props.objectId}`}/>
                  {`${this.urlRoot}/u/viewproduct/${this.props.objectId}`}
                </Tab>
              </Tabs>
            </Modal.Body>
          </Modal>
        );
      } else {
        return (
          <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
          <Modal.Header>
            Loading...
          </Modal.Header>
          </Modal>
        );
      }
    }


}

export default ObjectDetailsModal;