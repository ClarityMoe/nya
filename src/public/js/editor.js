var editor;

require.config({ paths: { 'vs': '/js/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        theme: 'vs-dark',
        language: 'javascript'
    });

    window.onresize = function() {
        editor.layout();
    };

});