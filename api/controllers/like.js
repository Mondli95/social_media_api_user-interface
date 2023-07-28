import sql from 'mssql';
import { config } from '../connections.js';
import jwt from 'jsonwebtoken';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

export const getLikes = (req, res) => {
    pool.connect(error => {
        if (error) return res.status(500).json(error);

        const q = `SELECT UserId FROM dbo.likes
                WHERE PostId =${req.query.postId}`;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data.recordset.map(like => like.UserId));
        });
    });
}

export const addLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('User not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('User token not valid..!');

        pool.connect(error => {
            if (error) return res.status(500).json(error);

            const q = `INSERT INTO dbo.likes(UserId,PostId) 
                VALUES(${userInfo.id},${req.body.postId})`;

            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json('Post has been liked.');
            })
        });
    });
}

export const removeLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('User not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('User token not valid..!');

        pool.connect(error => {
            if (error) return res.status(500).json(error);

            const q = `DELETE FROM dbo.likes 
                    WHERE UserId=${userInfo.id} and PostId=${req.query.postId}`;

            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json('Post has been disliked.');
            })
        });
    });
}