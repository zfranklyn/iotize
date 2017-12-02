'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

//middleware
app.use(bodyParser());
app.use(cookieParser());

//routes
app.use('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server listening on 3000')
});