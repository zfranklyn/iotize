'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const apiRouter = require('./routes/apiRouter');
const uuid = require('uuid');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies || !cookies.yhack) {
        const randomHash = uuid();
        res.cookie('yhack', randomHash, { maxAge: 90000000000, httpOnly: false});
        console.log(`Created cookie: ${randomHash}`);
    } else {
        console.log(`Cookie already exists:`, cookies.yhack);
    }
    next();
})

//routes
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../ui/build')));

// Send index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

app.listen(8080, () => {
    console.log('Server listening on 8080');
});