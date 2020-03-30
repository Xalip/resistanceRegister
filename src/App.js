import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import LandingPage from "./components/landingpage/Landingpage";
import Overview from "./components/overview/Overview";
import TestUpload from "./components/testupload/TestUpload"
import Personalize from "./components/personalize/Personalize";
import { UserContextProvider } from './userContext'


class App extends React.Component {
    constructor(props) {
        super(props)
        // FIXME: only for dev
        window.app = this
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <UserContextProvider>
                        <Navbar />
                        <div className="wrapper">
                            <Switch >
                                <Route exact path="/" component={LandingPage}></Route>
                                <Route exact path="/signUp" component={SignUp}></Route>
                                <Route exact path="/signIn" component={SignIn}></Route>
                                <Route exact path="/overview" component={Overview}></Route>
                                <Route exact path="/test/upload" component={TestUpload}></Route>
                                <Route exact path="/personalData" component={Personalize} />
                            </Switch>
                        </div>
                    </UserContextProvider>
                </div>
            </Router >
        )
    }
}

export default App
