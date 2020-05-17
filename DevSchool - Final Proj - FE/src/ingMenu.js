import { LitElement, html, css } from 'lit-element';

import { sessionEstablish } from './storage.js';

export class ingMenu extends LitElement {
  static get properties() {
    return {
        content_value: {type: Number}
      };
  }

  static get styles() {
    return css`
        :host {
            font-weight:700;
            color:white;
        }
        
        ol {
            list-style-type:none;
        }
        li {
            padding:1rem;
            text-align:center;
            border:1px solid #001233;
            background: #023E7D;
            transition:0.1s all;
        }
        li:hover {
            background:#0466C8;;
        }

        hr {
            width: 100%;
            color:white;
            margin-bottom:2rem;
        }
    `;
  }

  constructor() {
    super();
    this.content_value = -9999;
  }
  

  render() {
    const contentBlock = this.getContent();
    return contentBlock;
  }

    getContent() {
        if(this.content_value != 0 && this.content_value != -1) {
            return html`
            <hr>
            <ol>
                <li @click="${this._optionSelected}" id="make_trans">Make transaction</li>
                <li @click="${this._optionSelected}" id="view_balance">View balance</li>
                <li @click="${this._optionSelected}" id="trans_history">See transaction history</li>
            </ol>`;
        } else
            return html``;
    }


    _optionSelected(event) {
        const option = event.target.id;
        switch(option) {
            case "make_trans":
                this.dispatchEvent(new CustomEvent('option-selected', { detail: 1 }));
                break;
            case "view_balance":
                this.dispatchEvent(new CustomEvent('option-selected', { detail: 2 }));
                break;
            case "trans_history":
                this.dispatchEvent(new CustomEvent('option-selected', { detail: 3 }));
                break;
        }
    }

}
window.customElements.define('ing-menu', ingMenu);
