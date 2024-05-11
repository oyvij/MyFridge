import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';
import kassalClient from './clients/kassalClient';
const path = require('path');
require('dotenv').config();

let app = express();
app.server = http.createServer(app);

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

config.kassalClient = kassalClient(process.env.KASSAL_API_KEY)

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests to the root URL
app.get('/', (req, res) => {
    // Serve the index.html file from the build directory
    res.sendFile(path.join(__dirname, 'public', 'build', 'web', 'index.html'));
});

app.use('/api', api({ config }));
app.server.listen(process.env.PORT);
console.log(`Started on port ${process.env.PORT}`);