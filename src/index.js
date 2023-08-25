import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DataContextProvider from "./context/DataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>
);
