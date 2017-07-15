const admin = require('firebase-admin');
const EventEmitter = require('eventemitter3');
const Logger = require('./logger.js');

class Firebase extends EventEmitter {
    constructor(account, worker) {
        super();

        if (!account) throw new Error('No account for Firebase specified');

        this.account = account;

        admin.initializeApp({
            credential: admin.credential.cert(account),
            databaseURL: 'https://awau-733cf.firebaseio.com/'
        });

        this.db = admin.database();

        this.worker = worker;
        this.logger = new Logger({ debug: false, prefix: ' FIREBASE ' }, worker);
    }

    get() {

    }
}

module.exports = Firebase;