/**
 * @file index.js
 * @description Main file for the editor
 * @author noud02
 */

var app = angular.module('awauApp', ['ngMaterial', 'ngMdIcons']);
var ws = new WSConnection("test");

/**
 * Sends something to the websocket
 * 
 * @param {Object} j JSON Object to send
 */

function sendWS(j) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(j, null, 4))
    } else {
        throw new Error('WebSocket isn\'t open');
    }
}

setInterval(function() {
    
})

ws.onopen = function(e) {
    sendWS({
        msg: 'nya'
    });
};

ws.on