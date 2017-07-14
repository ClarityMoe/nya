require.config({ paths: { 'vs': '/js/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            'function x() {',
            '\tconsole.log("Hello world!");',
            '}'
        ].join('\n'),
        theme: 'vs-dark',
        language: 'javascript'
    });
});