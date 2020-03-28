import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./landingpage/Landingpage";
import Overview from "./overview/Overview";

import Navbar from "./components/layout/Navbar"
import SignUp from "./auth/SignUp"

function App() {
  return (
    <Router>
      <div>
            <div className="App">
                <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/signUp" component={SignUp}></Route>
          <Route exact path="/overview" component={Overview}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
