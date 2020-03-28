import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import SignUp from "./components/auth/SignUp"
import LandingPage from "./components/landingpage/Landingpage";
import Overview from "./overview/Overview";
import TestUpload from "./components/testupload/TestUpload"

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="wrapper">
                    <Switch >
                        <Route exact path="/" component={LandingPage}></Route>
                        <Route exact path="/signUp" component={SignUp}></Route>
                        <Route exact path="/overview" component={Overview}></Route>
                        <Route exact path="/test/upload" component={TestUpload}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
