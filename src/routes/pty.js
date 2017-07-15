const cluster = require('cluster');
const router = require('express').Router();
const Docker = require('../docker/docker.js');
const pty = require('node-pty');
const docker = new Docker(cluster.worker);

const terms = {};
const logs = {};

/** @todo add authentication */
const user = {
    containerID: '7c0297ebd3a26b4ee54965a584585149bf7b76a717b9e03068c6d7f0faef1b0c' // replace with own test id for testing
};

router.post('/docker', (req, res) => {
    const containers = docker.containers;
    let container = null;
    for (const c of containers) {
        if (c.Id === user.containerID) container = c;
    }

    if (!container) {
        // create container here
        return;
    }

    switch (container.State) {
    case 'exited': {
        docker.start(container.Id).then((r) => res.json({ container: container, response: r }).status(200).end()).catch((err) => {
            console.error(err);
            res.json({ error: err }).status(500).end();
        });
        break;
    }

    case 'running': {
        res.json({ container: container }).status(200).end();
    }
    
    default: {
        break;
    }
    }
});

router.ws('/docker/:id', (ws, req) => {

    const term = terms[req.params.id] = pty.spawn('docker', ['attach', req.params.id], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.cwd(),
        env: process.env
    });

    term.on('data', (data) => {
        try {
            ws.send(data);
        } catch (e) {
        }
    });

    ws.on('message', (msg) => term.write(msg));

    ws.on('close', () => {
        term.kill();
        delete terms[req.params.id];
    });
});

module.exports = router;