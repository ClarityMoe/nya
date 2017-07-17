/**
 * @file index.js
 * @description Main file for the editor
 * @author noud02
 */

var app = angular.module('awauApp', ['ngMaterial', 'ngMdIcons']);
var ws = new WSConnection('test');
var editorFrame = document.getElementById('editor-frame');
var editorWindow = null;
var editor = null;
var monaco = null;
var dockerSock = null;
var dockerContainer = {};
var dockerHome = {};
var fileman = document.getElementById('file-man');
var terminal = document.getElementById('terminal');
var xterm = new Terminal({
    cursorBlink: true,
    cols: 160,
    rows: 20,
    scrollback: 1000
});

xterm.open(terminal);

window.addEventListener('DOMContentLoaded', function () {
    _resizeTerm();
});

function error(e) {
    /** @todo add notification */
    throw new Error(e);
}

function _connectTerm(id) {
    dockerSock = new WebSocket('ws://' + window.location.hostname + ':5000/pty/docker/' + id); // 7c0297ebd3a26b4ee54965a584585149bf7b76a717b9e03068c6d7f0faef1b0c
    dockerSock.onopen = function () {
        xterm.attach(dockerSock);
        xterm._initialized = true;
    };
}

function _resizeTerm() {

    var rows = document.querySelector('.xterm-rows').children;
    var row = rows[rows.length - 1];

    var x = Math.floor(terminal.offsetWidth / window.getComputedStyle(row).width / row.innerHTML.match(/<span.+>(.+)<\/span>/)[1].split(';').length); //FIXME: doesnt work, need a way to get font letter height and width
    var y = Math.floor(terminal.offsetHeight / window.getComputedStyle(row).height);
    xterm.resize(x, y);
    fetch('/pty/docker/' + dockerContainer.Id + '/resize', { method: 'POST', body: { cols: x, rows: y } });
}

function _initTerm() {
    if (typeof fetch === 'undefined') {
        error('Your browser doesn\'t support the Fetch API, please upgrade your browser or use a different one if you are on the latest version');
    }
    function doRequest() {
        fetch('/pty/docker', { method: 'POST' }).then(function (res) {
            res.json().then(function (json) {
                dockerContainer = json.container;
                console.log(json)
                dockerHome = json.fs;
                _connectTerm(json.container.Id);
            });
        });
        setInterval(function () {
            if (!dockerContainer.Id) {
                doRequest();
            } else if (!dockerSock || dockerSock.readyState === WebSocket.CLOSED) {
                doRequest();
                _connectTerm();
            } else {
                clearInterval(this)
            }
        }, 5000);
    }

    doRequest();
}

_initTerm();

window.addEventListener('resize', function (e) {
    _resizeTerm();
})

editorFrame.onload = function () {
    editorWindow = editorFrame.contentWindow;
    editor = editorWindow.editor;
    monaco = editorWindow.monaco;
};

app.controller('EditorCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $timeout) {

    $scope.toggleProjects = function () {
        $mdSidenav('project-nav').toggle();
    };

    $scope.toggleTasks = function () {
        $mdSidenav('task-nav').toggle();
    };

    $scope.closeProjects = function () {
        $mdSidenav('project-nav').close();
    };

    $scope.closeTasks = function () {
        $mdSidenav('task-nav').close();
    };
});

angular.module('resizer', []).directive('resizer', function ($document) {

    return function ($scope, $element, $attrs) {

        $element.on('mousedown', function (event) {
            event.preventDefault();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {

            if ($attrs.resizer == 'vertical') {
                // Handle vertical resizer
                var x = event.pageX;

                if ($attrs.resizerMax && x > $attrs.resizerMax) {
                    x = parseInt($attrs.resizerMax);
                }

                if ($attrs.resizerMax && x < $attrs.resizerMin) {
                    x = parseInt($attrs.resizerMin);
                }

                $element.css({
                    left: x + 'px'
                });

                document.getElementById($attrs.resizerLeft.substring(1)).style.width = x + 'px'
                document.getElementById($attrs.resizerRight.substring(1)).style.left = (x + parseInt($attrs.resizerWidth)) + 'px'

            } else {
                // Handle horizontal resizer
                var y = window.innerHeight - event.pageY;

                $element.css({
                    bottom: y + 'px'
                });

                document.getElementById($attrs.resizerTop.substring(1)).style.bottom = y + 'px'
                document.getElementById($attrs.resizerBottom.substring(1)).style.height = (y + parseInt($attrs.resizerHeight)) + 'px'
            }
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    };
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
        .accentPalette('grey');
});