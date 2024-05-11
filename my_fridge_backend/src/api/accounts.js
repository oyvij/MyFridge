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
            res.status(400).json({ message: "Passwords do not match.", success: false });
            return;
        }

        // Verify the email
        verifier.verify(email, async (err, info) => {
            if (err) {
                res.status(400).json({ message: "Invalid email.", success: false });
                return;
            }
        })

        const account = await Account.findOne({ where: { email } });
        if (account) {
            res.status(409).json({ message: "Account already exists.", success: false });
            return;
        }
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Insert the account into the database
        await Account.create({ email, password: hash });
        // Generate a token
        res.json({ message: "Account created.", success: true });
    }));

    api.post('/login', wrap(async (req, res) => {
        const { email, password } = req.body;
        // Get the account from the database
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            res.status(404).json({ message: "Account not found.", success: false });
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
                message: "Login successful.", success: true
            });
        } else {
            res.status(401).json({ message: "Incorrect password.", success: false });
        }
    }));

    api.post('/refresh-token', async (req, res) => {
        const { refreshToken } = req.body;  // Assuming the refresh token is stored in cookies
        if (!refreshToken) return res.status(401).json({ message: "No refresh token provided.", success: false });

        try {
            const payload = jwt.verify(refreshToken, config.refreshTokenSecret);
            const accountId = payload.id;  // Extract user ID or other identifiers from the payload
            // Optionally check against a stored value in the database to ensure the refresh token is still valid

            const newAccessToken = jwt.sign({ id: accountId }, config.accessTokenSecret, { expiresIn: '24h' });
            res.json({ accessToken: newAccessToken, success: true });
        } catch (err) {
            return res.status(403).json({ message: "Invalid refresh token.", success: false });
        }
    });

    api.post('/validate-token', async (req, res) => {
        const { accessToken } = req.body;
        if (!accessToken) return res.status(401).json({ message: "No access token provided.", success: false });

        try {
            const payload = jwt.verify(accessToken, config.secret);
            res.json({ message: "Token is valid.", success: true });
        } catch (err) {
            return res.status(403).json({ message: "Invalid access token.", success: false });
        }
    })

    return api;
};


