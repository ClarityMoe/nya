/**
 * @file Server
 * @author Capuccino
 */

 import * as express from 'express';
 import child_process = require('child_process');
 

 /* start off by creating an express app */
 const app = express();

 app.set('port', 8080);