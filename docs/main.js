import {html, render} from "./web_modules/lit-html.js";

render(html`
    <style>
        body {
          background-color: lightgray;
          padding: 0;
          margin: 0;
        } 
        
        h3 {
            //padding-top: 20vh;
            text-align: center;
            color: lightgray;
            font-size: 10vh;
            //height: 100%;
            //border: solid blue 2px;
        }
        
        
        @media only screen and (orientation: portrait) {
            /*noinspection CssUnusedSymbol*/
            h3 {
                padding-top: calc(100vw * 1.4 * 0.2);
                font-size: 10vw;
            }
        }
        
        @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
            /*noinspection CssUnusedSymbol*/
            h3 {
                padding-top: calc(100vh / 1.4 * 0.2);
            }
        }
        
        @media only screen and (orientation: landscape) {
            /*noinspection CssUnusedSymbol*/
            h3 {
                padding-top: calc(100vh * 0.2);
            }
        }
        
    </style>
    <tm-a4-book>
        <div slot="page"><h3>Cover Page</h3></div>
        <div slot="page"><h3>Page One</h3></div>
        <div slot="page"><h3>Page Two</h3></div>
        <div slot="page"><h3>Page Three</h3></div>
        <div slot="page"><h3>Page Four</h3></div>
    </tm-a4-book>
`, document.querySelector('body'));