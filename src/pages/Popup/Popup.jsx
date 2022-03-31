import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import { getHTML } from '../Content/index';
import './Popup.css';

window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message1');
  // if (message.type === "OYO_PLUGIN_EVALUATED_CONFIG") {
  //   this.setState({
  //     configData: message.configData
  //   });
  // }
});

const Popup = () => {
  const readHtml = () => {
    // read html from current page
    console.log("html:", getHTML());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <button onClick={readHtml}>click me</button>
      </header>
    </div>
  );
};

export default Popup;
