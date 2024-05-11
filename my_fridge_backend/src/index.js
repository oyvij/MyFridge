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

// Define a function to recursively traverse directories and create routes
function createRoutes(dir, prefix = '/') {
    // Get the list of files and directories in the current directory
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Iterate over each entry
    entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);

        // If the entry is a directory, recursively create routes
        if (entry.isDirectory()) {
            const subPrefix = path.join(prefix, entry.name);
            createRoutes(fullPath, subPrefix);
        }
    });
}

// Root directory containing static files
const rootDir = path.join(__dirname, 'public', 'build', 'web');

// Create routes for all directories and files within the root directory
createRoutes(rootDir);

app.use('/api', api({ config }));
app.server.listen(process.env.PORT);
console.log(`Started on port ${process.env.PORT}`);