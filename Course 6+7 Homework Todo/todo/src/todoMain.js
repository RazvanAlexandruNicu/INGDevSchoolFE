import { LitElement, html, css } from 'lit-element';
import { append, read, deleteEntry } from './storage.js';

import './todoForm.js';
import './todoList.js';

export class todoMain extends LitElement {
  static get properties() {
    return {
      tasks: { type: Object },
      value: { type: String },
      options: { type: Object },
      location: { type: Object },
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

      #address {
        background: darkblue;
        padding: 0.4em 1em 0.4em 1em;
      }
    `;
  }

  async fetchLocation(crd) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${crd.latitude}` +
        `&lon=${crd.longitude}&format=json`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  }

  async success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const location = await this.fetchLocation(crd);
    this.location = location;
    console.log(this.location);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  getMyPosition() {
    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, this.options);
  }

  constructor() {
    super();
    this.tasks = read();
    this.value = JSON.stringify(this.tasks);
    this.location = null;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    this.getMyPosition();
  }

  render() {
    return html`
      <span id="address">${this.location.display_name}</span>
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
