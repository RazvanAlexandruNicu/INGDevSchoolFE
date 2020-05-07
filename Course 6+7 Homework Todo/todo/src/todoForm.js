import { LitElement, html, css } from 'lit-element';

class todoForm extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #d6e5e3;
        color: #517664;
        padding: 2rem;
      }

      button {
        padding: 1em;
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
      title: { type: String },
    };
  }

  render() {
    return html`
      <form @submit="${this._onSubmit}">
        <input name="todo" type="text" placeholder="Insert Todo activity" />
        <select name="type">
          <option> University </option>
          <option selected="selected"> Free time </option>
          <option> Hobbies </option>
        </select>
        <button>Add to TODO list</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    fd.set('id', Date.now());
    const data = Object.fromEntries(fd);
    this.dispatchEvent(new CustomEvent('form-submitted', { detail: data }));
  }
}

window.customElements.define('todo-form', todoForm);
