import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LandingPage from "./landingpage/Landingpage";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

//TODO: move to env
const firebaseConfig = {
  apiKey: "AIzaSyCfPIosSU5eg7X5-xF-X-2llyDvam9SKlg",
  authDomain: "resistanceregister.firebaseapp.com",
  databaseURL: "https://resistanceregister.firebaseio.com",
  projectId: "resistanceregister",
  storageBucket: "resistanceregister.appspot.com",
  messagingSenderId: "87921927745",
  appId: "1:87921927745:web:d13d1e18189dceb271c8c0"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    {" "}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
