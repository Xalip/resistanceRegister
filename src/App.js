import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./landingpage/Landingpage";
import Form from "./components/personalize/Form";

import Navbar from "./components/layout/Navbar"
import SignUp from "./auth/SignUp"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/signUp" component={SignUp}></Route>
          <Route exact path="/personalData" component={Form}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
