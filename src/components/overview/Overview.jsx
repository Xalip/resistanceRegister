import React from "react";
import "./Overview.css";
import L from "leaflet";
import { geosearch } from "esri-leaflet-geocoder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import * as mockups from "./OverviewMocks.json";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    // FIXME:
    window.overview = this

    this.testFunktion = this.testFunktion.bind(this)
  }

  componentDidMount() {
    var mymap = L.map("oMap").setView([60, -0.09], 4);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var searchControl = geosearch().addTo(mymap);
  }

  testFunktion(value) {
    console.log(localStorage.getItem("loggedIn"));
    return localStorage.getItem("loggedIn") == "true"
  }

  render() {
    return (
      <div className="oOverview">
        <div className="oCards">
          <div className="oCard" id="oContact">
            <div className="oEdit">
              <FontAwesomeIcon size="lg" icon={faEdit} />
            </div>
            <div>{this.testFunktion() === true ? "Peter" : "Penis"} Müller </div>
            <div>
              {mockups.contact.firstName} &nbsp; {mockups.contact.lastName}
            </div>
          </div>
          <div className="oCard" id="oResult">
            <div className="oEdit">
              <FontAwesomeIcon size="lg" icon={faEdit} />
            </div>
            <div>{mockups.result.name}</div>
          </div>
        </div>
        <div className="oMap" id="oMap"></div>
      </div>
    )
  }
}

export default Overview;
