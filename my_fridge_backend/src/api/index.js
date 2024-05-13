import { Router } from 'express';
import items from './items';
import accounts from './accounts';
import homes from './homes';
import meals from './meals';

export default ({ config }) => {
	let api = Router();

	// mount the facets resource
	api.use('/items', items({ config }));
	api.use('/accounts', accounts({ config }));
	api.use('/homes', homes({ config }));
	api.use('/meals', meals({ config }));

	return api;
}
