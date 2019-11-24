import {html, LitElement, css} from 'lit-element';

// import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class TmA4Book extends LitElement {

    // noinspection JSUnusedGlobalSymbols
    static get properties() {
        return {
            position: {type: Number, value: 0, notify: true, reflectToAttribute: true, observer: '_animateCSS'},
            sensitivity: {type: String, value: 'default', notify: true},
            totalSlides: {type: Number, notify: true, reflectToAttribute: true, observer: '_animateCSS'}
        }
    }

    constructor() {
        super();
        document.onkeydown = () => {
            //console.log('Key Press: ', window.event.keyCode);
            switch (window.event.keyCode) {
                case 37: this.movePrev(); break;
                case 38: this.movePrev(); break;
                case 39: this.moveNext(); break;
                case 40: this.moveNext(); break;
                case 13: this.moveNext(); break;
                case 32: this.moveNext(); break;
            }
        };
        this.position = 0;
        this.totalSlides = 5;
        setTimeout(() => this._animateCSS(), 1000);

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
            .slider {
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
                .slider {
                    //border: solid blue 2px;
                    width: 100vw;
                    height: calc(100vw * 1.4);
                }

                /*.slider__slides ::slotted(*) {*/
                /*    padding:1vw;*/
                /*}*/
            }

            @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
                /*noinspection CssUnusedSymbol*/
                .slider {
                    //border: solid red 2px;
                    height: 100vh;
                    width: calc(100vh / 1.4);
                }
                /*.slider__slides ::slotted(*) {*/
                /*    padding:calc(1vh/1.4);*/
                /*}*/
            }

            @media only screen and (orientation: landscape) {
                /*noinspection CssUnusedSymbol*/
                .slider {
                    //border: solid green 2px;
                    height: 100vh;
                    width: calc(100vh / 1.4);
                }
                /*.slider__slides ::slotted(*) {*/
                /*    padding:calc(1vh/1.4);*/
                /*}*/
            }

            /*noinspection ALL*/
            .slider {
                //height: 100%;
                box-sizing: border-box;
            //border: solid green 2px;
                position: relative;
                overflow: hidden;
                display: box;
                display: -webkit-box;
                white-space: nowrap;
                @apply --page-slider-styles;
            }

            /*noinspection ALL*/
            .slider__slides {
                position: relative;
                box-sizing: border-box;
                font-size: 0;
                width: 100%;
                height: 100%;
                background: var(--page-slide-background, rgba(0, 0, 0, 0));
                will-change: transform;
            }

            /* noinspection CssUnusedSymbol */
            .slider__slides.mouseup {
                -webkit-transition: -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
                transition: -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
                transition: transform .3s cubic-bezier(.51, .92, .24, 1);
                transition: transform .3s cubic-bezier(.51, .92, .24, 1), -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
            }

            /*noinspection CssUnresolvedCustomProperty*/
            .slider__slides ::slotted(*) {
                font-size: var(--page-slide-font-size, medium);
                width: var(--page-slide-width, 100%);
                height: var(--page-slide-height, 100%);
                overflow-x: hidden;
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
            //border: solid green 3px;
            }
        `];
    }
    // noinspection JSUnusedGlobalSymbols
    render() {
        return html`
            <div id="container" class="slider" data-pos\$="[[position]]">
                
              <div id="slides" class="slider__slides mouseup">
                <slot id="slideSlot" name="page"></slot>
              </div>
            </div>
    `;
    }

    firstUpdated() {
        console.debug('Component Attached');
        //let {container, slideSlot} = this.$;
        let container = this.shadowRoot.getElementById('container');
        let slideSlot = this.shadowRoot.getElementById('slideSlot');

        console.debug('Component Attached: container', container);
        console.debug('Component Attached: slideSlot', slideSlot);

        this.totalSlides = slideSlot.assignedElements({flatten: true}).length;
        this._animateCSS();
        console.info('Component Attached: Adding swipe listener')
        addListener(container, 'track', e => this._swipeHandler(e));
    }

    /** Method for styling and animating dots */
    _animateCSS() {
        console.debug('Animate CSS');
        let container = this.shadowRoot.getElementById('container');
        let slides = container.querySelector(".slider__slides");
        slides.style.transform = "translateX(-" + 100 * this.position + "%)";
        // console.debug('Animate CSS: slider__slides: ', slides);
        // console.debug('Animate CSS: slides.style.transform: ', slides.style.transform);
        // console.debug('Animate CSS: indSel.style.left: ', indSel.style.left);
        // console.debug('Animate CSS: indSel.style.right: ', indSel.style.right);
    }

    /** Swipe event handler */
    _swipeHandler(e) {
        console.debug('Swipe Update');
        let container = this.shadowRoot.getElementById('container');
        let state = e.detail.state;
        let xPos = e.detail.x;
        let slides = container.querySelector(".slider__slides");
        switch (state) {
            case 'start':
                this.startPosX = xPos;
                slides.classList.remove('mouseup');
                break;
            case 'track':
                let actualWidth = container.offsetWidth;
                let swipeTravel = this.startPosX - xPos;
                let perActual = this.position == 0 && swipeTravel < 0 ? 0 : this.position == (this.totalSlides - 1) && swipeTravel > 0 ? 0 : (swipeTravel / actualWidth) * 100;
                let percentMove = perActual > 100 ? (this.position * 100) + 100 : perActual < -100 ? (this.position * 100) - 100 : perActual + (this.position * 100);
                this.perMov = percentMove <= 100 * (this.totalSlides - 1) ? percentMove >= 0 && percentMove : this.totalSlides;
                slides.style.transform = "translateX(-" + this.perMov + "%)";
                break;
            case 'end':
                let senNumber = this.sensitivity == "high" ? 0.25 : this.sensitivity == "low" ? -0.25 : 0;
                let senDirection = this.perMov > (this.position * 100) ? 1 : -1;
                let newPos = Math.round((this.perMov / 100) + (senNumber * senDirection));
                slides.classList.add('mouseup');
                this.position == newPos ? slides.style.transform = "translateX(-" + this.position * 100 + "%)" : false;
                this.movePos(newPos);
                break;
        }
    }

    /** Move to the next slide */
    moveNext() {
        if (this.position < (this.totalSlides -1)) {
            console.debug('Move Next');
            let nextPos = this.position < (this.totalSlides - 1) ? (this.position + 1) : 0;
            this.movePos(nextPos);
        }
    }

    /** move to previous slide */
    movePrev() {
        if (this.position > 0) {
            console.debug('Move Previous');
            let nextPos = this.position > 0 ? (this.position - 1) : (this.totalSlides - 1);
            this.movePos(nextPos);
        }
    }

    movePos(newPos) {
        console.debug(`Move Position: ${this.position} -> ${newPos}`);
        this.position = newPos;
        let container = this.shadowRoot.getElementById('container');
        container.setAttribute('data-pos', newPos);
        this._animateCSS();
    }


    // _nextPage() {
    //     const slider = this.shadowRoot.getElementById('slide');
    //     if (slider.position < (slider.totalSlides -1)) {
    //         //console.log('Position/Total: ', slider.position, slider.totalSlides);
    //         this.shadowRoot.getElementById('slide').moveNext();
    //     }
    // }
    //
    // _prevPage() {
    //     const slider = this.shadowRoot.getElementById('slide');
    //     if (slider.position > 0) {
    //         //console.log('Position/Total: ', slider.position, slider.totalSlides);
    //         this.shadowRoot.getElementById('slide').movePrev();
    //     }
    // }
}

window.customElements.define('tm-a4-book', TmA4Book);
