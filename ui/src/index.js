import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VendorSection from './vendor/VendorSection';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VendorSection />, document.getElementById('root'));
registerServiceWorker();
