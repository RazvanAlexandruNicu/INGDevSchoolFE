import { LitElement, html } from 'lit-element';

import './AppHeader.js';
import './AppContent.js';
import './AppFooter.js';


export class AppMain extends LitElement {
    static get properties() {
        return {
            year: { type: Number},
            title: { type: String},
        };
    }

    constructor() {
        super();
        this.year = 2020;
        this.title = "My app default title"
    }

    render() {
        return html`
            <app-header title=${this.title}></app-header>
            <app-content @year-changed=${this._onFormChange}></app-content>
            <app-footer year=${this.year}></app-footer>
        `;
    }
    _onFormChange(event) {
        const year = event.detail.year;
        const title = event.detail.title;
        if(year) {
            this.year = year;
        }
        if(title) {
            this.title = title;
        }
    }
}
