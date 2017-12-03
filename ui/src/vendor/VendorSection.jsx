import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  Panel,
  Label,
} from 'react-bootstrap';

import React, { Component } from 'react';
import './VendorSection.css';
import ObjectDetailsModal from './ObjectDetailsModal';
import NewObjectModal from './NewObjectModal';
import axios from 'axios';

class VendorSection extends Component {

  constructor(props) {
      super(props);
      this.state = {
        viewState: {
          loaded: false,
          showModal: false,
          showNewObjectModal: false,
          modalId: null,
        },
        objects: [],
      }
  }

  // urlRoot = 'https://cc6c85a4.ngrok.io';
  urlRoot = '';
  // urlRoot = 'http://localhost:8080';

  componentDidMount() {
    axios.get(`${this.urlRoot}/api/objects`)
    .then(d => d.data)
    .then((receivedObjects) => {
      console.log(receivedObjects);
      this.setState({
        viewState: {
          loaded: true,
          showModal: false,
          showNewObjectModal: false,
        },
        objects: receivedObjects,
      })
    })
    .catch(console.log);

  }

  handleClickObject = (e) => {
    const ViewState = this.state.viewState;
    ViewState.showModal = true;
    ViewState.modalId = e;
    this.setState({
      viewState: Object.assign({}, ViewState),
    });
  }

  handleCloseModal = () => {
    const ViewState = this.state.viewState;
    this.setState({
      viewState: Object.assign({}, ViewState, {showModal: false, showNewObjectModal: false, modalId: null}),
    });
  }

  handleOpenNewObjectModal = () => {
    const ViewState = this.state.viewState;
    this.setState({
      viewState: Object.assign({}, ViewState, {showNewObjectModal: true}),
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
              <Navbar.Form pullRight>
                <Button type="submit"
                  onClick={this.handleOpenNewObjectModal}
                >
                  Create Object
                </Button>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
          <div className="object-grid">
            {this.state.objects.map((obj, index) => {
              return (
                <Panel
                  key={index}
                  className="object-tile"
                  onClick={() => this.handleClickObject(obj._id)}
                >
                  {
                    obj.details.imageURLs.length ? 
                    <img src={obj.details.imageURLs[0]} className="object-img"/>
                    : null
                  }
                  
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
          {
            this.state.viewState.modalId ?
            <ObjectDetailsModal
              showModal={this.state.viewState.showModal}
              objectId={this.state.viewState.modalId}
              handleCloseModal={this.handleCloseModal}
            />
            : null
          }

          
          <NewObjectModal
            showModal={this.state.viewState.showNewObjectModal}
            handleCloseModal={this.handleCloseModal}
          />

        </div>
      );
    } else {
      return (<div>Loading</div>);
    }

  }

}

/*
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
          customAlert: '',
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
*/

export default VendorSection;
