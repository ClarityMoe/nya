/**
 * @file editor.js
 * @description Man it's a hot one
 */

 const router = require('express').Router();

 router.get('/', (req, res) => {
     res.render('editor', {
         title: 'Nya | Editor'
     });
 });

 module.exports = router;