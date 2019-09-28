import {html, render} from "lit-html";
import '../src/index.js';

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