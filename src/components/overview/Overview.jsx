import React from "react";
import "./Overview.css";
import L from "leaflet";
import axios from "axios";
import * as M from "moment";
import { geosearch } from "esri-leaflet-geocoder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import * as mockups from "./OverviewMocks.json";
import { userContext } from "./../../userContext";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      testResults: null
    };

    this.showTestResults = this.showTestResults.bind(this);
  }

  async getTestResults() {
    try {
      const response = await axios.get(
        `${
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BASE_API_DEPLOY_URL
          : process.env.REACT_APP_BASE_API_LOCAL_URL
        }/testResult/all`,
        {
          params: {
            userID: localStorage.getItem("userId")
          }
        }
      );
      return response;
    } catch (error) {
      console.error(new Error(error));
    }
  }

  showTestResults() {
    return (
      <div>
        <h2>Test results</h2>
        <hr color="black" />
        <div>
          <u>Date of last speedtest</u>: {M(this.state.testResults.createdAt).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        </div>
        <div><u>Result</u>: {this.state.testResults.result}</div>
      </div>
    );
  }

  componentWillMount() {
    const that = this;
    this.getTestResults().then(function (response) {
      // find the latest result
      console.log(response);
      if (response.status == 200) {
        const latest = response.data.reduce(function (r, a) {
          return r.createdAt > a.createdAt ? r : a;
        });
        console.log(latest);
        that.setState({ loading: false, testResults: latest });
      }
    });
    console.log(this.state);
  }

  componentDidMount() {
    var mymap = L.map("oMap").setView([60, -0.09], 4);
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var searchControl = geosearch().addTo(mymap);

    let circle = new L.circle([54, 10], 200000, { color: "red", opacity: 0.5 });
    circle.addTo(mymap);
    circle = new L.circle([44, 12], 300000, { color: "red", opacity: 0.5 });
    circle.addTo(mymap);
    circle = new L.circle([53, 9], 40000, { color: "red", opacity: 0.5 });
    circle.addTo(mymap);
    circle = new L.circle([52, 11], 10000, { color: "red", opacity: 0.5 });
    circle.addTo(mymap);
  }

  render() {
    return (
      <div className="oOverview">
        <div className="oCards">
          <div className="oCard" id="oContact">
            <div className="oEdit">
              <FontAwesomeIcon
                size="lg"
                icon={faEdit}
                onClick={() => {
                  this.props.history.push("/personalData");
                }}
              />
            </div>
            <div>
              {mockups.contact.firstName} &nbsp; {mockups.contact.lastName}
            </div>
          </div>
          <div className="oCard" id="oResult">
            <div className="oEdit">
              <FontAwesomeIcon
                size="lg"
                icon={faEdit}
                onClick={() => {
                  this.props.history.push("/test/upload");
                }}
              />
            </div>
            <div>
              {this.state.loading == true ? "Pending" : this.showTestResults()}
            </div>
          </div>
        </div>
        <div className="oMap" id="oMap"></div>
      </div>
    );
  }
}

export default Overview;
