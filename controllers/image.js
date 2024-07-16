const express = require('express');
const router = express.Router();
const { User } = require('../Models');
const { Complain } = require('../Models')
const loggedin = require('../controllers/loggedin');
const { superAdmin } = require('./roleMiddleware');

router.get('/image', loggedin, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID
        const user = await User.findByPk(userId);

        if (user) {
            res.render('profile', { user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



module.exports = router;