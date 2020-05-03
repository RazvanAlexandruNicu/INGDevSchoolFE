import { LitElement, html, css } from 'lit-element';


class InputForm extends LitElement {
    static get styles() {
        return css`
            :host {
                background: yellow;
                color:white;
                padding: 2rem;
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
                <input name="todo" type="text" placeholder="TODO activity">
                <button>Add to TODO list</button>
            </form>
        `;
    }

    _onSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        fd.set('id', Date.now());
        const data = Object.fromEntries(fd);
        this.dispatchEvent(new CustomEvent('form-submitted', { detail: data}));
    }
}

window.customElements.define('input-form', InputForm);