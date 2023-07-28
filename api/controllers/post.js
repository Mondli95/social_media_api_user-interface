import sql from 'mssql';
import { config } from '../connections.js';
import jwt from 'jsonwebtoken';
import moment from 'moment/moment.js';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('User not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('User token not valid..!');

        pool.connect(error => {
            if (error) return res.status(500).json(error);

            const q = `SELECT p.*, Name, Profile_Pic FROM dbo.posts AS p JOIN dbo.users AS u ON (u.Id = p.UserId)
            LEFT JOIN Relationships AS r ON (p.UserId = r.FollowedUserId) 
            WHERE r.FollowerUserId=${userInfo.id} OR p.UserId=${userInfo.id}
            ORDER BY p.Date_Created DESC`;

            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        });
    });
}

export const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('User not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('User token not valid..!');

        pool.connect(error => {
            if (error) return res.status(500).json(error);

            const q = `INSERT INTO dbo.posts(UserId,Description,Image,Date_Created) 
            VALUES(${userInfo.id},'${req.body.description}','${req.body.image}','${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}')`;

            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json('Post successfully created.');
            })
        });
    });
}