import {
  FormGroup,
  FormControl,
  Button,
  Modal,
  ControlLabel,
} from 'react-bootstrap';

import React, { Component } from 'react';
import QR from 'qrcode.react';
import axios from 'axios';

class NewObjectModal extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        object: {
          name: '',
          imageUrls: [],
          description: '',
          customAlert: '',
          maintenance: false,
          maintenanceMessage: '',
          purchaseEnabled: false,
          custom: [],
        }   
      };
    }

    urlRoot = 'https://cc6c85a4.ngrok.io';
    // urlRoot = '';
    // urlRoot = 'http://localhost:8080';

    handleChangeForm = (e) => {
      const object = this.state.object;
      object[e.target.name] = e.target.value;
      this.setState({
        object,
      });
    }

    toggleMaintenance = () => {
      const object = this.state.object;
      this.setState({
        object: Object.assign({}, object, {maintenance: !this.state.object.maintenance})
      });
    }

    togglePurchase = () => {
      const object = this.state.object;
      this.setState({
        object: Object.assign({}, object, {purchaseEnabled: !this.state.object.purchaseEnabled})
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`${this.urlRoot}/api/object`, {
        name: this.state.object.name,
        details: {
          imageURLs: [],
          description: this.state.object.description,
          customAlert: this.state.object.customAlert,
        },
        actions: {
          maintenance: {
            enabled: this.state.object.maintenance,
            statusBroken: false,
            maintenanceMessage: this.state.object.maintenanceMessage,
          },
          purchase: {
            enabled: this.state.object.purchaseEnabled,
          },
        }
      })
      .then((response) => {
        this.props.handleCloseModal();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });      
    }
  
    render() {
      
      return (
        <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
          <Modal.Header>
            Create New Object
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  value={this.state.object.name}
                  onChange={this.handleChangeForm}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  name="description"
                  componentClass="textarea"
                  placeholder="textarea"
                  value={this.state.object.description}
                  onChange={this.handleChangeForm}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Alert</ControlLabel>
                <FormControl
                  name="customAlert"
                  value={this.state.object.customAlert}
                  onChange={this.handleChangeForm}
                />
              </FormGroup>
              <FormGroup>
                <input type="checkbox" name="maintenance" onClick={this.toggleMaintenance}/>
                <label>Enable Maintenance Requests</label>
                {
                  this.state.object.maintenance ? 
                  <FormControl
                    name="maintenanceMessage"
                    value={this.state.object.maintenanceMessage}
                    onChange={this.handleChangeForm}
                  />
                  : null
                }
              </FormGroup>
              <FormGroup>
                <input type="checkbox" name="purchase" onClick={this.togglePurchase}/>
                <label>Enable Purchase Requests</label>
              </FormGroup>
              <Button type="submit" onClick={this.handleSubmit}>Create Object</Button>
            </form>                
          </Modal.Body>
        </Modal>
      );

    }


}

export default NewObjectModal;