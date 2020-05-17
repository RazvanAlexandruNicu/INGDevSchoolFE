import { LitElement, html, css } from 'lit-element';

import { sessionEstablish, read } from './storage.js';

import './ingTransaction.js';

export class ingContent extends LitElement {
    static get properties() {
        return {
            content_value: {type: Number},
            account : { type:Object},
            accountString : { type: String},
            transactions : { type:Object},
            transactionsString : { type: String}
        };
    }

    static get styles() {
        return css`
            h1 {
                text-align:center;
            }
            :host {
            }

            form {
                text-align:center;
                margin:2rem;
            }
            
            form input {
                padding:0.4rem;
                color: #001233;
                font-weight: 700;
                border: 1px solid black;
            }

            #dest_acc {
                width: 15rem;
            }

            #sum_transf {
                margin-left:2rem;
                margin-right:2rem;
            }
            
            #send_button {
                transition: 0.5s all;
                background: #023E7D;
                color: white;
                font-weight:700;
                border:3px solid black;
            }

            #send_button:hover {
                background:#0466C8;
            }
            
            p {
                font-weight:700;
                text-align:center;
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
        this.accountString = "{}";
        this.account = null;
        this.transactions = null;
        this.transactionsString = "{}";
    }
  

    render() {
        console.log("RANDEZ");
        const contentBlock = this.getContent();
        return contentBlock;
    }

    getContent() {
        console.log(this.content_value);
        this.account = JSON.parse(this.accountString);
        this.transactions = JSON.parse(this.transactionsString);

        switch(this.content_value) {
            case 0:
                return html`
                <h1>Please enter your account number and PIN</h1>
                `;
            case 1:
                return html`
                <h1>Please choose an option below</h1>
                `;
            case 2:
                return html`
                <h1>Make a transaction</h1>
                <hr>
                <form @submit="${this._onTransactionSubmit}">
                    <input id="dest_acc" type="text" name="destinationAccount" placeholder="Destination account number">
                    <input id="sum_transf" type="number" min="1" name="sum" placeholder="Enter the sum">
                    <input id="send_button" type="submit" value="Send money">
                <form>
                `;
            case 3:
                if(this.account == null) {
                    return html``;
                }
                return html`
                <h1>View your ballance</h1>
                <hr>
                <p> Your account number is ${this.account.accountNumber} </p>
                <p> Your ballance is ${this.account.balance}$ </p>
                `;
            case 4:
                const accno = read()[0].accountNumber;
                return html`
                <h1>Transaction history</h1>
                <hr>
                <ol>
                    ${this.transactions.map(i=> html`<ing-transaction @click="${this.toggleShow}" accountNo=${accno} transactionInfo=${JSON.stringify(i)}> </ing-transaction>`)}
                </ol>
                `;
            case -1:
                return html`
                <h1>Error at login</h1>
                `;
        }
    }

    toggleShow(event) {
        if(event.target.showSelf == true)
            event.target.showSelf = false;
        else
            event.target.showSelf = true;
    }

    async _onTransactionSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        data.set('sourceAccount', read()[0].accountNumber);
        data.set('miliseconds', Date.now());
        const object = Object.fromEntries(data);
        console.log(object);
        const response = await this.makeTransaction(object);
        if(response.status == 201)
            this.dispatchEvent(new CustomEvent('message-sent', { detail: 1}));
        else
            this.dispatchEvent(new CustomEvent('message-sent', { detail: 0 }));
        console.log("===="+response.status);
    }

    async makeTransaction(object) {
        const response = await fetch('http://localhost:8081/transaction', {
          method: 'POST',
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object) // body data type must match "Content-Type" header
        });
        return response;
    }
}
window.customElements.define('ing-content', ingContent);
