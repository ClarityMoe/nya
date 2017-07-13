/**
 *  @file index.js
 *  @description handles all routes to Express app.
 *  @author Capuccino
 */

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'App | Dashboard'
    });
});

module.exports = router;