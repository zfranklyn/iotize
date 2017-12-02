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


class ObjectDetailsModal extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
        }
    }
  
    componentDidMount = () => {
      this.setState({
        loaded: true,
        object: {
          id: this.props.objectId,
          name: faker.lorem.words(3),
          details: {
            imageUrls: ['/bench.jpeg'],
            description: faker.lorem.paragraphs(2),
            customAlerts: []
          },
          actions: {
            maintenance: {
              enabled: true,
              statusBroken: faker.helpers.randomize([true, false]),
              maintenanceMessage: '',
            },
            purchase: {
              enabled: true,
            },
            custom: [],
          },
          comments: [
            {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
            {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
            {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
          ]
        }   
      })
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
                        value={this.state.object.description}
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
                  <QR value={`https://2b432d53.ngrok.io/u/viewproduct/${this.props.objectId}`}/>
                  {`https://2b432d53.ngrok.io/u/viewproduct/${this.props.objectId}`}
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