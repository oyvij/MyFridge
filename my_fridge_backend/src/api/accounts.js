'use strict'
require('babel-polyfill');
const bcrypt = require('bcrypt');
const nanoId = require('nanoid');
const verifier = require('email-verify');

import { Router } from 'express';

export default ({ config, db }) => {
    let api = Router();

    let wrap = fn => (...args) => fn(...args).catch(args[2])

    api.post('/register', wrap(async (req, res) => {
        const { email, password, password2 } = req.body;

        if (password !== password2) {
            res.json({ message: "Passwords do not match." });
            return;
        }

        // Verify the email
        verifier.verify(email, (err, info) => {
            if (err) {
                res.json({ message: "Invalid email." });
                return;
            }
        });

        const account = await db.get("SELECT * FROM ACCOUNTS WHERE email = ?", email);
        if (account) {
            res.json({ message: "Account already exists." });
            return;
        }
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Insert the account into the database
        await db.run("INSERT INTO ACCOUNTS (email, password, nanoId) VALUES (?, ?, ?)", email, hash, nanoId.nanoid());
        res.json({ message: "Account created." });
    }));

    api.post('/login', wrap(async (req, res) => {
        const { email, password } = req.body;
        // Get the account from the database
        const account = await db.get("SELECT * FROM ACCOUNTS WHERE email = ?", email);
        // Check if the account exists
        if (account) {
            // Compare the password
            const match = await bcrypt.compare(password, account.password);
            if (match) {
                res.json({ accountTokenId: account.nanoId, message: "Login successful." });
            } else {
                res.json({ message: "Incorrect password." });
            }
        } else {
            res.json({ message: "Incorrect email." });
        }
    }));

    return api;
}