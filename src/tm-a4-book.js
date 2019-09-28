import {html, LitElement} from 'lit-element';

class TmA4Book extends LitElement {

    // noinspection JSUnusedGlobalSymbols
    static get properties() {
        return {
            heading: {type: String}
        }
    }

    constructor() {
        super();
        this.heading = 'Hello World!';
    }

    // noinspection JSUnusedGlobalSymbols
    render() {
        return html`
      <style>
        :host {
          display: inline-block;
        }
        h2 {
            color: gray;
        }
      </style>
      <h2>${this.heading}</h2>
    `;
    }


}

window.customElements.define('tm-a4-book', TmA4Book);
