import React, { Component } from 'react';
import {
    Panel,
} from 'react-bootstrap';

class AddProduct extends Component {

  render() {
    return (
        <Panel>
            <div className="comment">
                <h5>{this.props.name}</h5>
                <p>{this.props.comment}</p>
            </div>
        </Panel>
        
    );
  }
}

export default AddProduct;