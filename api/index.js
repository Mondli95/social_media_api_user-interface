import express from "express";
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import commentsRoutes from './routes/comments.js';
import likesRoutes from './routes/likes.js';
import postsRoutes from './routes/posts.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from "multer";

const app = express();

//* MIDDLEWARES:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());

//TODO: NEED TO IMPLEMENT THE SHARE FUNCTIONALITY
//TODO: SHARE FUNCTIONALITY STARTS HERE ----
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../user-interface/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})
//TODO: SHARE FUNCTIONALITY ENDS HERE ----

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);

app.listen(8800, () => {
    console.log('API listening...');
})