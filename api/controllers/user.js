import sql from 'mssql';
import { config } from '../connections.js';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

export const getUser = (req, res) => {
    pool.connect(error => {
        if (error) return res.status(500).json(error);

        const userId = req.params.userId;
        const q = `SELECT * FROM dbo.users WHERE Id=${userId}`;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);

            const { Password, ...info } = data.recordset[0];
            return res.status(200).json(info)
        });
    })
}