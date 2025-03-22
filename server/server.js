import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import personRouter from './routes/personroutes.js';
import path from 'path';

//create express app
const app = express();

//Middle Ware
app.use(cors());
app.use(express.json()); // parse json bodies

//setting up routes
app.use('/api/people', personRouter);

//server static files (uploads) for image access
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//MongoDB connection

mongoose.connect('mongodb://localhost:27017/badge')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error(`Error connecting to database:`, err)
    });


//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`)
});
