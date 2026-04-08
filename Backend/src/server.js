import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from "path";
import { connectDb } from './lib/db.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Necessary for getting the info with req.body

const __dirname = path.resolve();

app.use('/api/auth', authRoutes);

app.use('/api/messages', messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.send(path.join(__dirname, "../frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});
