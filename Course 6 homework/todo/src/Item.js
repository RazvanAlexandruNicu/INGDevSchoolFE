import { LitElement, html, css } from 'lit-element';

import "./Item.js"

class Item extends LitElement {
    render() {
        return html`
            ${this.name}
        `;
    }

    static get properties() {
        return {
            id: { type: String },
            name: { type: String}
        };
    }
}

window.customElements.define('custom-item', Item);