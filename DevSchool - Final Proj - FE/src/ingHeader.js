import { LitElement, html, css } from 'lit-element';

import { sessionEstablish, removeSession, read } from './storage.js';

export class ingHeader extends LitElement {
  static get properties() {
    return {
        logindisplay: { type: Boolean},
        message: {type:String},
        pos: { type: Boolean}
      };
  }

  static get styles() {
    return css`
    :host {
      display:flex;
      justify-content: space-between;
      padding:0.6rem;
    }
    form {
      float:right;
      margin:0px;
    }
    
    h1 {
      float:left;
      margin:0px;
      font-size:1.5rem;
      margin-left:2rem;
      color:white;
    }

    span {
      font-size:1rem;
      padding-top:0.5rem;
      font-weight:700;
      padding-left:0.4rem;
      padding-right:0.4rem;
    }
    #pininput {
      width:3rem;
      background: white;
      color: #001233;
      font-weight: 700;
      border: 1px solid black;
    }

    #accinput {
      width:15rem;
      background: white;
      color: #001233;
      font-weight: 700;
      border: 1px solid black;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #001233;
      opacity: 0.5; /* Firefox */
      font-weight: 700;
    }

    .formbutton {
      padding:0.5rem;
      margin-left:1rem;
      transition: 0.5s all;
      background: #023E7D;
      color: white;
      font-weight:700;
      border:3px solid black;
    }

    .formbutton:hover {
      background: #0466C8;
    }

    `;
  }

  constructor() {
    super();
    this.logindisplay = null;
    this.message = "";
    this.pos = true;
  }
  
  updated() {
    const storage = read();
    if(storage.length === 0) {
        console.log("NO SESSION in progress==");
        this.logindisplay = true;
        this.dispatchEvent(new CustomEvent('session-init', { detail: 0 }));
      }
      else {
        console.log("SESSION in progress===");
        this.logindisplay = false;
        this.dispatchEvent(new CustomEvent('session-init', { detail: 1 }));
      }
  }

  render() {
    const content = this.getContent();
    return content;
  }

  getContent() {
      
      if(this.message == "Transaction failed")
        this.pos = false;
      else
        this.pos = true;
      const color = this.pos ? "#88d8b0" : "#ff6f69";
      
      if(this.logindisplay) {
          return html`
            <h1> Online Banking App</h1>
            ${this.message.length != 0 ? html`<span style='background-color:${color}' id="message"> ${this.pos} ${this.message} </span>` : html``}
            <form id="loginform" @submit="${this._loginFormSubmitted}">
                <input id="accinput" type="text" name="accountNumber" placeholder="accountNumber">
                <input id="pininput" type="password" name="pin" placeholder="PIN">
                <input class="formbutton" type="submit" value="Login">
            </form>
          `;
      }
      else {
          return html`
            <h1> Online Banking App</h1>
            ${this.message.length != 0 ? html`<span style='background-color:${color}' id="message">${this.message} </span>` : html``}
            <form @submit="${this._logoutFormSubmitted}">
                <input class="formbutton" type="submit" value="Log out">
            </form>
          `;
      }
  }

  async loginUser(object) {
    const response = await fetch('http://localhost:8081/bankAccount/login', {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    return response;
  }


  async _loginFormSubmitted(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    data.set('balance', '0');
    const object = Object.fromEntries(data);
    const response = await this.loginUser(object);
    if(response.status === 200) {
        const resp_obj = await response.json();
        console.log(resp_obj);
        sessionEstablish(resp_obj);
        this.logindisplay = false;
        // dispatch event to parent to say that login has been realised
        this.dispatchEvent(new CustomEvent('form-submitted', { detail: 1 }));
    } else {
      this.logindisplay = true;
      // dispatch event to parent to say that login has failed
      this.dispatchEvent(new CustomEvent('form-submitted', { detail: -1 }));
    }
  }

  _logoutFormSubmitted(event) {
    event.preventDefault();
    removeSession();
    this.logindisplay = true;
    // dispatch event to parent to say that logout has been realised
    this.dispatchEvent(new CustomEvent('form-submitted', { detail: 0 }));
  }
}
window.customElements.define('ing-header', ingHeader);
