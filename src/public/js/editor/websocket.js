var OPCODES = {
    HEARTBEAT: 1,
    IDENTIFY: 2,
    READY: 3,
    MESSAGE: 4,
    RESUME: 5,
    STATE_UPDATE: 6,
    STATUS_UPDATE: 7
};

function WSConnection(token) {
    if (!token) {
        throw new Error('No token provided');
    }
    this.conAttempts = 0;
    this.ws = null;
    this.token = token;
    this.hbInterval = null;
    this.hbTimeout = null;
    this.state = {
        connected: false,
        ready: false,
        heartbeat: -1
    };
    this.connect();
    
}

WSConnection.prototype.connect = function() {
    if (!this.ws) {
        this.ws = new WebSocket('ws://' + window.location.hostname + ':3000');
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }
};

WSConnection.prototype.close = function() {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
        this.ws.close(1000, 'Closing on user request');
        this.ws = null;
    }
};

WSConnection.prototype.reconnect = function () {
    if (this.ws && this.ws.readyState !== WebSocket.CONNECTING) {
        this.ws.close(4000, 'Reconnecting on user request');
        this.ws = null;
        this.connect();
        this.ws.dispatchEvent(new CustomEvent('reconnect'));
    }
};

WSConnection.prototype.onMessage = function (msg) {
    try {
        msg = JSON.parse(msg.data);
    } catch (e) {
        return console.warn('Couldn\'t parse message:', msg);
    }

    /* eslint-disable indent */

    switch (msg.op) {

        case OPCODES.HEARTBEAT: { // 1
            clearTimeout(this.hbTimeout);
            break;
        }

        case OPCODES.IDENTIFY: { // 2
            this.ws.send(JSON.stringify({
                op: OPCODES.IDENTIFY,
                d: {
                    token: this.token
                }
            }))
            break;
        }

        case OPCODES.READY: { // 3
            this.state.heartbeat = msg.d.heartbeat;
            this.state.ready = true;
            clearInterval(this.hbInterval);
            clearTimeout(this.hbTimeout);
            this.setHeartbeat(msg.d.heartbeat);
            break;
        }

        case OPCODES.MESSAGE: { // 4
            this.ws.dispatchEvent(new CustomEvent('msg', { msg: msg }))
            break;
        }

        default: {
            if (msg.op) {
                return console.warn('Unknown OP code:',  msg.op);
            } else {
                return console.error('Unknown message:', msg);
            }

        }
    }

    /* eslint-enable indent */
};

WSConnection.prototype.onError = function(err) {
    console.error(err);
    this.reconnect();
};

WSConnection.prototype.onOpen = function() {
    this.conAttempts = 1;
    this.state.connected = true;
    this.ws.onmessage = this.onMessage.bind(this);
};

WSConnection.prototype.onClose = function(code, num) {
    console.error(code, num);
    this.state.connected = false;
    this.state.ready = false;
    this.state.heartbeat = -1;
    clearInterval(this.hbInterval);
    setTimeout(function(){
        this.conAttempts++;
        this.ws = null;
        this.connect();
    }, ((Math.pow(2, this.conAttempts) - 1) * 1000) > 30000 ? 30000 : (Math.pow(2, this.conAttempts) - 1) * 1000);
};

WSConnection.prototype.send = function (event, msg) {
    this.ws.send(JSON.stringify({
        op: OPCODES.MESSAGE,
        d: msg,
        t: event
    }));
};

WSConnection.prototype.setHeartbeat = function(beat) {
    try {
        this.ws.send(JSON.stringify({
            op: OPCODES.HEARTBEAT
        }));
    } catch (e) {
    }

    this.hbInterval = setInterval(function() {
        try {
            this.ws.send(JSON.stringify({
                op: OPCODES.HEARTBEAT
            }));
            this.hbTimeout = setTimeout(function() {
                this.reconnect();
            }.bind(this), beat + 5000);
        } catch (e) {
            this.reconnect();
        }
    }.bind(this), beat);
};