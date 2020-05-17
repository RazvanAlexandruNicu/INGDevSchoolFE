import { LitElement, html, css } from 'lit-element';

import { sessionEstablish, read } from './storage.js';

export class ingTransaction extends LitElement {
    static get properties() {
        return {
            accountNo: {type: String},
            transactionInfo : { type:String},
            debited : {type: Boolean},
            showSelf : {type: Boolean}
        };
    }

    static get styles() {
        return css`
            :host {
                border:1px solid black;
                display:block;
                background:grey;
                color:white;
                font-weight:700;
                padding:1rem;
                margin-bottom:0.5rem;
            }

            p{
                margin-top:0px;
                margin-bottom:0.4rem;
                text-align:center;
            }
        `;
    }

    constructor() {
        super();
        this.accountNo = ""
        this.transactionInfo = "{}"
        this.debited = false;
        this.showSelf = false;
    }
  

    render() {
        const transaction = JSON.parse(this.transactionInfo);
        const date = new Date(transaction.miliseconds);
        this.debited = (transaction.sourceAccount == this.accountNo)
        if(this.showSelf == true)    
            return html`
                        ${this.debited == true ? html`(debited)` : html`(credited)`}
                        <p>
                            From = ${transaction.sourceAccount}
                        </p>
                        <p>
                            To = ${transaction.destinationAccount}
                        </p>
                        <p>
                            Amount = ${transaction.sum}$
                        </p>
                        <p>
                            Date = ${date.toLocaleString()}
                        </p>
                        `;
        else
            return html`
                        <p>
                            ${this.debited == true ? html`(debited)` : html`(credited)`}
                            ${date.toLocaleString()}
                            - Click to show
                        </p>
                        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('debited')) {
            switch (this.debited) {
              case true:
                this.style.backgroundColor = '#ff6f69';
                this.style.color = '#001233';
                break;
              case false:
                this.style.backgroundColor = '#88d8b0';
                this.style.color = '#001233';
                break;
            }
          }
    }

}
window.customElements.define('ing-transaction', ingTransaction);
