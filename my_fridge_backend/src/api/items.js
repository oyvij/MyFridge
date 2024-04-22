'use strict'
require('babel-polyfill');

import { Router } from 'express';

export default ({ config, db }) => {
	let api = Router();
	
	let wrap = fn => (...args) => fn(...args).catch(args[2])

	api.get('/', wrap(async (req, res) => {
		const items = await db.all("SELECT * FROM ITEMS");
		res.json(items);
	}));

	return api;
}