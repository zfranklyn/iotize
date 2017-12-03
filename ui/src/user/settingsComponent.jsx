import React, { Component } from 'react';
import {
    Modal,
    FormControl,
    ControlLabel,
    Button,
    FormGroup,
    Tabs,
    Tab,
} from 'react-bootstrap';
import faker from 'faker';
import { PrivacyPolicy } from './privacy.jsx';

class SettingsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loaded: false,
        userData: null,
    }
  }

  componentDidMount() {
    // fetch and update user data
    this.setState({
        loaded: true,
        userData: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            scanHistory: [
                {timestamp: Date(), 
                scanTarget: 3,
                location: `${faker.address.latitude()} ${faker.address.longitude()}`,
                },
                {timestamp: Date(), 
                    scanTarget: 3,
                    location: `${faker.address.latitude()} ${faker.address.longitude()}`,
                },
            ]
        }
    })
  }

  render() {
      // this.props.accountCreated
      if (true && this.state.loaded) {
          return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Tabs id="settings-tabs" defaultActiveKey={1}>
                <Tab eventKey={1} title="Your Data">
                    <FormGroup>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.userData.firstName}
                            placeholder="Enter First Name"
                            onChange={()=>{}}
                        />
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.userData.lastName}
                            placeholder="Enter Last Name"
                            onChange={()=>{}}
                        />
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.userData.email}
                            placeholder="Enter Email"
                            onChange={()=>{}}
                        />                    
                        </FormGroup>
                        <Button style={FIXEDBUTTON} bsStyle="primary" bsSize="large">Save Changes</Button>                    
                </Tab>
                <Tab eventKey={2} title="Scan History">
                    Scan History
                </Tab>
                <Tab eventKey={3} title="Privacy">
                    {PrivacyPolicy}
                </Tab>
            </Tabs>
            </Modal.Body>

        </Modal>
          );
      }
      else {
          return (
        <div>
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                <form>
                    <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter First Name"
                    />
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Last Name"
                    />
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Email"
                    />                    
                    </FormGroup>
                    <Button bsStyle="primary" bsSize="large">Create My Account</Button>
                </form>                    
                </Modal.Body>

            </Modal>
        </div>
          );
      }
  }
}

const FIXEDBUTTON = {
    position: 'center',
    // bottom: '10px',
    // texAtlign: 'center'
}

export default SettingsComponent;
