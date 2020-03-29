import React from "react";
import "./Overview.css";
import L from "leaflet";
import axios from "axios";
import { geosearch } from "esri-leaflet-geocoder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import * as mockups from "./OverviewMocks.json";
import { userContext } from "./../../userContext";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testResults: null
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.props.history.push("/personalData");
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

  componentWillMount() {
    this.getTestResults().then(function (response) {
      // find the latest result
      console.log(response);
      for (let i = 0; i < response.data.length; i++) { }
    });
  }

  componentDidMount() {
    var mymap = L.map("oMap").setView([60, -0.09], 4);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var searchControl = geosearch().addTo(mymap);

    var circle = new L.circle([55, 10], 20000, { color: "red", opacity: 0.5 });
    circle.addTo(mymap);
    circle = new L.circle([53, 10], 30000, { color: "red", opacity: 0.5 });
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
                onClick={this.handleEdit}
              />
            </div>
            <div>
              {mockups.contact.firstName} &nbsp; {mockups.contact.lastName}
            </div>
          </div>
          <div className="oCard" id="oResult">
            <div className="oEdit">
              <FontAwesomeIcon size="lg" icon={faEdit} />
            </div>
            <div>{this.state.testResults}</div>
          </div>
        </div>
        <div className="oMap" id="oMap"></div>
      </div>
    );
  }
}

export default Overview;
