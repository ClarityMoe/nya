/**
 * @file index.js
 * @description Main file for the editor
 * @author noud02
 */

var app = angular.module('awauApp', ['ngMaterial', 'ngMdIcons']);
var ws = new WSConnection('test');
var editorFrame = document.getElementById('monaco-frame');
var editorWindow = null;
var editor = null;
var monaco = null;

editorFrame.onload = function() {
    editorWindow = editorFrame.contentWindow;
    editor = editorWindow.editor;
    monaco = editorWindow.monaco;
};

ws.ws.addEventListener('msg', function(msg) {
    switch(msg.t) {
    case 'GET_FILE_RES': {
        editor.setValue(msg.d.content);
        break;
    }
    default: {
        break;
    }
    }
});