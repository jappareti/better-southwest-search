import React from "react";
import ReactDOM from "react-dom";
import FlightSearchPage from "FlightSearchPage";

ReactDOM.render(<FlightSearchPage />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
