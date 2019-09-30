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
        
        .page {
            display: inline-block;
            box-sizing: border-box;
            background: lightgray;
            //border: solid blue 2px;
            /*width: 100%;*/
            /*height: 100%;*/
        }
        
        .page > div {
            display: inline-block;
            box-sizing: border-box;
            //border: solid red 2px;
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
        
        @media only screen and (orientation: portrait) {
            /*noinspection CssUnusedSymbol*/
            .page {
                padding:1vw;
            }
        }

        @media only screen and (orientation: portrait) and (min-aspect-ratio: 10/14) {
            /*noinspection CssUnusedSymbol*/
            .page {
                padding:calc(1vh/1.4);
            }
        }

        @media only screen and (orientation: landscape) {
            /*noinspection CssUnusedSymbol*/
            .page {
                padding:calc(1vh/1.4);
            }
        }
        
    </style>
    <tm-a4-book>
        <div slot="page" class="page"><div><h3>Cover Page</h3></div></div>
        <div slot="page" class="page"><div><h3>Page One</h3></div></div>
        <div slot="page" class="page"><div><h3>Page Two</h3></div></div>
        <div slot="page" class="page"><div><h3>Page Three</h3></div></div>
        <div slot="page" class="page"><div><h3>Page Four</h3></div></div>
    </tm-a4-book>
`, document.querySelector('body'));