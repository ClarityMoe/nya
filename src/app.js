/**
 * @file app.js
 * @description the file that links all express modules into one.
 * @author Capuccino
 */

// override to native promise
global.Promise = require("bluebird");

const port = 5000;
const favicon = require("serve-favicon");
const express = require("express");
const http = require("http");
const path = require('path');
const cluster = require("cluster");
const os = require('os');
const bodyParser = require("body-parser");
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} dieded :<\nCode: ${code}`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    const app = express();
    const server = http.createServer(app);

    server.on('listening', () => console.log(`Started listening on port ${server.address().port}`));

    server.on('error', (err) => {
        if (err.syscall !== 'listen') return console.error(err);

        switch (err.code) {
            case 'EACCES': {
                console.error(`Port ${server.address().port} is blocked on your network :<`);
                server.close();
                app.set('port', server.address().port + 1);
                server.listen(server.address().port + 1, "0.0.0.0");
                break;
            }
            case 'EADDRINUSE': {
                console.log(`Something is already using port ${port} :<`);
                server.close();
                app.set('port', server.address().port + 1);
                server.listen(server.address().port + 1, "0.0.0.0");
                break;
            }
            default: {
                console.error(err);
                break;
            }
        }
    });

    app.set('port', port);
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));
 
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    //app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.png'))); 

    /* routes */

    app.use('/', require('./routes/index.js'));

    /* end */
    server.listen(port, '0.0.0.0');
}
