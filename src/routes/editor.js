/**
 * @file editor.js
 * @description Man it's a hot one
 */

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('editor', {
        title: 'Nya | Editor',
        layout: 'layout-editor'
    });
});

router.get('/iframe', (req, res) => {
    res.render('editor-iframe', {});
});

module.exports = router;