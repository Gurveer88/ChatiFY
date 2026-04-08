import express from 'express';

const router = express.Router();

router.get('/send', (_, res) => {
    res.send("Send the message endpoint");
});

export default router;