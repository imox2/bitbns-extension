import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import { getHTML } from '../Content/index';
import './Popup.css';
import moment from 'moment'

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
  const [fromattedData, setFormattedData] = React.useState([]);
  const [showTableData, setShowTableData] = React.useState([]);

  const [fDate, setFDate] = React.useState(new Date());
  const [tDate, setTDate] = React.useState(new Date())
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

  const showData = (type) => {
    setShowTableData([])
    manageData()
    let data = fromattedData.filter(item => fDate <= item.date && tDate >= item.date)
    if (type == 'buy') {
      const buyData = data.filter(item => item.type == 'Sell')
      setShowTableData(buyData)
    } else if (type == 'sell') {
      const sellData = data.filter(item => item.type == 'Buy')
      setShowTableData(sellData)
    }
    console.log('data: ', showTableData)

  }

  const manageData = () => {
    let data = []
    records.map(item => {
      let type = item.description.split(" ");
      let cType = type[1];

      let date = item.date;
      let dateArr = date.split(",")
      let newDate = dateArr[1].trim()

      let mDate = moment(newDate).format('YYYY-MM-DD')
      data.push({ type: cType, date: mDate, amount: item.amount, fee: item.fee })
    })

    setFormattedData(data)
  }


  return (
    <div className="App" style={{ background: "white" }}>

      <button onClick={() => { readHtml(); }}>click me</button>
      <h2>Matic Data</h2>
      {/* <ul >
        {records.length > 0 ? records.map((record, index) =>
          <li>{record.date}</li>
        ) : ''}
      </ul> */}

      <div>
        <div>
          <input type="date" value={fDate} onChange={(e) => { setFDate(e.target.value) }} />
        </div>
        <div>
          <input type="date" value={tDate} onChange={(e) => { setTDate(e.target.value) }} />
        </div>
        <button onClick={() => { showData('buy') }}>Buy</button>
        <button onClick={() => { showData('sell') }}>Sell</button>
        <table>
          <tr>
            <th>Amount</th>
            <th>Fee</th>
            <th>Date</th>
          </tr>
          {showTableData.lenght > 0 && showTableData.map((item, i) => {
            <tr key={i}>
              <td>{item.amount}</td>
              <td>{item.fee}</td>
              <td>{item.date}</td>
            </tr>
          })}
        </table>
      </div>
    </div>
  );
};

export default Popup;
