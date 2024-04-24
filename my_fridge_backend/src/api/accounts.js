'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifier = require('email-verify');
import { Account } from '../models';
import { Router } from 'express';

export default ({ config }) => {
    let api = Router();

    let wrap = fn => (...args) => fn(...args).catch(args[2]);

    // Utility function to generate a JWT
    const generateAccessToken = account => {
        return jwt.sign({ id: account.id, email: account.email }, config.secret, {
            expiresIn: '24h' // token will expire in 24 hours
        });
    };

    const generateRefreshToken = (account) => {
        return jwt.sign({ id: account.id, email: account.email }, config.refreshTokenSecret, {
            expiresIn: '7d'  // longer expiration for refresh token
        });
    };

    api.post('/register', wrap(async (req, res) => {
        const { email, password, password2 } = req.body;

        if (password !== password2) {
            res.status(400).json({ fail: "Passwords do not match.", status: false });
            return;
        }

        // Verify the email
        verifier.verify(email, async (err, info) => {
            if (err) {
                res.status(400).json({ fail: "Invalid email.", status: false });
                return;
            }
        })

        const account = await Account.findOne({ where: { email } });
        if (account) {
            res.status(409).json({ fail: "Account already exists.", status: false });
            return;
        }
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Insert the account into the database
        await Account.create({ email, password: hash });
        // Generate a token
        res.json({ success: "Account created.", status: true });
    }));

    api.post('/login', wrap(async (req, res) => {
        const { email, password } = req.body;
        // Get the account from the database
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            res.status(404).json({ fail: "Account not found.", status: false });
            return;
        }
        // Compare the password
        const match = await bcrypt.compare(password, account.password);
        if (match) {
            const accessToken = generateAccessToken(account);
            const refreshToken = generateRefreshToken(account);

            // Optionally save the refresh token in the database or a secure cache
            // e.g., await saveRefreshToken(account.id, refreshToken);

            // Send the tokens to the client
            res.json({
                accessToken,
                refreshToken,
                success: "Login successful."
            });
        } else {
            res.status(401).json({ fail: "Incorrect password.", status: false });
        }
    }));

    api.post('/refresh_token', async (req, res) => {
        const { refreshToken } = req.cookies;  // Assuming the refresh token is stored in cookies
        if (!refreshToken) return res.status(401).json({ fail: "No refresh token provided.", status: false });

        try {
            const payload = jwt.verify(refreshToken, config.refreshTokenSecret);
            const accountId = payload.id;  // Extract user ID or other identifiers from the payload
            // Optionally check against a stored value in the database to ensure the refresh token is still valid

            const newAccessToken = jwt.sign({ id: accountId }, config.accessTokenSecret, { expiresIn: '24h' });
            res.json({ accessToken: newAccessToken });
        } catch (err) {
            return res.status(403).json({ fail: "Invalid refresh token.", status: false });
        }
    });

    return api;
};


