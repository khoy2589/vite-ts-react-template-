import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

// Import Router
// import APIRouter from './src/routes/api.v1.route'; // Uncomment if you have this file

dotenv.config();
const app = express();

// Set port
const port = process.env.APP_PORT ?? 2589;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views/index.html'));
});

// Use API Router
// app.use('/api/v1', APIRouter); // Uncomment if you have this file

// Start the server
app.listen(port, () => {
    console.log(`Express is Running on Port : ${port}`);
    console.log(`http://localhost:${port}`);
});