/**
 * @file index.js
 * @description Main file for the editor
 * @author noud02
 */

var app = angular.module('awauApp', ['ngMaterial', 'ngMdIcons']);
var ws = new WSConnection("test");