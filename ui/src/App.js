import React, { Component } from 'react';
import './App.css';
import {
  Grid,
  Row,
  Col,
  Image,
  Tabs,
  Tab,
  Button,
} from 'react-bootstrap';
import viewProduct from './viewProduct';
import addProduct from './addProduct'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import CommentComponent from './CommentComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="avaContainer">
            <Route path="/viewproduct/:productId" component={viewProduct}/>
            <Route path="/addproduct" component={addProduct}/>
          </div>
        </div>
      </Router>
    )
  }  
}

const testComponent = (
  <div>HelloWorld</div>
);

export default App;
