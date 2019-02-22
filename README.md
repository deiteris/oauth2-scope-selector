[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/oauth2-scope-selector.svg)](https://www.npmjs.com/package/@advanced-rest-client/oauth2-scope-selector)

[![Build Status](https://travis-ci.org/advanced-rest-client/oauth2-scope-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/oauth2-scope-selector)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/oauth2-scope-selector)

## &lt;oauth2-scope-selector&gt;

Form element that provides the UI to enter a scope for OAuth 2.0 settings.

```html
<oauth2-scope-selector name="scope" allowed-scopes='["email", "profile"]'></oauth2-scope-selector>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/oauth2-scope-selector
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/oauth2-scope-selector/oauth2-scope-selector.js';
    </script>
  </head>
  <body>
    <oauth2-scope-selector></oauth2-scope-selector>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/oauth2-scope-selector/oauth2-scope-selector.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <oauth2-scope-selector></oauth2-scope-selector>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/oauth2-scope-selector
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
