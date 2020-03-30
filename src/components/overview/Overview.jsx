import React from "react";
import ReactLoading from "react-loading";
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
      testResults: {
        loading: false,
        object: undefined
      },
      personalData: {
        loading: false,
        object: undefined
      }
    };

    this.showTestResults = this.showTestResults.bind(this);
    this.showPersonalData = this.showPersonalData.bind(this);
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

  async getPersonalData() {
    try {
      const response = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BASE_API_DEPLOY_URL
            : process.env.REACT_APP_BASE_API_LOCAL_URL
        }/user/details`,
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
    if (this.state.testResults.object != undefined) {
      return (
        <div>
          <div>
            <u>Date of last speedtest</u>:{" "}
            {M(this.state.testResults.object.createdAt).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div>
            <u>Last speedtest result</u>: {this.state.testResults.object.result}
          </div>
        </div>
      );
    }
  }

  showPersonalData() {
    console.log(this.state.personalData.object);
    if (this.state.personalData.object != undefined) {
      return (
        <div>
          <div>
            {(this.state.personalData.object.firstName == undefined
              ? ""
              : this.state.personalData.object.firstName) +
              " " +
              (this.state.personalData.object.lastName == undefined
                ? ""
                : this.state.personalData.object.lastName)}
          </div>
          {this.state.personalData.object.occupation == undefined ? (
            ""
          ) : (
            <div>
              {this.state.personalData.object.occupation.type +
                " at " +
                this.state.personalData.object.occupation.school}
            </div>
          )}
          <div>
            {(this.state.personalData.object.zip == undefined
              ? ""
              : this.state.personalData.object.zip) +
              " " +
              (this.state.personalData.object.city == undefined
                ? ""
                : this.state.personalData.object.city)}
          </div>
        </div>
      );
    }
  }

  componentWillMount() {
    const that = this;
    this.getTestResults().then(function(response) {
      // find the latest result
      if (response.status == 200) {
        if (response.data.length > 0) {
          const latest = response.data.reduce(function(r, a) {
            return r.createdAt > a.createdAt ? r : a;
          });
          that.setState({ testResults: { loading: false, object: latest } });
        }
      }
    });
    this.getPersonalData().then(function(response) {
      // store personal data local and rerender
      if (response.status == 200) {
        that.setState({
          personalData: { loading: false, object: response.data }
        });
      }
    });
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
              <h2>Personal details</h2>
              <hr />
              {this.state.personalData.loading ? (
                <div>
                  <ReactLoading
                    type="spinningBubbles"
                    color="black"
                    height={200}
                    width={200}
                  />
                </div>
              ) : (
                this.showPersonalData()
              )}
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
              <h2>Test results</h2>
              <hr />
              {this.state.testResults.loading == true ? (
                <div>
                  <ReactLoading
                    type="spinningBubbles"
                    color="black"
                    height={200}
                    width={200}
                  />
                </div>
              ) : (
                this.showTestResults()
              )}
            </div>
          </div>
        </div>
        <div className="oMap" id="oMap"></div>
      </div>
    );
  }
}

export default Overview;
