import { LitElement, html, css } from 'lit-element';


class AppContent extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                padding:2rem;
                height:10rem;
            }
        `;
    } 
    render() {
        return html`
            <form @submit=${this._onSubmit}>
                <p>
                    <label> Please choose a year:
                        <input type="number" name="year" min="2020" max="2030">
                    </label>
                </p>
                <p>
                    <label> Please choose a title:
                        <input type="text" name="title">
                    </label>
                </p>
                <button> OK </button>
            </form>
        `;
    }

    _onSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd);
        this.dispatchEvent(new CustomEvent('year-changed', { detail: data}));
    }
}

window.customElements.define('app-content', AppContent);