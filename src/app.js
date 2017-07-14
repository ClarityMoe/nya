/**
 * @file app.js
 * @description the file that links all express modules into one.
 * @author Capuccino
 */

// override to native promise
global.Promise = require('bluebird');

const favicon = require('serve-favicon');
const express = require('express');
const http = require('http');
const path = require('path');
const cluster = require('cluster');
const os = require('os');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const numCPUs = os.cpus().length;
const Logger = require('./utils/logger.js');
const blocks = {};

hbs.registerHelper('extend', function(name, context) {
    let block = blocks[name];
    if (!block) block = blocks[name] = [];
    block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
    const val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
});

if (cluster.isMaster) {
    const logger = new Logger({ debug: false });
    
    logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code) => {
        logger.warn(`Worker ${worker.process.pid} dieded :<\nCode: ${code}`);
        cluster.fork();
    });
} else {
    const logger = new Logger({ debug: false }, cluster.worker);

    logger.info(`Worker ${process.pid} started`);

    let port = 5000;
    const app = express();
    const server = http.createServer(app);

    server.on('listening', () => logger.info(`Started listening on port ${port}`));

    server.on('error', (err) => {

        if (err.syscall === 'listen') return logger.error(err);

        switch (err.code) {
        case 'EACCES': {
            logger.warn(`Port ${port} is blocked on your network :<`);
            server.close();
            port++;
            app.set('port', port);
            server.listen(port, '0.0.0.0');
            break;
        }
        case 'EADDRINUSE': {
            logger.warn(`Something is already using port ${port} :<`);
            server.close();
            port++;
            app.set('port', port );
            server.listen(port, '0.0.0.0');
            break;
        }
        default: {
            logger.error(err);
            break;
        }
        }
    });

    app.set('port', port);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use((req, res, next) => logger.request(req, res, next));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.png'))); 

    /* routes */

    app.use('/', require('./routes/index.js'));
    app.use('/editor', require('./routes/editor.js'));

    /* end */
    server.listen(port, '0.0.0.0');
}
