'use strict';
require('babel-polyfill');
const nanoId = require('nanoid');
import { Account, Home, Item, HomeItem } from '../models';
import { jwtAuth } from '../jwt';
import { Router } from 'express';

export default ({ config }) => {
    let api = Router().use(jwtAuth);

    let wrap = fn => (...args) => fn(...args).catch(args[2]);

    api.post('/create', wrap(async (req, res) => {
        const AccountId = req.account.id;  // Extract AccountId from token

        try {
            // Check if a Home already exists for the given AccountId
            const home = await Home.findOne({ where: { AccountId } });
            if (home) {
                res.json({ message: 'Home already exists.' });
            } else {
                // Create a new Home with the AccountId extracted from the token
                await Home.create({ AccountId });
                res.json({ message: 'Home created.' });
            }
        } catch (error) {
            console.error('Error creating home:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }));

    api.get('/', wrap(async (req, res) => {
        const AccountId = req.account.id;  // Extract AccountId from the JWT

        try {
            // Fetch the Home associated with the AccountId
            const home = await Home.findOne({ where: { AccountId } });
            if (home) {
                // If a home exists, fetch all related HomeItems and their corresponding Items
                let homeItems = await HomeItem.findAll({
                    where: { HomeId: home.id }, // Assuming homeId is the correct column name
                    include: [{ model: Item }] // Ensure Item is associated in your model definitions
                });
                res.json({ home, homeItems });
            } else {
                res.json({ message: 'Home not found.' });
            }
        } catch (error) {
            console.error('Error fetching home:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }));

    api.post('/add-item', wrap(async (req, res) => {
        const { ean } = req.body;
        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.json({ message: 'Invalid EAN.' });
                return;
            }

            let item = await Item.findOne({ where: { ean } });

            if (!item || item.dataVersion !== config.dataVersion) {
                const response = await config.kassalClient.get(`/api/v1/products/ean/${ean}`);
                const data = response && response.data && response.data.data || null;
                if (data && data.products && data.products.length > 0) {
                    const product = data.products[0];
                    let categories = ""
                    if (product.category && product.category.length > 0) {
                        categories = product.category.map(category => category.name).join(',');
                    }
                    if (item && item.dataVersion !== config.dataVersion) {
                        await Item.destroy({ where: { ean } });
                    }
                    item = await Item.create({
                        ean,
                        name: product.name,
                        image: product.image,
                        external_id: product.id,
                        brand: product.brand,
                        description: product.description,
                        vendor: product.vendor,
                        categories,
                        dataVersion: config.dataVersion
                    });
                }
            }

            // Assuming a single home per account
            const home = await Home.findOne({ where: { AccountId: req.account.id } });
            if (home && item) {
                const existingHomeItem = await HomeItem.findOne({ where: { HomeId: home.id, ItemId: item.id } });
                if (existingHomeItem) {
                    res.json({ message: 'Item already exists in home.' });
                } else {
                    await HomeItem.create({ HomeId: home.id, ItemId: item.id });
                    res.json({ message: 'Item added to home.' });
                }
            } else {
                res.json({ message: 'Home not found.' });
            }
        } catch (error) {
            console.error('Error adding item to home:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }));


    api.post('/remove-item', wrap(async (req, res) => {
        const { ean } = req.body;

        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.json({ message: 'Invalid EAN.' });
                return;
            }

            const item = await Item.findOne({ where: { ean } });
            if (!item) {
                res.json({ message: 'Item not found.' });
                return;
            }

            // Assuming a single home per account
            const home = await Home.findOne({ where: { AccountId: req.account.id } });
            if (!home) {
                res.json({ message: 'Home not found.' });
                return;
            }

            // Check if the item exists in the home
            const existingHomeItem = await HomeItem.findOne({ where: { HomeId: home.id, ItemId: item.id } });
            if (!existingHomeItem) {
                res.json({ message: 'Item not found in home.' });
                return;
            }

            // Remove the item from the home
            await HomeItem.destroy({ where: { id: existingHomeItem.id } });
            res.json({ message: 'Item removed from home.' });

        } catch (error) {
            console.error('Error removing item from home:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }));


    api.post('/check-item', wrap(async (req, res) => {
        const { ean } = req.body;

        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.json({ message: 'Invalid EAN.' });
                return;
            }

            let item = await Item.findOne({ where: { ean } });
            if (!item || item.dataVersion !== config.dataVersion) {
                const response = await config.kassalClient.get(`/api/v1/products/ean/${ean}`);
                const data = response && response.data && response.data.data || null;
                if (data && data.products && data.products.length > 0) {
                    const product = data.products[0];
                    const categories = product.category.map(category => category.name).join(',');
                    if (item && item.dataVersion !== config.dataVersion) {
                        await Item.destroy({ where: { ean } });
                    }
                    item = await Item.create({
                        ean,
                        name: product.name,
                        image: product.image,
                        external_id: product.id,
                        brand: product.brand,
                        description: product.description,
                        vendor: product.vendor,
                        categories,
                        dataVersion: config.dataVersion
                    });
                }
            }

            if (item) {
                // Assuming a single home per account
                const home = await Home.findOne({ where: { AccountId: req.account.id } });
                if (home) {
                    const homeItems = await HomeItem.findAll({ where: { HomeId: home.id } });
                    const homeItem = homeItems.find(homeItem => homeItem.ItemId === item.id);
                    let response = { message: '', exactMatchHomeItem: null, similarItems: [], currentItem: item };
                    if (homeItem) {
                        response.message = 'Item is in home.';
                        response.exactMatchHomeItem = homeItem;
                    } else {
                        response.message = 'Item is not in home.';
                    }
                    const items = await Promise.all(homeItems.map(async homeItem => {
                        return await Item.findOne({ where: { id: homeItem.ItemId } });
                    }));
                    let similarItems = items.filter(similarItem => similarItem.categories.split(',').some(category => item.categories.split(',').includes(category)));
                    response.similarItems = similarItems.filter(similarItem => similarItem.ean !== item.ean);
                    if (response.similarItems.length > 0) {
                        response.message = 'Item is not in home, but similar items were found.';
                    }
                    res.json(response);
                } else {
                    res.json({ message: 'Home not found.' });
                }
            } else {
                res.json({ message: 'Item not found.' });
            }
        } catch (error) {
            console.error('Error checking item in home:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }));


    return api;
};
