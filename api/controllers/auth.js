import sql from 'mssql';
import bcrypt from 'bcryptjs';
import { config } from '../connections.js';
import jwt from 'jsonwebtoken';

//* create a request object
const pool = new sql.ConnectionPool(config);
const db = new sql.Request(pool);

//* REGISTER
export const register = async (req, res) => {

    pool.connect(err => {
        if (err) console.log(err);

        const q = `SELECT * FROM dbo.users WHERE Username ='${req.body.username}'`;
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);

            //* CHECK IF REGISTERING USER ALREADY EXISTS
            if (data.recordset.length > 0) return res.status(409).json('User already exists!');

            //* IF NOT, CREATE A NEW USER - NOTE: Hash Password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const q = `INSERT INTO dbo.users(Username,Email,Password,Name) VALUES('${req.body.username}','${req.body.email}','${hashedPassword}','${req.body.name}')`;
            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(204).json('User created successfully.');
            });
        });
    });
}

//* LOGGING IN
export const login = (req, res) => {

    pool.connect(error => {
        if (error) return res.status(500).json('An Error Ocuured while processing the request!' + error)

        const q = `SELECT * FROM dbo.users WHERE Username ='${req.body.username}'`;
        db.query(q, (error, data) => {
            if (error) return res.status(500).json(error);
            if (data.recordset.lenght == 0) return res.status(404).json('User does not exist');

            const checkPassword = bcrypt.compareSync(req.body.password, data.recordset[0].Password);

            if (!checkPassword) return res.status(400).json('Invalid password or username!');

            const token = jwt.sign({ id: data.recordset[0].Id, name: data.recordset[0].Name }, 'secretkey');

            const { Password, ...others } = data.recordset[0];

            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json(others);
        });
    });
}

//* LOGGING OUT
export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none'
    }).status(200).json('User logged out.');
}