/**
 * @file app.js
 * @description the file that links all express modules into one.
 * @author Capuccino
 */

// override to native promise

 global.Promise = require("bluebird");

const port = 3000;
const favicon = require("serve-favicon");
const express = require("express");
const onFinished = require("on-finished");
const moment = require("moment");
const http = require("http");
const path = require('path');
const cluster = require("cluster");
const Chalk = require('chalk').constructor;
const os = require('os');
const bodyParser = require("body-parser");
const clk = new Chalk({ enabled: true });
const numCPUs = os.cpus().length;

const rstat = (s) => {
    return s >= 500 ? clk.red.bold(s)
        : s >= 400 ? clk.yellow.bold(s)
            : s >= 300 ? clk.cyan.bold(s)
                : s >= 200 ? clk.green.bold(s)
                    : clk.gray.italic(s);
}

const log = (req, res, next) => {
    const logRequest = () => {
        const date = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`)
        const ip = clk.blue.bold(`(${req.ip})`);
        const status = rstat(res.statusCode || undefined);
        const method = clk.bold(req.method);
        const path = clk.magenta.bold(req.path);
        console.log(date, ip, status, method, path);

    }
    onFinished(res, logRequest);
    next();
}

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

    server.on('listening', () => console.log(`Started listening on port ${port}`));

    server.on('error', (err) => {
        if (err.syscall !== 'listen') return console.error(err);

        switch (err.code) {
            case 'EACCES': {
                console.error(`Port ${port} is blocked on your network :<`);
                process.exit();
                break;
            }
            case 'EADDRINUSE': {
                console.log(`Something is already using port ${port} :<`);
                process.exit();
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

    app.use(log);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.png'))); 

    /* routes */

    app.use('/', require('./routes/index.js'));

    /* end */
    server.listen(port, '0.0.0.0');
}
