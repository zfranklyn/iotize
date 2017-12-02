import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  Panel,
  Modal,
  Label,
  Tabs,
  Tab,
} from 'react-bootstrap';

import React, { Component } from 'react';
import faker from 'faker';
import './VendorSection.css';
import QR from 'qrcode.react';

class VendorSection extends Component {

  constructor(props) {
      super(props);
      this.state = {
        viewState: {
          loaded: false,
          showModal: false,
          modalId: null,
        },
        objects: [],
      }
  }

  componentDidMount() {
    this.setState({
      viewState: {
        loaded: true,
        showModal: false,
      },
      objects: generateStudies(25),
    })
  }

  handleClickObject = (e) => {
    const ViewState = this.state.viewState;
    this.setState({
      viewState: Object.assign({}, ViewState, {showModal: true, modalId: e}),
    });
  }

  handleCloseModal = () => {
    const ViewState = this.state.viewState;
    this.setState({
      viewState: Object.assign({}, ViewState, {showModal: false}),
    });
  }

  render() {

    if (this.state.viewState.loaded && this.state.objects) {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <span>Internet of Everything</span>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
          <div className="object-grid">
            {this.state.objects.map((obj, index) => {
              return (
                <Panel
                  key={index}
                  className="object-tile"
                  onClick={() => this.handleClickObject(obj.id)}
                >
                  <img src="../bench.jpeg" className="object-img"/>
                  <h4>{obj.name}</h4>
                  <p>
                    {obj.details.description.split(' ').splice(0,10).join(' ')}...
                  </p>
                  {
                    obj.actions.maintenance.statusBroken ? 
                    <Label bsStyle='warning'>Maintenance Required</Label>
                    : null
                  }
                  {
                    obj.comments ? 
                    <Label bsStyle='default'>{obj.comments.length} Comments</Label>
                    : null
                  }
                </Panel>
              );
            })}
          </div>
          <Modal show={this.state.viewState.showModal} onHide={this.handleCloseModal}>
            <Modal.Header>
              Object #N
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey={1} id="object-tabs">
                <Tab eventKey={1} title="Object Data">
                  <form>

                  </form>
                </Tab>
                <Tab eventKey={2} title="Scan History">
                </Tab>
                <Tab eventKey={3} title="Settings">
                </Tab>
                <Tab eventKey={4} title="QR Code">
                  <QR value={`https://2b432d53.ngrok.io/u/viewproduct/${this.state.viewState.modalId}`}/>
                  {`https://2b432d53.ngrok.io/u/viewproduct/${this.state.viewState.modalId}`}
                </Tab>
              </Tabs>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (<div>Loading</div>);
    }

  }

}

const generateStudies = (n) => {
  let objects = [];
  for (let m = 0; m < n; m++) {
    objects.push(
      {
        id: m,
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
    )
  }
  return objects;
}

export default VendorSection;