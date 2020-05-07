import { LitElement, html, css, unsafeCSS } from 'lit-element';

class todoItem extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      content: { type: String },
    };
  }

  render() {
    return html`
      ${this.content}
      <span style="font-size:0.7em;">(${this.type})</span>
    `;
  }

  //   hashCode(str) {
  //     // java String#hashCode
  //     var hash = 0;
  //     for (var i = 0; i < str.length; i++) {
  //       hash = str.charCodeAt(i) + ((hash << 5) - hash);
  //     }
  //     return hash;
  //   }

  //   intToRGB(i) {
  //     var c = (i & 0x00ffffff).toString(16).toUpperCase();

  //     return '00000'.substring(0, 6 - c.length) + c;
  //   }

  updated(changedProperties) {
    // University - turquoise
    // Hobbies -  cherry
    // Free time - light orange

    if (changedProperties.has('type')) {
      switch (this.type) {
        case 'University':
          this.style.backgroundColor = '#3AAFB9';
          this.style.color = 'white';
          break;
        case 'Hobbies':
          this.style.backgroundColor = '#A60067';
          this.style.color = 'white';
          break;
        case 'Free time':
          this.style.backgroundColor = '#FFD29D';
          this.style.color = '#093A3E';
          break;
        default:
          this.style.backgroundColor = '#918450';
      }
    }

    // if (changedProperties.has('type')) {
    //   this.style.backgroundColor = '#' + this.intToRGB(this.hashCode(this.type));
    //   this.style.color = 'white';
    //   console.log(this.intToRGB(this.hashCode(this.type)));
    // }
  }
}

window.customElements.define('todo-item', todoItem);
