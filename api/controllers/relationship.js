import sql from 'mssql';
import { config } from '../connections.js';
import jwt from 'jsonwebtoken';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

export const getRelationships = (req, res) => {
    pool.connect(error => {
        if (error) return res.status(500).json(error);

        const q = `SELECT * FROM dbo.relationships
            WHERE `;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}

export const addRelationship = (req, res) => {
    pool.connect(error => {
        if (error) res.status(500).json(error);

        const q = ``;
    });
}

export const removeRelationship = (req, res) => {
    pool.connect(error => {
        if (error) res.status(500).json(error);

        const q = ``;
    });
}