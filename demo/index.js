import {html, render} from "lit-html";
import '../src/index.js';
//import '@wonkytech/tm-page-slider';

render(html`
    <style>
        body {
          background-color: lightgray;
          padding: 0;
          margin: 0;
        } 
        h3 {
            color: lightgray;
            text-align: center;
            margin-top: 40vh;
        }
    </style>
    <tm-a4-book>
        <paper-slide slot="page"><h3>aPage One</h3></paper-slide>
        <paper-slide slot="page"><h3>aPage Two</h3></paper-slide>
        <paper-slide slot="page"><h3>aPage Three</h3></paper-slide>
        <paper-slide slot="page"><h3>aPage Four</h3></paper-slide>
    </tm-a4-book>
`, document.querySelector('body'));