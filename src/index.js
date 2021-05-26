import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "services/history.js";

import "assets/scss/material-kit-react.scss?v=1.10.0";

import Home from "views/Home/Home.js";
import AddSurvivor from "views/Home/AddSurvivor.js";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/add" component={AddSurvivor} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
