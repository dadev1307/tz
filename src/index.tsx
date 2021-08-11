import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";
import {SettingsProvider} from "./context/settingsContext";

import './index.css';

export default class MyWither extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    ReactDom.render(<SettingsProvider><App /></SettingsProvider>, this);
  }

  disconnectedCallback() {
    ReactDom.unmountComponentAtNode(this)
  }
}

window.customElements.define('my-wither', MyWither);


