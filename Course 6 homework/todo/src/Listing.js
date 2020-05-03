import { LitElement, html, css } from 'lit-element';
import { read } from './storage.js'
import "./Item.js"

class Listing extends LitElement {
    static get styles() {
        return css`
            :host {
                background: green;
                color:white;
                padding: 2rem;
                display:flex;
                flex-direction:column;
            }
            custom-item {
                background-color:red;
                padding:0.5em;
                margin: 0.5em;

            }
        `;
    }
    static get properties() {
        return {
            tasks: { type: Object },
            value: { type: String}
        };
    }

    constructor() {
        super();
        this.tasks = read();
        this.value = JSON.stringify(this.tasks);
    }

    render() {
        const data = JSON.parse(this.value);
        console.log(data);

        return html`
           ${JSON.parse(this.value).map(i => html`<custom-item id=${i.id} name=${i.todo}></custom-item>`)}
        `;
    }


}

window.customElements.define('listing-item', Listing);