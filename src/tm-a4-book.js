import {html, LitElement, css} from 'lit-element';

//import '@wonkytech/tm-page-slider';

class TmA4Book extends LitElement {

    // noinspection JSUnusedGlobalSymbols
    static get properties() {
        return {}
    }

    constructor() {
        super();

        document.onkeydown = () => {
            //console.log('Key Press: ', window.event.keyCode);
            switch (window.event.keyCode) {
                case 37: this._prevPage(); break;
                case 38: this._prevPage(); break;
                case 39: this._nextPage(); break;
                case 40: this._nextPage(); break;
            }
        };
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
                //border: solid green 2px;
            }
            tm-page-slider {
                display: inline-block;
                box-sizing: border-box;
                //border: solid red 1px;
                background: white;
            }

            @media only screen and (orientation: portrait) and (max-aspect-ratio: 10/14) {
                :host {
                    flex-direction: column;
                    //border: solid red 2px;
                }
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14), only screen and (orientation: landscape) {
                :host {
                    flex-direction: row;
                    //border: solid blue 2px;
                }
            }

            @media only screen and (orientation: portrait) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    //border: solid blue 2px;
                    width: 100vw;
                    height: calc(100vw * 1.4);
                }
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    //border: solid red 2px;
                    height: 99vh;
                    width: calc(100vh / 1.4);
                }
            }

            @media only screen and (orientation: landscape) {
                /*noinspection CssUnusedSymbol*/
                tm-page-slider {
                    //border: solid green 2px;
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
            </tm-page-slider>
    `;
    }

    _nextPage() {
        const slider = this.shadowRoot.getElementById('aaa');
        if (slider.position < (slider.totalSlides -1)) {
            //console.log('Position/Total: ', slider.position, slider.totalSlides);
            this.shadowRoot.getElementById('aaa').moveNext();
        }
    }

    _prevPage() {
        const slider = this.shadowRoot.getElementById('aaa');
        if (slider.position > 0) {
            //console.log('Position/Total: ', slider.position, slider.totalSlides);
            this.shadowRoot.getElementById('aaa').movePrev();
        }
    }
}

window.customElements.define('tm-a4-book', TmA4Book);
