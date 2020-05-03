import { LitElement, html, css } from 'lit-element';
import { append, read, deleteEntry } from './storage.js'

import "./InputForm.js"
import "./Listing.js"

export class AppMain extends LitElement {
    static get properties() {
        return {
            tasks: { type: Object},
            value: { type: String}
        };
    }

    static get styles() {
        return css`
            :host {
                background: dodgerblue;
                color:white;
                padding: 2rem;
                display: flex;
                flex-direction:column;  
            }
        `;
    }

    constructor() {
        super();
        this.tasks = read();
        this.value = JSON.stringify(this.tasks);
    }

    render() {
        return html`
            <input-form @form-submitted="${this._onFormChange}"></input-form>
            <listing-item value=${this.value}></listing-item>
        `;
    }

    _onFormChange(event) {
        const data = event.detail;
        append(data);
        this.tasks.push(data)
        this.value = JSON.stringify(this.tasks);
    }

}
