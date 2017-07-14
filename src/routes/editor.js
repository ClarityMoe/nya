/**
 * @file nya
 * @description Man it's a hot one
 */

 const router = require('express').Router();

 router.get('/editor', (req, res, next) => {
     res.render('editor', {
         title: 'Nya | Editor'
     });
 });

 module.exports = router;