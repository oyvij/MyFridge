'use strict'
require('babel-polyfill');
const nanoId = require('nanoid');

import e, { Router } from 'express';

export default ({ config, db }) => {
    let api = Router();

    let wrap = fn => (...args) => fn(...args).catch(args[2])

    // create home for account
    api.post('/create', wrap(async (req, res) => {
        const { accountId } = req.body;
        const home = await db.get("SELECT * FROM HOMES WHERE account_id = ?", accountId);
        if (home) {
            res.json({ message: "Home already exists." });
            return;
        }
        await db.run("INSERT INTO HOMES (account_id, nanoId) VALUES (?, ?)", accountId, nanoId.nanoid());
        res.json({ message: "Home created." });
    }));

    // get home by account id
    api.get('/account-id/:accountId', wrap(async (req, res) => {
        const { accountId } = req.params;
        const home = await db.get("SELECT * FROM HOMES WHERE account_id = ?", accountId);
        if (home) {
            // get home_items in home
            const homeItems = await db.all("SELECT * FROM HOME_ITEMS WHERE home_id = ?", home.id);
            const items = await Promise.all(homeItems.map(async homeItem => {
                return await db.get("SELECT * FROM ITEMS WHERE id = ?", homeItem.item_id);
            }));
            // merge items with homeItems
            homeItems.forEach((homeItem, index) => {
                homeItem.item = items[index];
            });
            res.json({ home, homeItems });

        } else {
            res.json({ message: "Home not found." });
        }
    }));

    api.post('/add-item', wrap(async (req, res) => {
        const { ean, homeNanoId } = req.body;
        // verify barcode is valid 13 or 8 digits

        if (ean.length !== 13 && ean.length !== 8) {
            res.json({ message: "Invalid EAN." });
            return;
        }
        // verify ean
        if (!ean) {
            res.json({ message: "EAN is required." });
            return;
        }
        // verify home nano id
        if (!homeNanoId) {
            res.json({ message: "Home nano id is required." });
            return;
        }


        // get item from home
        let item = await db.get("SELECT * FROM ITEMS WHERE ean = ?", ean);

        // check if item already exists in home
        if (item) {
            const home = await db.get("SELECT * FROM HOMES WHERE nanoId = ?", homeNanoId);
            if (home) {
                const homeItem = await db.get("SELECT * FROM HOME_ITEMS WHERE home_id = ? AND item_id = ?", home.id, item.id);
                if (homeItem) {
                    res.json({ message: "Item already exists in home." });
                    return;
                }
            }
        }

        if (!item || item.dataVersion !== config.dataVersion) {
            // get item from kassal api
            const res = await config.kassalClient.get(`/api/v1/products/ean/${ean}`);
            const data = res && res.data && res.data.data || null;
            if (data && data.products && data.products.length > 0) {
                // add item to db
                const product = data.products[0];
                const categories = product.category.map(category => category.name).join(",");

                if (item && item.dataVersion !== config.dataVersion) {
                    // delete old item
                    await db.run("DELETE FROM ITEMS WHERE ean = ?", ean);
                }
                await db.run("INSERT INTO ITEMS (ean, name, image, external_id, brand, description, vendor, categories, dataVersion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", data.ean, product.name, product.image, product.id, product.brand, product.description, product.vendor, categories, config.dataVersion);
                item = await db.get("SELECT * FROM ITEMS WHERE ean = ?", ean);
            }
        }
        if (item) {
            // get home by nanoId
            const home = await db.get("SELECT * FROM HOMES WHERE nanoId = ?", homeNanoId);
            if (home) {
                // add item to home
                await db.run("INSERT INTO HOME_ITEMS (home_id, item_id) VALUES (?, ?)", home.id, item.id);
                res.json({ message: "Item added to home." });
            } else {
                res.json({ message: "Home not found." });
            }
        } else {
            res.json({ message: "Item not found." });
        }
    }));

    // remove item from home by ean and home nano id
    api.post('/remove-item', wrap(async (req, res) => {
        const { ean, homeNanoId } = req.body;
        // verify barcode is valid 13 or 8 digits
        if (ean.length !== 13 && ean.length !== 8) {
            res.json({ message: "Invalid EAN." });
            return;
        }
        // verify ean
        if (!ean) {
            res.json({ message: "EAN is required." });
            return;
        }
        // verify home nano id
        if (!homeNanoId) {
            res.json({ message: "Home nano id is required." });
            return;
        }
        // get item from home
        const item = await db.get("SELECT * FROM ITEMS WHERE ean = ?", ean);
        if (item) {
            // get home by nanoId
            const home = await db.get("SELECT * FROM HOMES WHERE nanoId = ?", homeNanoId);
            if (home) {
                // remove item from home
                await db.run("DELETE FROM HOME_ITEMS WHERE home_id = ? AND item_id = ?", home.id, item.id);
                res.json({ message: "Item removed from home." });
            } else {
                res.json({ message: "Home not found." });
            }
        } else {
            res.json({ message: "Item not found." });
        }
    }));

    // get check if item is in home by ean and home nano id
    api.post('/check-item', wrap(async (req, res) => {
        const { ean, homeNanoId } = req.body;
        // verify barcode is valid 13 or 8 digits
        if (ean.length !== 13 && ean.length !== 8) {
            res.json({ message: "Invalid EAN." });
            return;
        }
        // verify ean
        if (!ean) {
            res.json({ message: "EAN is required." });
            return;
        }
        // verify home nano id
        if (!homeNanoId) {
            res.json({ message: "Home nano id is required." });
            return;
        }
        // get item from home
        let item = await db.get("SELECT * FROM ITEMS WHERE ean = ?", ean);

        if (!item || item.dataVersion !== config.dataVersion) {
            // get item from kassal api
            const res = await config.kassalClient.get(`/api/v1/products/ean/${ean}`);
            const data = res && res.data && res.data.data || null;
            if (data && data.products && data.products.length > 0) {
                // add item to db
                const product = data.products[0];
                const categories = product.category.map(category => category.name).join(",");

                if (item && item.dataVersion !== config.dataVersion) {
                    // delete old item
                    await db.run("DELETE FROM ITEMS WHERE ean = ?", ean);
                }
                await db.run("INSERT INTO ITEMS (ean, name, image, external_id, brand, description, vendor, categories, dataVersion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", data.ean, product.name, product.image, product.id, product.brand, product.description, product.vendor, categories, config.dataVersion);
                item = await db.get("SELECT * FROM ITEMS WHERE ean = ?", ean);
            }
        }

        if (item) {
            // get home by nanoId
            const home = await db.get("SELECT * FROM HOMES WHERE nanoId = ?", homeNanoId);
            if (home) {
                // get all items in home
                const homeItems = await db.all("SELECT * FROM HOME_ITEMS WHERE home_id = ?", home.id);
                // check if item is in home
                const homeItem = homeItems.find(homeItem => homeItem.item_id === item.id);
                let response = { message: "", exactMatchHomeItem: null, similarItems: [], currentItem: null }
                if (homeItem) {
                    homeItem.item = item;
                    response.message = "Item is in home.";
                    response.exactMatchHomeItem = homeItem;
                } else {
                    response.message = "Item is not in home.";
                }


                // for each home item, get item and check if they have similar categories
                const items = await Promise.all(homeItems.map(async homeItem => {
                    return await db.get("SELECT * FROM ITEMS WHERE id = ?", homeItem.item_id);
                }));
                let similarItems = items.filter(homeItem => homeItem.categories.split(",").some(category => item.categories.split(",").includes(category)));
                response.similarItems = similarItems.filter(similarItem => similarItem.ean !== item.ean);

                if (response.similarItems.length > 0) {
                    response.message = "Item is not in home, but similar items where found.";
                }
                response.currentItem = item;
                res.json(response);

            } else {
                res.json({ message: "Home not found." });
            }
        } else {
            res.json({ message: "Item not found." });
        }
    }));

    return api;
}