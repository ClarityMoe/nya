/**
 * @file index.js
 * @description handles the Theia IDE loader schema.
 * @author Capuccino
 * @license MIT
 */

const { Container } = require('inverisfy');
const { FrontEndApplication, frontendApplicationModule, loggerFrontendModule } = require('theia-core/lib/application/browser');
const { messagingFrontendModule } = require('theia-core/lib/messaging/browser');

const container = new Container();

container.load(frontendApplicationModule);
container.load(messagingFrontendModule);
container.load(loggerFrontendModule);

function load(raw) {
    return Promise.resolve(raw.default).then(module => {
        container.load(module);
    });
}

function start() {
    const application = container.get(FrontEndApplication);
    application.start();
}

Promise.resolve()
    .then(function () { return require('theia-core/lib/application/browser/menu/browser-menu-module').then(load); })
    .then(function () { return require('theia-core/lib/application/browser/clipboard/browser-clipboard-module').then(load); })
    .then(function () { return require('theia-core/lib/filesystem/browser/filesystem-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/workspace/browser/workspace-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/preferences/browser/preference-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/navigator/browser/navigator-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/terminal/browser/terminal-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/editor/browser/editor-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/monaco/browser/monaco-browser-module').then(load); })
    .then(function () { return require('theia-core/lib/languages/browser/languages-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/java/browser/java-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/python/browser/python-frontend-module').then(load); })
    .then(function () { return require('theia-core/lib/cpp/browser/cpp-frontend-module').then(load); })
    .then(start);