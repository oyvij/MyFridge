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
                res.status(409).json({ message: 'Home already exists.', success: false });
            } else {
                // Create a new Home with the AccountId extracted from the token
                await Home.create({ AccountId });
                res.status(201).json({ message: 'Home created.', success: true });
            }
        } catch (error) {
            console.error('Error creating home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
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
                res.json({ home, homeItems, message: "Found home", success: true });
            } else {
                res.status(404).json({ message: 'Home not found.', success: false });
            }
        } catch (error) {
            console.error('Error fetching home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
        }
    }));

    api.post('/add-item-by-ean', wrap(async (req, res) => {
        const { ean } = req.body;
        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.status(400).json({ message: 'Invalid EAN.', success: false });
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
                    res.status(409).json({ message: 'Item already exists in home.', success: false });
                } else {
                    await HomeItem.create({ HomeId: home.id, ItemId: item.id });
                    res.status(200).json({ message: 'Item added to home.', success: true });
                }
            } else {
                res.status(404).json({ message: 'Home not found.', success: false });
            }
        } catch (error) {
            console.error('Error adding item to home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
        }
    }));

    api.delete('/remove-item-by-ean', wrap(async (req, res) => {
        const { ean } = req.body;

        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.status(400).json({ message: 'Invalid EAN.', success: false });
                return;
            }

            const item = await Item.findOne({ where: { ean } });
            if (!item) {
                res.status(404).json({ message: 'Item not found.', success: false });
                return;
            }

            // Assuming a single home per account
            const home = await Home.findOne({ where: { AccountId: req.account.id } });
            if (!home) {
                res.status(404).json({ message: 'Home not found.', success: false });
                return;
            }

            // Check if the item exists in the home
            const existingHomeItem = await HomeItem.findOne({ where: { HomeId: home.id, ItemId: item.id } });
            if (!existingHomeItem) {
                res.status(404).json({ message: 'Item not found in home.', success: false });
                return;
            }

            // Remove the item from the home
            await HomeItem.destroy({ where: { id: existingHomeItem.id } });
            res.status(200).json({ message: 'Item removed from home.', success: true });

        } catch (error) {
            console.error('Error removing item from home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
        }
    }));


    // remove item from kitchen by id
    api.delete('/remove-item-by-id', wrap(async (req, res) => {
        const { id } = req.body;

        try {
            const homeItem = await HomeItem.findOne({ where: { id } });
            if (!homeItem) {
                res.status(404).json({ message: 'Item not found.', success: false });
                return;
            }

            // Assuming a single home per account
            const home = await Home.findOne({ where: { AccountId: req.account.id } });
            if (!home) {
                res.status(404).json({ message: 'Home not found.', success: false });
                return;
            }

            // Check if the item exists in the home
            const existingHomeItem = await HomeItem.findOne({ where: { HomeId: home.id, ItemId: homeItem.ItemId } });
            if (!existingHomeItem) {
                res.status(404).json({ message: 'Item not found in home.', success: false });
                return;
            }

            // Remove the item from the home
            await HomeItem.destroy({ where: { id } });
            res.status(200).json({ message: 'Item removed from home.', success: true });

        } catch (error) {
            console.error('Error removing item from home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
        }
    }));

    api.post('/check-item', wrap(async (req, res) => {
        const { ean } = req.body;

        try {
            if (ean.length !== 13 && ean.length !== 8) {
                res.status(400).json({ message: 'Invalid EAN.', success: false });
                return;
            }

            let item = await Item.findOne({ where: { ean } });

            if (!item || item.dataVersion !== config.dataVersion) {

                try {
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
                } catch (error) {
                    res.status(404).json({ message: 'Item not found.', success: false });
                    return;
                }
            }

            if (item) {
                // Assuming a single home per account
                const home = await Home.findOne({ where: { AccountId: req.account.id } });
                if (home) {
                    const homeItems = await HomeItem.findAll({
                        where: { HomeId: home.id }, // Assuming homeId is the correct column name
                        include: [{ model: Item }] // Ensure Item is associated in your model definitions
                    });
                    const homeItem = homeItems.find(homeItem => homeItem.ItemId === item.id);
                    let response = { message: '', exactMatchHomeItem: null, similarItems: [], currentItem: item, success: true };
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
                    if (response.similarItems.length > 0 && response.message === 'Item is not in home.') {
                        response.message = 'Item is not in home, but similar items were found.';
                    }
                    res.status(200).json(response);
                } else {
                    res.status(404).json({ message: 'Home not found.', success: false });
                }
            } else {
                res.status(404).json({ message: 'Item not found.', success: false });
            }
        } catch (error) {
            //console.error('Error checking item in home:', error);
            res.status(500).json({ message: 'Internal server error.', success: false });
        }
    }));


    return api;
};
