import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";

import './index.css';

export default class MyWither extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    ReactDom.render(<App />, this)
  }

  disconnectedCallback() {
    ReactDom.unmountComponentAtNode(this)
  }
}

window.customElements.define('my-wither', MyWither);


