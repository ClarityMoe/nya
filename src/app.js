/**
 * @file app.js
 * @description the file that links all express modules into one.
 * @author Capuccino
 */

// override to native promise
 global.Promise = require('bluebird');

 const express = require('express');
 const http = require('http');
 const app = express();

 app.use('/', require('./views/index'));
 