import { version } from '../../package.json';
import { Router } from 'express';
import items from './items';
import accounts from './accounts';
import homes from './homes';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/items', items({ config, db }));
	api.use('/accounts', accounts({ config, db }));
	api.use('/homes', homes({ config, db }));

	return api;
}
