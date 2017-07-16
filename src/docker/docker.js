const { execSync, execFileSync, spawnSync } = require('child_process');
const Logger = require('../utils/logger.js');

class Docker {
    constructor(worker) {

        if (process.platform === 'win32') throw new Error('You cant run this on windows');

        try {
            this._CURL_PATH = execSync('which curl').toString().trim();
        } catch (e) {
            throw new Error('Couldn\'t find cURL on your system, make sure to install cURL.');
        }

        this._CURL_VER = execSync(`${this._CURL_PATH} --version`).toString().trim().split(/\s+/)[1];

        try {
            this._DOCKER_PATH = execSync('which docker').toString().trim();
        } catch (e) {
            throw new Error('Couldn\'t find Docker on your system, make sure to install Docker.');
        }

        this._DOCKER_API_VER = execSync(`${this._DOCKER_PATH} version | grep "API version"`).toString().trim().split(/\s+/)[2];
        
        this.logger = new Logger({ debug: false, prefix: ' DOCKER ' }, worker);
        this.worker = worker;

        this.logger.info(`Docker API v${this._DOCKER_API_VER}`);
        this.logger.info(`cURL v${this._CURL_VER}`);
    }

    _get(path) {
        try {
            return execSync(`${this._CURL_PATH} --unix-socket /var/run/docker.sock "http://localhost/v${this._DOCKER_API_VER}${path}" 2>/dev/null`).toString();
        } catch (e) {
            throw e;
        }
    }

    _post(path, data) {
        try {
            return execSync(`${this._CURL_PATH} -XPOST --unix-socket /var/run/docker.sock -d '${data && JSON.stringify(data) || '{}'}' -H 'Content-Type: application/json' "http://localhost/v${this._DOCKER_API_VER}${path}" 2>/dev/null`);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get all docker containers
     * 
     * @readonly
     * @memberof Docker
     */

    get containers() {
        try {
            return JSON.parse(this._get('/containers/json?all=1'));
        } catch(e) {
            throw e;
        }
    }

    /**
     * Create a docker container
     * 
     * @todo this
     * @returns {Promise}
     * @memberof Docker
     */

    create() {
        return new Promise((resolve, reject) => {
            try {
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Start a docker container
     * 
     * @param {String} id 
     * @returns {Promise}
     * @memberof Docker
     */

    start(id) {
        return new Promise((resolve, reject) => {
            if (!id) return reject(new Error('Container ID not specified'));
            try {
                resolve(this._post(`/containers/${id}/start`, {}));
            } catch (e) {
                reject(e);
            }
        });
    }

}

module.exports = Docker;