/**
 * @file TabFolder.ts
 * @description used primarily for opening a tab
 * @author Capuccino
 */

import customElements from 'ui/customElements';

export interface TabItem extends HTMLElement {
    // The element to show in the tab header for this tab item
    tabContent: HTMLElement;

    // Close the tab, return false to reject the close
    close(): boolean;
}

class TabElement extends HTMLElement {
    static tag = 'nya-tab';

    tabItem: HTMLElement;

    activateTab() {
        this.tabItem.style.display = 'block';
        this.classList.add(TabFolder.classActive);
    }

    deactivateTab() {
        this.tabItem.style.display = 'none';
        this.classList.remove(TabFolder.classActive);
    }

    connectedCallback(): void {
        if (!this.tabItem) {
            return;
        }

        if ((<TabItem> this.tabItem).tabContent) {
            this.appendChild((<TabItem> this.tabItem).tabContent);
        } else {
            let label = this.tabItem.getAttribute(TabFolder.attributeLabel);
            if (!label) {
                label = this.tabItem.nodeName; // best we can do
            }

            const closable = this.tabItem.classList.contains(TabFolder.classClosable);

            const labelElement = document.createElement('a');
            labelElement.href = '#';
            labelElement.textContent = label;
            this.appendChild(labelElement);

            if (closable) {
                const close = document.createElement('span');
                this.classList.add('fa', 'fa-close');
                this.appendChild(close);
            }
        }

        // not active by default
        this.deactivateTab();
    }
}

customElements.define(TabElement.tag, TabElement);

export default class TabFolder extends HTMLElement {
    static tag = 'nya-tab-folder';
    static attributeLabel = 'nya-class-label';
    static classClosable = 'nya-tab-closable';
    static classActive = 'nya-tab-active';
    static classHeader = 'nya-tab-header';

    currentTab: TabElement;

    private addItem(element: HTMLElement) {
        const header = this.children[0];

        const tab = new TabElement();
        tab.tabItem = element;
        tab.addEventListener('click', e => {
            this.activateTab(tab);
        });
        header.appendChild(tab);

        // Make sure element is set to 100% height
        element.style.height = '100%';

        if (header.children.length == 1 || element.classList.contains(TabFolder.classActive)) {
            // First one or force active, activate it
            this.activateTab(tab);
        }
    }

    private activateTab(tab: TabElement) {
        if (this.currentTab) {
            this.currentTab.deactivateTab();
        }
        this.currentTab = tab;
        tab.activateTab();
    }

    activateItem(item: HTMLElement) {
        const header = this.querySelector(`.${TabFolder.classHeader}`);
        for (let i = 0; i < header.children.length; i++) {
            const tab = <TabElement> header.children[i];
            if (tab.tabItem === item) {
                this.activateTab(tab);
                return;
            }
        }
    }

    connectedCallback(): void {
        const header = document.createElement('ul');
        header.classList.add(TabFolder.classHeader);

        if (this.children.length > 0) {
            document.insertBefore(header, this.children[0]);
        } else {
            this.appendChild(header);
        }

        for (let i = 1; i < this.children.length; i++) {
            if (this.children[i] instanceof HTMLElement) {
                this.addItem(<HTMLElement> this.children[i]);
            }
        }

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i] instanceof HTMLElement) {
                        this.addItem(<HTMLElement> mutation.addedNodes[i]);
                    }
                }
            });
        });
        observer.observe(this, { childList: true });
    }
}

customElements.define(TabFolder.tag, TabFolder);
