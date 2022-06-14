import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';
import userRouter from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes    
app.use('/posts', postRouter);
app.use('/users', userRouter);


// Connect to MongoDB and start the server
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
    .catch(err => console.log(err.message));

