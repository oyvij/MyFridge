import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import kassalClient from './clients/kassalClient';
import e from 'express';
require('dotenv').config();

let app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

config.kassalClient = kassalClient(process.env.KASSAL_API_KEY)

if (process.env.NODE_ENV === 'development') {
	config.databaseFileName = "main-dev.db3"
} else {
	config.databaseFileName = "main.db3"
}

console.log("NODE_ENV: ", process.env.NODE_ENV)

initializeDb(db => {

	app.use(middleware({ config, db }));

	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${process.env.PORT || config.port}`);
});

export default app;
