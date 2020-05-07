import { LitElement, html, css } from 'lit-element';
import { read, remove } from './storage.js';
import './todoItem.js';

class todoList extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #cacfd6;
        color: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
      }
      todo-item {
        color: #517664;
        padding: 0.5rem;
        margin: 0.5em;
        width: 70%;
        display: inline-block;
        border: 1px solid darkblue;
      }
      button {
        padding: 0.5rem 1rem 0.5rem 1rem;
        margin-left: 1em;
        transition: 0.3s all;
        color: #517664;
        border: 1px solid darkgreen;
        border-radius: 1em;
      }

      button:hover {
        background: #9fd8cb;
        color: #2d3319;
        border-radius: 2em;
      }
    `;
  }
  static get properties() {
    return {
      tasks: { type: Object },
      value: { type: String },
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
      ${JSON.parse(this.value).map(
        i => html`<p>
          <todo-item type=${i.type} content=${i.todo}></todo-item>
          <button @click=${this.deleteItem} name="${i.id}">Delete</button>
        </p>`
      )}
    `;
  }

  deleteItem(event) {
    const entryId = event.target.name;
    console.log(entryId);
    remove(entryId);
    this.dispatchEvent(new CustomEvent('item-deleted', { detail: this.tasks }));
  }
}

window.customElements.define('todo-list', todoList);
