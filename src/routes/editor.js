/**
 *  @file editor.js
 * @description Handles the routing for IDE iframe/app.
 * @author Capuccino
 */

 const router = require('express').Router();

 router.get('/ide/editor', (req, res, next) => {
     res.render('editor', {
         title: 'App | Editor'
     });
 });