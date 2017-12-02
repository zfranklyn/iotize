import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VendorSection from './vendor/VendorSection';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

ReactDOM.render(<VendorSection />, document.getElementById('root'));
registerServiceWorker();
