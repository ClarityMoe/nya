/**
 * @file editor.ts
 * @description used for basic monaco editor support
 * @author Capuccino
 * 
 */

 import customElements from './CustomElements';
 import * as path from 'path';

 export class EditorTab extends HTMLElement {
     static tag ='nya-editortab';

     editor: Editor;
     a: HTMLAnchorElement;

     connectedCallback() {
         /* creates an anchor */
         this.a = document.createElement('a');
         this.a.href="#";
         this.a.textContent = path.basename(this.editor.filePath);
         this.appendChild(this.a);

         /* this seems to create a span for the tabs */
         const span = document.createElement('span');
         span.classList.add('fa', 'fa-times-circle');
         span.addEventListener('click', (e: Event) => {
             e.stopPropagation();
             /*close tab event */
             const closeEvent = new CustomEvent('close-editor', {
                 detail : {
                     editor: this.editor
                 },
                    bubbles: true,
                    cancelable: true
             })
                this.editor.dispatchEvent(closeEvent);
         })
            this.appendChild(span);
     }
 }
    /* finally define the custom tags */
    customElements.define(EditorTab.tag, EditorTab);
export abstract class Editor extends HTMLElement {
    filePath: string;
    private __editorTab: EditorTab;

    openFile(filePath: string) {
        this.filePath = filePath;
    }

    get editorTab(): EditorTab {
        if (!this.__editorTab) {
            this.__editorTab = new EditorTab();
            this.__editorTab.editor = this;
        }
        return this.__editorTab;
    }
    set active(val: boolean) {
        if (val) {
            this.style.display ='block';
            this.editorTab.classList.add('active');
        } else {
            this.style.display = 'none';
            this.editorTab.classList.remove('active');
        }
    }
}