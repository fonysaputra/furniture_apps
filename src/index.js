import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import "./styles.css";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
