import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  line-height: 1.15; 
  -webkit-text-size-adjust: 100%; 
}

body {
  margin: 0;
}

main {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}


a {
  background-color: transparent;
}


abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}



b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}



small {
  font-size: 80%;
}



sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}


img {
  border-style: none;
}



button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}



button,
input {
  /* 1 */
  overflow: visible;
}



button,
select {
  /* 1 */
  text-transform: none;
}


button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}


button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}



button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}



fieldset {
  padding: 0.35em 0.75em 0.625em;
}


legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}



progress {
  vertical-align: baseline;
}


textarea {
  overflow: auto;
}



[type='checkbox'],
[type='radio'] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}


[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}



[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}



[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}



::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}


details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}


[hidden] {
  display: none;
}

/* Global Styles */

body {
  height: 100vh;
}

/* Bootstrap's resets and adjustments */

:root {
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

article,
aside,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

[tabindex='-1']:focus:not(:focus-visible) {
  outline: 0 !important;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}

a:not([href]):hover {
  color: inherit;
  text-decoration: none;
}


`;
