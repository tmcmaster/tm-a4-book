import {html, LitElement, css} from 'lit-element';

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

        // document.onkeydown = () => {
        //     console.log('Key Press: ', window.event.keyCode);
        //     switch (window.event.keyCode) {
        //         case 37: this._prevPage(); break;
        //         case 38: this._prevPage(); break;
        //         case 39: this._nextPage(); break;
        //         case 40: this._nextPage(); break;
        //     }
        // };

        // setTimeout(() => {
        //     const slot = this.shadowRoot.querySelector('#slot');
        //     slot.addEventListener('slotchange', e => {
        //         console.log('light dom children changed!');
        //     });
        // }, 1000);

    }

    static get styles() {
        //language=CSS
        return [css`
            :host {
                display: flex;
                justify-content: center;
                box-sizing: border-box;
                background: lightgray;
                width:100vw;
                height:100vh;
                font-size: 2vh;
                border: solid green 2px;
            }
            tm-page-slider {
                display: inline-block;
                box-sizing: border-box;
                border: solid grey 2px;
                background: white;
            }

            @media only screen and (orientation: portrait) and (max-aspect-ratio: 10/14) {
                :host {
                    flex-direction: column;
                    border: solid red 2px;
                }
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14), only screen and (orientation: landscape) {
                :host {
                    flex-direction: row;
                    border: solid blue 2px;
                }
            }

            @media only screen and (orientation: portrait) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    border: solid blue 2px;
                    width: 100vw;
                    height: calc(100vw * 1.4);
                }
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    border: solid red 2px;
                    height: 99vh;
                    width: calc(100vh / 1.4);
                }
            }

            @media only screen and (orientation: landscape) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    border: solid green 2px;
                    height: 99vh;
                    width: calc(100vh / 1.4);
                }
            }
        `];
    }
    // noinspection JSUnusedGlobalSymbols
    render() {
        return html`
            <tm-page-slider id="aaa" hide-nav>
                <slot name="page"></slot>
<!--                <paper-slide><h3>Page One</h3></paper-slide>-->
<!--                <paper-slide><h3>Page Two</h3></paper-slide>-->
<!--                <paper-slide><h3>Page Three</h3></paper-slide>-->
<!--                <paper-slide><h3>Page Four</h3></paper-slide>-->
            </tm-page-slider>
    `;
    }

    _test(a,b,c) {
        console.log('Slot Changed:', a,b,c);
        let pages = this.shadowRoot.getElementById('slot').assignedNodes();
        console.log('Pages: ', pages);
        //this.shadowRoot.getElementById('aaa').append(pages[0]);
    }

    _nextPage() {
        console.log('Next Page');
        this.shadowRoot.getElementById('aaa').moveNext();
    }

    _prevPage() {
        console.log('Previous Page');
        this.shadowRoot.getElementById('aaa').movePrev();
    }
}

window.customElements.define('tm-a4-book', TmA4Book);
