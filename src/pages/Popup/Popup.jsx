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
  React.useEffect(() => {
    console.log("records in:", records);
  }, [records])
  function readHtml() {
    // read html from current page
    console.log("html:", getHTML());
    const html = getHTML()
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    const tds = Array.from(doc.querySelectorAll('table tr td'))
    console.log("tds:", tds);
    data = tds.map(td => td.innerText);

    const clean = [''];
    data.forEach(el => {
      const splited = el.split("\n");
      clean.push(splited[0].replace("â‚¹", ''));

    })
    console.log(clean);

    let arObj = [];
    const fields = ['description', 'volume', 'price', 'fee', 'amount', 'date'];
    let temp = {};
    clean.forEach((el, index) => {
      const actualIndex = (index) % 6;
      if (actualIndex == 0) {
        temp[fields[5]] = el;
        arObj.push(temp)
        temp = {};
      } else {
        temp[fields[actualIndex - 1]] = el;

      }
    });
    console.log(arObj);
    arObj = arObj.filter(el => el.fee);

    console.log("data:", data);
    setRecords(arObj);
    console.log("records:", records)
  }

  return (
    <div className="App" style={{ background: "white" }}>

      <button onClick={() => { readHtml(); }}>click me</button>
      <h2>Matic Data</h2>
      <ul >
        {records.length > 0 ? records.map((record, index) =>
          <li>{JSON.stringify(record)}</li>
        ) : ''}
      </ul>
    </div>
  );
};

export default Popup;
