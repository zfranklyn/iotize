
import React, { Component } from 'react';
import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  Panel,
} from 'react-bootstrap';
import './VendorSection.css';

class VendorSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      objects: [
        { name: 'PWG Bench Press 1', description: 'NA'},
        { name: 'PWG Bench Press 2', description: 'NA'},
        { name: 'PWG Bench Press 3', description: 'NA'},
        { name: 'PWG Bench Press 4', description: 'NA'},
      ],
      searchTerm: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  render() {
    return (
      <div className="vendor-section">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">The Internet of Everything</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit">Go</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>        
        <div className="object-grid">
          {this.state.objects.map(object => {
            return (
              <Panel className="object-tile">
                <h4>{object.name}</h4>
                <p>{object.description}</p>
              </Panel>
            );
          })}
        </div>
      </div>
    );
  }
}

export default VendorSection;
