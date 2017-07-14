/**
 * @file editor.js
 * @description Man it's a hot one
 */

 const router = require('express').Router();

 router.get('/editor', (req, res) => {
     res.render('editor', {
         title: 'Nya | Editor',
         layout: 'layout-editor'
     });
 });

 module.exports = router;