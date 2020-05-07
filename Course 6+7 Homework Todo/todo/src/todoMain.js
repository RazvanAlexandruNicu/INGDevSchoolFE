import { LitElement, html, css } from 'lit-element';
import { append, read, deleteEntry } from './storage.js';

import './todoForm.js';
import './todoList.js';

export class todoMain extends LitElement {
  static get properties() {
    return {
      tasks: { type: Object },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        background: #9fd8cb;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5rem;
        color: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        box-shadow: 4px 7px 36px 0px rgba(0, 0, 0, 0.75);
      }

      todo-form {
        border-bottom: 1px solid darkblue;
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
      <todo-form @form-submitted="${this._onFormChange}"></todo-form>
      <todo-list @item-deleted="${this._onItemDeleted}" value=${this.value}></todo-list>
    `;
  }

  _onFormChange(event) {
    const data = event.detail;
    append(data);
    this.tasks.push(data);
    this.value = JSON.stringify(this.tasks);
  }

  _onItemDeleted(event) {
    this.tasks = read();
    this.value = JSON.stringify(this.tasks);
  }
}
