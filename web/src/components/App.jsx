import React, { useState } from "react";
import "./App.css";
import { debugData } from "./utils/debugData";
import { fetchNui } from "./utils/fetchNui";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);



const ReturnClientDataComp = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);



const App = () => {
  const [clientData, setClientData] = useState(null);

  const handleGetClientData = () => {
    fetchNui("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };

  return (
    <div className="nui-wrapper">
      <div className="popup-thing">
        <div>
          <h1>This is the NUI Popup!</h1>
          <p>Exit with the escape key</p>
          <button onClick={handleGetClientData}>Get Client Data</button>
          {clientData && <ReturnClientDataComp data={clientData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
