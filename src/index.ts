require('dotenv').config({ path: './config/.env' });

import express, { Application } from 'express';
import cors from "cors";
import { createServer } from 'node:http';
import bodyParser from 'body-parser';

import Socket from './services/socket.service';
import AppRouter from '@routes/app.routes';
import DatabaseService from './services/database.service';

const app: Application = express();
const server = createServer(app);
Socket.init(server);
console.log(Socket.getInstances())

// middleware
app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// database connection
const db = DatabaseService.getInstance();
db.connect("mentalhealt");


// routes
app.use('/api/v1', AppRouter)

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});