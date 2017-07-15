/**
 * @file SplitPane.ts
 * @description Split plane implementation. For Split editor.
 * @author Capuccino
 */

import customElements from 'ui/customElements';

class Splitter extends HTMLElement {
    static tag = 'nya-splitter';

    dragging: boolean;
    startX: number;
    _move: any;
    _stop: any;

    getLeft() {
        return <HTMLElement> this.previousElementSibling;
    }

    getRight() {
        return <HTMLElement> this.nextElementSibling;
    }

    constructor() {
        super();

        this.dragging = false;

        this._move = this.move.bind(this);
        this._stop = (e:MouseEvent) => this.stopDragging(e);
    }

    move(e) {
        const widthLeft = e.pageX + this.startX - this.getLeft().offsetLeft;
        this.getLeft().style.width = `${widthLeft}px`;
        
        const widthRight = this.getRight().offsetLeft + this.getRight().offsetWidth - e.pageX - this.offsetWidth + this.startX;
        this.getRight().style.width = `${widthRight}px`;
    }

    startDragging(e: MouseEvent) {
        this.dragging = true;
        this.startX = e.offsetX;
        window.addEventListener('mouseup', this._stop);
        window.addEventListener('mousemove', this._move);
    }

    stopDragging(e: MouseEvent) {
        if (this.dragging) {
            window.removeEventListener('mousemove', this._move);
            window.removeEventListener('mouseup', this._stop);
            this.dragging = false;
        }
    }

    connectedCallback() {
        this.style.width = '0';
        this.style.padding = '1px';
        this.style.background = '#ccc';
        this.style.borderLeft = '3px';
        this.style.borderRight = '3px';
        this.style.borderStyle = 'solid';
        this.style.cursor = 'col-resize';

        if (this.nextElementSibling) {
            (<HTMLElement> this.nextElementSibling).style.flex = 'auto';
        }

        this.addEventListener('mousedown', this.startDragging);
    }
}

customElements.define(Splitter.tag, Splitter);

export default class SplitPane extends HTMLElement {
    static tag = 'nya-splitpane';

    connectedCallback() {
        this.style.display = 'flex';
        this.style.overflow = 'hidden';
        this.style.width = '100%';
        this.style.height = '100%';

        let kids = [];
        for (let i = 0; i < this.children.length; i++) {
            kids.push(this.children[i]);
        }

        for (let i = 1; i < kids.length; i++) {
            const splitter = new Splitter();
            this.insertBefore(splitter, kids[i]);
        }
    }
}

customElements.define(SplitPane.tag, SplitPane);