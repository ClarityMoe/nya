const WebSocketServer = require('uws').Server;
const SSHClient = require('ssh2').Client;
const OPCODES = require('./constants.js').OPCODES;
const Logger = require('./logger.js');
const util = require('util');
/* eslint-disable indent */
class WSServer {
    constructor(worker) {
        this.worker = worker;
        this.logger = new Logger({ debug: false, prefix: ' WEBSOCKET ' }, worker);
        this.SSHConnections = {};
        this.WSConnections = {};
        this.wss = new WebSocketServer({
            port: 3000
        });

        this.wss.on('connection', (ws) => this.onConnection(ws));
    }

    send(ws, event, data) {
        ws.send(JSON.stringify({
            op: OPCODES.MESSAGE,
            t: event,
            d: data
        }));
    }

    handleMessage(ws, msg) {
        switch (msg.t) {
            case 'CONNECT_SSH': {
                break;
            }
            case 'GET_DIR': {
                break;
            }
            case 'GET_FILE': {
                break;
            }
            case 'SAVE_FILE': {
                break;
            }
            case 'EXEC_SHELL': {
                break;
            }
            default: {
                this.logger.warn('Unknown event:', msg.t);
                break;
            }
        }
    }

    onMessage(ws, msg) {
        try {
            msg = JSON.parse(msg);
        } catch (e) {
            return this.logger.error('Couldn\'t parse message:', util.inspect(msg));
        }
        switch (msg.op) {

            case OPCODES.HEARTBEAT: { // 1
                break;
            }

            case OPCODES.IDENTIFY: { // 2
                break;
            }

            case OPCODES.READY: { // 3
                break;
            }

            case OPCODES.MESSAGE: { // 4
                this.handleMessage(ws, msg);
                break;
            }

            case OPCODES.RESUME: { // 5
                break;
            }

            case OPCODES.STATE_UPDATE: { // 6
                break;
            }

            case OPCODES.STATUS_UPDATE: { // 7
                break;
            }

            default: {
                if (msg.op) return this.logger.warn('Unknown OP code:', msg.op);
                else return this.logger.warn('Unknown message:', util.inspect(msg));
            }
        }
    }

    onConnection(ws) {

        ws.send(JSON.stringify({
            op: OPCODES.READY,
            d: {
                heartbeat: 1000
            }
        }))

        ws.on('message', (msg) => this.onMessage(ws, msg));
    }
}

module.exports = WSServer;