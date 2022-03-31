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
  let data;
  const [records, setRecords] = React.useState([]);
  function readHtml() {
    // read html from current page
    console.log("html:", getHTML());
    const html = getHTML()
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    const tds = Array.from(doc.querySelectorAll('table tr td'))
    console.log("tds:", tds);
    data = tds.map(td => td.innerText);
    console.log("data:", data);
    setRecords(tds.map(td => td.innerText));
    console.log("records:", records)
  }

  return (
    <div className="App" style={{ background: "white" }}>

      <button onClick={() => { readHtml(); }}>click me</button>
      <h2>Matic Data</h2>
      <ul >
        {records.map((record, index) => {
          <li>record</li>
        })}
      </ul>
    </div>
  );
};

export default Popup;
