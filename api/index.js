'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const apiRouter = require('./routes/apiRouter');
const uuid = require('uuid');

const db = require('./db/index');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use((req, res, next) => {
    const cookies = req.cookies;
    if (cookies && cookies.yhack) {
        // console.log(`Cookie already exists:`, cookies.yhack);
    } else {
        const randomHash = uuid();
        res.cookie('yhack', randomHash, { maxAge: 90000000000, httpOnly: false});
        // console.log(`Created cookie: ${randomHash}`);
    }
    next();
})

//routes
app.use('/api', apiRouter);

app.use('/', express.static(path.join(__dirname, '../ui/build')));
// Send index.html for any other requests
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

const PORT = process.env.PORT || 8080;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to database");
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
        
    });    
});

