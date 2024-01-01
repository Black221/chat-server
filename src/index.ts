import * as dotenv from "dotenv";
import express, { Request, Response , Application } from 'express';
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { JWTMiddleware } from "./middlewares/jwtMiddleware";

import { authRoutes, clientRoutes, delivererRoutes, commandRoutes, chatRoutes } from "./routes";

dotenv.config({ path: '../config/.env' });

let PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) {
    PORT = 3000;
} 


const app: Application = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
    }
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/deliverers', delivererRoutes);
app.use('/api/commands', commandRoutes);
app.use('/api/chats', chatRoutes);

app.use('/api/clients', JWTMiddleware, clientRoutes);
app.use('/api/deliverers', JWTMiddleware);
app.use('/api/commands', JWTMiddleware);
app.use('/api/chats', JWTMiddleware);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', ({id, text, time}) => {
        io.emit('message', {
            id,
            sender: socket.id,
            text,time
        })
    })
});

app.post('/auth', (req: Request, res: Response) => {
    res.send('Hello world!');
});


server.listen(4444, () => {
    console.log(`Listening on port ${4444}`);
});