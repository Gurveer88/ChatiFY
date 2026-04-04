import express from 'express';
//Instead of defining the routes directly in the server.js file, we can create a separate file for authentication routes. This keeps our code organized and modular. In this example, we will create a file named auth.route.js in the routes directory.Instead of using app.get() to define our routes, we will use express.Router() to create a router instance. This allows us to define our routes in a more modular way and then export the router to be used in our main server file.
const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup endpoint');
});

router.get('/login', (req, res) => {
    res.send("login endpoint");
});

router.get('/logout', (req, res) => {
    res.send("logout endpoint");
});

export default router;
