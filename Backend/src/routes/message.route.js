import express from 'express';

const router = express.Router();

router.get('/send', (req, res) => {
    res.send("Send the message endpoint");
});

export default router;