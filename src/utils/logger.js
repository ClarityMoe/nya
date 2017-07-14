/**
 * @author noud02
 * @description Request logger
 * @file logger.js
 */

const Chalk = require('chalk').constructor;
const clk = new Chalk({ enabled: true });
const EventEmitter = require('eventemitter3');
const moment = require('moment');
const onFinished = require('on-finished');

class Logger extends EventEmitter {
    constructor(opt) {
        super();
        opt = opt || {};
        this.debug = opt.debug || false;
    }

    getStatusColor(s) {
        return s >= 500 ? clk.red.bold(s)
            : s >= 400 ? clk.yellow.bold(s)
                : s >= 300 ? clk.cyan.bold(s)
                    : s >= 200 ? clk.green.bold(s)
                        : clk.gray.italic(s);
    }

    request(req, res, next) {
        const log = () => {
            const date = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
            const ip = clk.blue.bold(`(${req.ip})`);
            const status = this.getStatusColor(res.statusCode);
            const method = clk.bold(req.method);
            const path = clk.magenta.bold(req.path);
            console.log(date, ip, status, method, path);
        };
        onFinished(res, log);
        next();
    }

    info() {
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        return console.info(time, clk.bgMagenta(' INFO '), Array.from(arguments).join(' '));
    }

    warn() {
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        return console.warn(time, clk.black.bgYellow(' WARN '), Array.from(arguments).join(' '));
    }

    error() {
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        return console.error(time, clk.bgRed(' ERROR '), Array.from(arguments).join(' '));
    }

    log() {
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        return console.log(time, Array.from(arguments).join(' '));
    }

    debug() {
        if (!this.debug) return;
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        return console.log(time, clk.black.bgWhite(' DEBUG '), Array.from(arguments).join(' '));
    }

    custom(opt) {
        if (!opt) throw new Error('No options specified');
        if (!opt.bgColor) opt.bgColor = 'black';
        if (!opt.color) opt.color = 'white';
        if (!clk[opt.color.toLocaleLowerCase()]) throw new Error('Invalid color');
        const time = clk.cyan.bold(`[${moment().format('L')} @ ${moment().format('HH:MM:SS')}]`);
        const bg = clk[`bg${opt.bgColor.toLocaleLowerCase().charAt(0).toLocaleUpperCase()}${opt.bgColor.toLocaleLowerCase().slice(1)}`];
        if (!bg) throw new Error('Invalid background color');
        const str = `${time} ${bg[opt.color.toLocaleLowerCase()](` ${opt.name} `)} ${Array.from(arguments).slice(1).join(' ')}`;
        return opt.error && console.error(str) || console.log(str);
    }

}

module.exports = Logger;