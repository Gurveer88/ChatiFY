import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from "path";
import { connectDb } from './lib/db.js';
import cookieparser from "cookie-parser";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(cookieparser());

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
// SO we will be connecting to the database before our server starts to listen. Cause if the database is not connected then what's the point of starting the server.
connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(`There is an error connecting to the MongoDB ${error}`);
    process.exit(1);
});
    
