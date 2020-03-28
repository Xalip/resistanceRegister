import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
<<<<<<< HEAD
import LandingPage from "./landingpage/Landingpage";
import Form from "./components/personalize/Form";
import Overview from "./overview/Overview";
=======
>>>>>>> personalize-new

import Navbar from "./components/layout/Navbar"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import LandingPage from "./components/landingpage/Landingpage";
import Overview from "./components/overview/Overview";
import TestUpload from "./components/testupload/TestUpload"
import Personalize from "./components/personalize/Personalize";

function App() {
<<<<<<< HEAD
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/signUp" component={SignUp}></Route>
          <Route exact path="/overview" component={Overview}></Route>
          <Route exact path="/personalData" component={Form}/>
        </Switch>
      </div>
    </Router>
  );
=======
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="wrapper">
                    <Switch >
                        <Route exact path="/" component={LandingPage}></Route>
                        <Route exact path="/signUp" component={SignUp}></Route>
                        <Route exact path="/signIn" component={SignIn}></Route>
                        <Route exact path="/overview" component={Overview}></Route>
                        <Route exact path="/test/upload" component={TestUpload}></Route>
                        <Route exact path="/personalData" component={Personalize}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
>>>>>>> personalize-new
}

export default App;
