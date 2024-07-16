    const express = require('express');
    const { User } = require('../Models'); // Adjust path as needed
    const router = express.Router();

    // Super Admin Dashboard Route
    router.get('/getusers', async (req, res) => {
        try {
            const users = await User.findAll(); 
            res.render('getusers', { users }); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    });

    module.exports = router;
