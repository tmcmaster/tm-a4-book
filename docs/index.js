import {html, render} from "./web_modules/lit-html.js";

import './web_modules/@wonkytech/tm-a4-book.js';

render(html`
    <style>
        body {
          background-color: lightgray;
          padding: 0;
          margin: 0;
        } 
    </style>
    <tm-a4-book></tm-a4-book>
`, document.querySelector('body'));