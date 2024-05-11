import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';
import kassalClient from './clients/kassalClient';
import e from 'express';
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
app.use('/', express.static(path.join(__dirname, 'public', 'build', 'web')));

/* app.use('/flutter.js', express.static(path.join(__dirname, 'public', 'build', 'web', 'flutter.js')))

app.use('/flutter_service_worker.js', express.static(path.join(__dirname, 'public', 'build', 'web', 'flutter_service_worker.js')));

app.use('/main.dart.js', express.static(path.join(__dirname, 'public', 'build', 'web', 'main.dart.js')));

app.use('/main.dart.js.map', express.static(path.join(__dirname, 'public', 'build', 'web', 'main.dart.js.map')));

app.use('/favicon.png', express.static(path.join(__dirname, 'public', 'build', 'web', 'favicon.png')));


app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'build', 'web', 'favicon.ico')))

app.use('/manifest.json', express.static(path.join(__dirname, 'public', 'build', 'web', 'manifest.json'))) */

app.use('/icons', express.static(path.join(__dirname, 'public', 'build', 'web', 'icons')))


app.use('/api', api({ config }));
app.server.listen(process.env.PORT);
console.log(`Started on port ${process.env.PORT}`);