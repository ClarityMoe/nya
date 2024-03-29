/**
 * @file Monaco.ts
 * @description Monaco abstraction
 * @author Capuccino
 */

import { Editor } from 'ui/Editor';
import customElements from 'ui/CustomElements';

export default class MonacoEditor extends Editor {
    static tag = 'monaco-editor';

    editor: monaco.editor.IStandaloneCodeEditor;

    openFile(filePath: string) {
        super.openFile(filePath);
        if (typeof monaco === 'undefined') {
            const amdRequire = require('monaco-editor/min/vs/loader.js').require;

            const basePath = path.resolve(path.join(electron.remote.app.getAppPath(),
                'node_modules/monaco-editor/min')).replace(/\\/g, '/').replace(/ /g, '%20');
            const baseUrl = ('/' === basePath.charAt(0) ? 'file://' : 'file:///') + basePath;
            amdRequire.config({
                baseUrl: baseUrl
            });

            // workaround monaco-css not understanding the environment
            (<any>self).module = undefined;

            // workaround monaco-typescript not understanding the environment
            (<any>self).process.browser = true;

            amdRequire(['vs/editor/editor.main'], () => this.createEditor(data));
        } else {
            this.createEditor(data);
        }
    }

        createEditor(contents: string) {
        if (this.editor) {
            this.editor.dispose();
        }
        
        let language: string;

        switch (path.extname(this.filePath)) {
            case '.js':
                language = 'javascript';
                break;
            case '.html':
                language = 'html';
                break;
            case '.css':
                language = 'css';
                break;
            case '.json':
                language = 'json';
                break;
            case '.ts':
                language = 'typescript';
                break;
            case '.md':
                language = 'markdown';
                break;
        }

        this.editor = monaco.editor.create(this, {
            value: contents,
            language: language,
            theme: 'vs-dark'
        });
    }

    connectedCallback(): void {
        this.style.height = '100%';
        this.style.width = '100%';
    }
}

