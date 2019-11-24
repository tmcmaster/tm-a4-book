import {html, css, LitElement} from 'lit-element';

class TmA4Page extends LitElement {

    // noinspection JSUnusedGlobalSymbols
    static get properties() {
        return {}
    }

    constructor() {
        super();
    }

    static get styles() {
        // language=CSS
        return css`
            :host {
                display: inline-block;
                display: inline-block;
                box-sizing: border-box;
                background: lightgray;
                //border: solid blue 2px;
                /*width: 100%;*/
                /*height: 100%;*/
                padding: 0 5px 0 5px;
            }

            @media only screen and (orientation: portrait) {
                :host {
                    padding: 0 1vw 0 1vw;
                }
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
                :host {
                    padding: 0 calc(1vh/1.4) 0 calc(1vh/1.4);
                }
            }

            @media only screen and (orientation: landscape) {
                :host {
                    padding: 0 calc(1vh/1.4) 0 calc(1vh/1.4);
                }
            }
            
            .body {
                display: inline-block;
                box-sizing: border-box;
                /border: solid red 2px;
                width: 100%;
                height: 100%;
                background: white;
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
            }
        `;
    }
    // noinspection JSUnusedGlobalSymbols
    render() {
        return html`
            <div class="body">
                <slot></slot>
            </div>
        `;
    }
}

window.customElements.define('tm-a4-page', TmA4Page);
