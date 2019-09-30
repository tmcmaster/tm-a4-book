import '@polymer/polymer/polymer-legacy.js';

import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { addListener } from '@polymer/polymer/lib/utils/gestures.js';

/**
* Polymer element for displaying slides in a carousel.
* ### Examples
* Each slide must be within a page-slide tag, but other than that you have complete control.
*
*   <tm-page-slider>
*     <page-slide>#1</page-slide>
*     <page-slide>#2</page-slide>
*     <page-slide>#3</page-slide>
*     <page-slide>#4</page-slide>
*   </tm-page-slider>
*
* There is also auto progression and slide duration for how long it should remain on one slide
*
*   <tm-page-slider auto-progress slide-duration="2" total-slides="3">
*     <page-slide>#1</page-slide>
*     <page-slide>#2</page-slide>
*     <page-slide>#3</page-slide>
*   </tm-page-slider>
*
* You can set a different default start position, the first start postion is 0 (as opposed to 1)
*
*   <tm-page-slider position="1" total-slides="2">
*     <page-slide>#1</page-slide>
*     <page-slide>#2</page-slide>
*   </tm-page-slider>
*
* ### Styling
* The following custom properties are available for styling:
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--page-slide-dot` | Color of unselected Nav Dot. | `rgba(255, 255, 255, .5)
* `--page-slide-dot-selected` | Color of selected Nav Dot. | `#FFF`
* `--page-slide-width` | Width of slide container. | `100%`
* `--page-slide-height` | Height of slide container. | `600px`
* `--page-slider-styles` | (Mixin) Customs styles for slider container | NULL
* `--page-slider-dot-container-styles` | (Mixin) Custom styles for dot container | NULL
* `--page-slide-dot-styles` | (Mixin) Custon styles for dots | NULL
* `--page-slide-background` | Default background color for slides | `rgba(0,0,0,0)`
* `--page-slide-font-size` | Default font size for slide | `medium`
*
* @polymer
* @element tm-page-slider
* @demo demo/index.html
*/
Polymer$0({
  _template: html`
    <style>
      .slider {
        position: relative;
        overflow: hidden;
        display: box;
        display: -webkit-box;
        white-space: nowrap;
        @apply --page-slider-styles;
      }

      .slider__slides {
        position: relative;
        font-size: 0;
        width: 100%;
        height: 100%;
        background: var(--page-slide-background, rgba(0, 0, 0, 0));
        will-change: transform;
      }

      .slider__slides.mouseup {
        -webkit-transition: -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
        transition: -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
        transition: transform .3s cubic-bezier(.51, .92, .24, 1);
        transition: transform .3s cubic-bezier(.51, .92, .24, 1), -webkit-transform .3s cubic-bezier(.51, .92, .24, 1);
      }

      .slider__dots {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        bottom: 5%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        @apply --page-slider-dot-container-styles;
      }

      *[hidden] {
        display: none;
      }

      .slider__dot,
      .slider__indicator {
        display: block;
        margin: 8px;
        width: 16px;
        height: 16px;
        background: var(--page-slide-dot, rgba(255, 255, 255, .5));
        border-radius: 8px;
        cursor: pointer;
        @apply --page-slide-dot-styles;
      }

      .slider__dot:focus {
        outline: none;
        box-shadow: 0 0 7px 1px var(--page-slide-dot, rgba(255, 255, 255, .5));
      }

      .slider__indicator {
        -webkit-transition: opacity .5s .1s cubic-bezier(.51, .92, .24, 1.15);
        transition: opacity .5s .1s cubic-bezier(.51, .92, .24, 1.15);
        position: absolute;
        background: var(--page-slide-dot-selected, #FFF);
        border-color: rgba(0, 0, 0, 0);
        background-clip: padding-box;
        opacity: 0;
        width: auto;
      }

      .slider__indicator--left {
        -webkit-transition: left .3s cubic-bezier(.51, .92, .24, 1.15), right .3s .1s cubic-bezier(.51, .92, .24, 1.15);
        transition: left .3s cubic-bezier(.51, .92, .24, 1.15), right .3s .1s cubic-bezier(.51, .92, .24, 1.15);
      }

      .slider__indicator--right {
        -webkit-transition: left .3s .1s cubic-bezier(.51, .92, .24, 1.15), right .3s cubic-bezier(.51, .92, .24, 1.15);
        transition: left .3s .1s cubic-bezier(.51, .92, .24, 1.15), right .3s cubic-bezier(.51, .92, .24, 1.15);
      }

      .slider {
        width: var(--page-slide-width, 100%);
        height: var(--page-slide-height, 600px);
      }

      .slider__slides ::slotted(*) {
        font-size: var(--page-slide-font-size, medium);
      }

      .slider__slides ::slotted(*) {
        width: var(--page-slide-width, 100%);
        height: var(--page-slide-height, 100%);
        overflow-x: hidden;
        display: inline-block;
      }
    </style>
    <div id="container" class="slider" data-pos\$="[[position]]">
      <div class="slider__slides mouseup">
        <slot id="aaa"></slot>
      </div>
      <div role="menubar" hidden\$="[[hideNav]]" class="slider__dots">
        <span class="slider__indicator"></span>
        <template is="dom-repeat" items="[[_totalDots]]">
          <span tabindex="0" role="menuitemradio" aria-checked="false" class="slider__dot" aria-posinset\$="[[item]]"></span>
        </template>
      </div>
    </div>
`,

  is: 'tm-page-slider',

  listeners: {
    'container.track': '_swipeHandler'
  },

  behaviors: [
    IronA11yKeysBehavior
  ],

  hostAttributes: {
    tabindex: 0
  },

  properties: {

    // Private //

    /**
    * Array for storing number
    * leading up to totalSlides
    *
    * @attribute _totalDots
    * @type Array
    * @default []
    */
    _totalDots: {
      type: Array,
      value: [],
      notify: true,
      computed: '_createDots(totalSlides)'
    },
    /**
    * Object for storing
    * all the styles of the
    * dot elements
    *
    * @attribute _dotStyles
    * @type Object
    * @default NULL
    */
    _dotStyles: {
      type: Object,
      notify: true,
      observer: '_animateCSS'
    },

    // Public //

    /**
    * Boolean value to
    * state if slides should
    * auto proceed
    *
    * @attribute auto-progress
    * @type Boolean
    * @default false
    */
    autoProgress: {
      type: Boolean,
      value: false,
      notify: true,
    },
    /**
    * Boolean value to
    * state if swipe shoud
    * work
    *
    * @attribute disableSwipe
    * @type Boolean
    * @default false
    */
    disableSwipe: {
      type: Boolean,
      value: false
    },
    /**
    * Boolean value to
    * state if nav should
    * should hidden
    *
    * @attribute hide-nav
    * @type Boolean
    * @default false
    */
    hideNav: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
      observer: '_reInit'
    },
    /**
    * Number for storing start
    * position of slides
    *
    * @attribute position
    * @type Number
    * @default 0
    */
    position: {
      type: Number,
      value: 0,
      notify: true,
      reflectToAttribute: true,
      observer: '_posObs'
    },
    /**
    * String to storing
    * high, low or default
    * swipe sensitivity
    *
    * @attribute sensitivity
    * @type String
    * @default 'default'
    */
    sensitivity: {
      type: String,
      value: 'default',
      notify: true
    },
    /**
    * Number of seconds
    * each slide should
    * remain for
    *
    * @attribute slide-duration
    * @type Number
    * @default 5
    */
    slideDuration: {
      type: Number,
      value: 5,
      notify: true
    },
    /**
    * Number for storing total
    * number of slides
    *
    * @attribute total-slides
    * @type Number
    * @default NULL
    */
    totalSlides: {
      type: Number,
      notify: true,
      reflectToAttribute: true,
      observer: '_reInit'
    },
  },

  // Key Bindings //

  keyBindings: {
    'right': '_keyRight',
    'left': '_keyLeft',
    'space': '_spaceCatcher',
    'enter': '_spaceCatcher',
  },

  // Private //

  /**
  * Method for styling
  * and animating dots
  */
  _animateCSS: function () {
    var deep = this.$.container,
      indSel = deep.querySelector(".slider__indicator");
    if (this._dotStyles) {
      deep.querySelector(".slider__slides").style.transform = "translateX(-" + 100 * this.position + "%)",
        indSel.style.opacity = "1";
      indSel.style.left = "calc((((" + this._dotStyles.marginRight + " + " + this._dotStyles.marginLeft + ") + (" + this._dotStyles.paddingRight + " + " + this._dotStyles.paddingLeft + ") + " + this._dotStyles.width + ") * " + this.position + ") + " + this.position + " * (" + this._dotStyles.borderLeftWidth + " + " + this._dotStyles.borderRightWidth + "))";
      indSel.style.right = "calc(" + ((this.totalSlides - (this.position + 1))) + "*((" + this._dotStyles.marginRight + " + " + this._dotStyles.marginLeft + ") + (" + this._dotStyles.borderLeftWidth + " + " + this._dotStyles.borderRightWidth + ") + (" + this._dotStyles.paddingLeft + " + " + this._dotStyles.paddingRight + ") + " + this._dotStyles.width + "))";
    }
  },

  /**
  * Method for setting
  * the aria-checked property
  * of dotElems on position change
  *
  */
  _ariaChecked: function () {
    var dotElems = this.$.container.querySelectorAll('.slider__dot');
    if (dotElems.length > 0) {
      for (var i = 0; i < this.totalSlides; i++) {
        dotElems[i].setAttribute("aria-checked", "false");
      };
      dotElems[this.position].setAttribute("aria-checked", "true");
    }
  },

  /**
  * Method for moving
  * automatically ever
  * slideDuration seconds
  *
  */
  _autoProceed: function () {
    var this$ = this;
    var autoProceed = setInterval(function () {
      this$.moveNext();
    }, (this$.slideDuration * 1000));
    this.$.container.addEventListener("mouseover", function () {
      clearInterval(autoProceed);
    });
    this.$.container.addEventListener("mouseout", function () {
      autoProceed = setInterval(function () {
        this$.moveNext();
      }, (this$.slideDuration * 1000));
    });
  },

  /**
  * Count the slides,
  * and set totalSlides
  *
  */
  _countSlides: function () {
    //this.totalSlides = this.querySelectorAll("page-slide").length;
    let slot = this.$.aaa;
    console.log('Slot', slot.assignedElements({flatten: true}));
    this.totalSlides = this.$.container.querySelectorAll('slot').length;
    this.totalSlides = this.$.aaa.assignedElements({flatten: true}).length;
    console.log('Total Sides: ' + this.totalSlides);
  },

  /**
  * Create the nav dots,
  * 1 for each slide
  *
  */
  _createDots: function (t) {
    var array = [], i;
    for (i = 0; i < t; ++i) {
      array.push(i);
    };
    return array;
  },

  /**
  * Method for moving
  * to the previous slide or
  * to the last slide
  * and setting focus
  *
  */
  _keyLeft: function () {
    var currentPos = parseInt(this.$.container.getAttribute('data-pos')),
      nextPos = currentPos > 0 ? (currentPos - 1) : (this.totalSlides - 1);
    this.movePos(nextPos);
    this.moveFocus(nextPos);
  },

  /**
  * Method for moving
  * to the next slide or back
  * to the first slide
  * and setting focus
  *
  */
  _keyRight: function () {
    var currentPos = parseInt(this.$.container.getAttribute('data-pos')),
      nextPos = currentPos < (this.totalSlides - 1) ? (currentPos + 1) : 0;
    this.movePos(nextPos);
    this.moveFocus(nextPos);
  },

  /**
  * Method to initiate
  * and animate move
  *
  */
  _moveInd: function (dotElem) {
    if (dotElem != undefined) {
      //#TODO:   clearInterval(this.moveNext()); ?
      var sliderElem = this.$.container,
        indicatorElem = sliderElem.querySelector('.slider__indicator'),
        currentPos = parseInt(sliderElem.getAttribute('data-pos')),
        newPos = parseInt(dotElem.getAttribute('aria-posinset')),
        newDirection = newPos > currentPos ? 'right' : 'left',
        currentDirection = newPos < currentPos ? 'right' : 'left';
      indicatorElem.classList.remove('slider__indicator--' + currentDirection);
      indicatorElem.classList.add('slider__indicator--' + newDirection);
      this.position = newPos;
    }
  },

  /**
  * Adds onclick listener
  * To update the position
  *
  */
  _moveManual: function () {
    var this$ = this;
    var dotElems = this.$.container.querySelectorAll('.slider__dot'), i;
    for (i = 0; i < this.totalSlides; ++i) {
      dotElems[i].setAttribute("aria-label", "Slide " + (parseInt(dotElems[i].getAttribute('aria-posinset')) + 1) + " selector");
      dotElems[i].addEventListener('click', function (e) {
        this$.movePos(e.target.getAttribute('aria-posinset'));
      });
    };
    if (this.totalSlides) {
      this._dotStyles = window.getComputedStyle(dotElems[0]);
    }
  },

  /**
  * Function to store
  * functions for the
  * position observer
  *
  */
  _posObs: function () {
    this._animateCSS();
    this._setInert();
    this._ariaChecked();
    this.fire('change');
  },

  /**
  * Method to reinitialise
  * on totalSlides change.
  *
  */
  _reInit: function () {
    var this$ = this;
    this._animateCSS();
    setTimeout(function () {
      this$._moveManual();
    }, 0);
  },

  /**
  * Method for setting
  * inert on hidden slides
  */
  _setInert: function () {
        // var deep = this.$.container,
        //   sliSel = deep.querySelectorAll('page-slide');
        // for (var i = 0; i < sliSel.length; i++) {
        //   if (i != this.position) {
        //     sliSel[i].setAttribute("inert", "")
        //   }
        // }
        // if (sliSel[this.position]) {
        //   sliSel[this.position].removeAttribute("inert");
        // }
  },

  /**
  * Method for moving
  * to the selected slide
  * on key press
  *
  */
  _spaceCatcher: function (e) {
    e.preventDefault();
    if (this.shadowRoot != null) {
      var nextPos = this.shadowRoot.activeElement.getAttribute('aria-posinset');
    } else {
      var nextPos = document.activeElement.getAttribute('aria-posinset');
    }
    if (!nextPos)
      return;
    this.movePos(nextPos);
  },

  /**
  * Method for adding
  * swipe event handler
  */
  _swipeHandler: function (e) {
    if (!(this.disableSwipe)) {
      var deep = this.$.container;
      switch (e.detail.state) {
        case 'start':
          this.startPosX = e.detail.x;
          deep.querySelector(".slider__slides").classList.remove('mouseup');
          break;
        case 'track':
          var actualWidth = deep.offsetWidth;
          var swipeTravel = this.startPosX - e.detail.x;
          var perActual = this.position == 0 && swipeTravel < 0 ? 0 : this.position == (this.totalSlides - 1) && swipeTravel > 0 ? 0 : (swipeTravel / actualWidth) * 100;
          var percentMove = perActual > 100 ? (this.position * 100) + 100 : perActual < -100 ? (this.position * 100) - 100 : perActual + (this.position * 100);
          this.perMov = percentMove <= 100 * (this.totalSlides - 1) ? percentMove >= 0 && percentMove : this.totalSlides;
          deep.querySelector(".slider__slides").style.transform = "translateX(-" + this.perMov + "%)";
          break;
        case 'end':
          var senNumber = this.sensitivity == "high" ? 0.25 : this.sensitivity == "low" ? -0.25 : 0;
          var senDirection = this.perMov > (this.position * 100) ? 1 : -1;
          var newPos = Math.round((this.perMov / 100) + (senNumber * senDirection));
          deep.querySelector(".slider__slides").classList.add('mouseup');
          this.position == newPos ? deep.querySelector(".slider__slides").style.transform = "translateX(-" + this.position * 100 + "%)" : false;
          this.movePos(newPos);
          break;
      }
    }
  },

  // Public //

  /**
  * Method for moving
  * focus to a different
  * dot.
  *
  */
  moveFocus: function (slide) {
    var focusEl = this.$.container.querySelectorAll('.slider__dot')[slide];
    focusEl.focus();
  },

  /**
  * Method for moving
  * to the next slide or back
  * to the first slide
  *
  */
  moveNext: function () {
    var currentPos = parseInt(this.$.container.getAttribute('data-pos')),
      nextPos = currentPos < (this.totalSlides - 1) ? (currentPos + 1) : 0;
    this.movePos(nextPos);
  },

  /**
  * Method for moving
  * to a specific slide
  *
  */
  movePos: function (slide) {
    var nextPos = this.$.container.querySelectorAll('.slider__dot')[slide];
    this._moveInd(nextPos);
  },

  /**
  * Method for moving
  * to the previous slide or
  * to the last slide
  *
  */
  movePrev: function () {
    var currentPos = parseInt(this.$.container.getAttribute('data-pos')),
      nextPos = currentPos > 0 ? (currentPos - 1) : (this.totalSlides - 1);
    this.movePos(nextPos);
  },

  // Init //

  /**
  * Starting the scripts
  *
  */
  attached: function () {
    var this$ = this;
    this.autoProgress == true
      ? setTimeout(function () {
        this$._autoProceed()
      }, 0)
      : false;
    // Strange hack, but it works.
    setTimeout(function () {
      this$._moveManual();
      this$._ariaChecked();
      this$._countSlides();
    }, 1000);

    //allow vertical scrolling
    addListener(this.$.container, 'track', e => this._swipeHandler(e));
    this.setScrollDirection('y', this.$.container);
  }
});
