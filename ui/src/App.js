import React, { Component } from 'react';
import './App.css';
import viewProduct from './user/viewProduct';
import addProduct from './user/addProduct';
import VendorSection from './vendor/VendorSection';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            {/* <Route path="/" component={<div>Landing Page Placeholder</div>}/> */}
            <Route path="/u/viewproduct/:productId" component={viewProduct}/>
            {/* <Route path="/u/editProduct/:productId" component={<div>Edit Product</div>}/> */}
            {/* <Route path="/u/settings" component={<div>Settings</div>}/> */}
            <Route path="/u/addproduct" component={addProduct}/>
            <Route path="/" component={VendorSection}/>
          </div>
        </div>
      </Router>
    )
  }  
}

export default App;
