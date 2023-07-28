import sql from 'mssql';
import { config } from '../connections.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

export const getComments = (req, res) => {
    pool.connect(error => {
        if (error) return res.status(500).json(error);

        const q = `SELECT c.*, u.Id AS UserId, u.Name, u.Profile_Pic FROM dbo.comments AS c
                JOIN dbo.users AS u ON (u.Id = c.UserId)
                WHERE c.Post_Id =${req.query.postId}
                ORDER BY c.Date_Created DESC`;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    });

}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User Unauthorized!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if (error) return res.status(403).json("User is Unauthorized!");

        pool.connect(error => {
            if (error) return res.status(500).json(error);

            const q = `INSERT INTO dbo.comments(Description,Date_Created,UserId,Post_Id)
            VALUES('${req.body.description}','${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}', 
                    ${userInfo.id},${req.body.postId})`;

            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json('Comment Successfully Added.');
            })
        });
    });
}