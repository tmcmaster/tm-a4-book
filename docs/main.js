import {html, render} from "./web_modules/lit-html.js";

render(html`
    <style>
        body {
          background-color: lightgray;
          padding: 0;
          margin: 0;
        } 
        
        paper-slide {
            background: white;
        }
        h3 {
            margin-top: 30vh;
            text-align: center;
            color: lightgray;
            font-size: 10vh;
        }
    </style>
    <tm-a4-book>
        <paper-slide slot="page"><h3>Page One</h3></paper-slide>
        <paper-slide slot="page"><h3>Page Two</h3></paper-slide>
        <paper-slide slot="page"><h3>Page Three</h3></paper-slide>
        <paper-slide slot="page"><h3>Page Four</h3></paper-slide>
    </tm-a4-book>
`, document.querySelector('body'));