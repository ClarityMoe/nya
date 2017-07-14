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

editorFrame.onload = function () {
    editorWindow = editorFrame.contentWindow;
    editor = editorWindow.editor;
    monaco = editorWindow.monaco;
};

ws.ws.addEventListener('msg', function (msg) {
    switch (msg.t) {
        case 'GET_FILE_RES': {
            editor.setValue(msg.d.content);
            break;
        }
        default: {
            break;
        }
    }
});

app.controller('EditorCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {

});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.definePalette('awauDark', {
        '50': 'e8e8e8',
        '100': 'c6c6c6',
        '200': 'a1a1a1',
        '300': '7b7b7b',
        '400': '5e5e5e',
        '500': '424242',
        '600': '3c3c3c',
        '700': '333333',
        '800': '2b2b2b',
        '900': '1d1d1d',
        'A100': 'f07878',
        'A200': 'eb4a4a',
        'A400': 'ff0303',
        'A700': 'e90000',
        'contrastDefaultColor': 'dark',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            'A100'
        ],
        'contrastLightColors': [
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A200',
            'A400',
            'A700'
        ]
    });

    $mdThemingProvider.definePalette('vscodeGrey', {
        '50': 'e5e5e5',
        '100': 'bebebe',
        '200': '929293',
        '300': '666667',
        '400': '464647',
        '500': '252526',
        '600': '212122',
        '700': '1b1b1c',
        '800': '161617',
        '900': '0d0d0d',
        'A100': 'eb6969',
        'A200': 'e53c3c',
        'A400': 'ee0000',
        'A700': 'd40000',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
          '50',
          '100',
          '200',
          'A100'
        ],
        'contrastLightColors': [
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
          'A200',
          'A400',
          'A700'
        ]
      });

    $mdThemingProvider.theme('default')
        .primaryPalette('vscodeGrey')
        .accentPalette('grey')
})