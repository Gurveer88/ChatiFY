//Instead of defining the routes directly in the server.js file, we can create a separate file for authentication routes. This keeps our code organized and modular. In this example, we will create a file named auth.route.js in the routes directory.Instead of using app.get() to define our routes, we will use express.Router() to create a router instance. This allows us to define our routes in a more modular way and then export the router to be used in our main server file.
import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;
