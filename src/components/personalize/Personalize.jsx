import React from 'react';
import './Personalize.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import toaster from "toasted-notes"
import { userContext } from '../../userContext';
import { Redirect } from 'react-router-dom'

class Personalize extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            dateOfBirth: "",
            email: "",
            phone: "",
            zip: "",
            city: "",
            occupation: {
                type: "student",
                school: ""
            },
            iWantToGetContacted: false,
            publishData: false,
            saveError: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOccupationToggle = this.handleOccupationToggle.bind(this);
        this.handleOccupationChange = this.handleOccupationChange.bind(this);
    }

    static contextType = userContext

    componentDidMount() {
        const { user } = this.context;
        if (user.isLoggedIn && user.userId) {
            axios.get(`${
                process.env.NODE_ENV === "production"
                    ? process.env.REACT_APP_BASE_API_DEPLOY_URL
                    : process.env.REACT_APP_BASE_API_LOCAL_URL
                }/user/details`,
                {
                    params: {
                        userID: user.userId
                    }
                }
            ).then(response => {
                this.setState(response.data);
            }).catch(error => {
                this.setState({ ...this.state, saveError: "Daten konnten nicht geladen werden: " + error.message });
                console.error(new Error(error));
            });
        }
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });
    }

    handleCheckboxChange(event) {
        const { id, checked } = event.target;
        this.setState({ ...this.state, [id]: checked });
    }

    handleOccupationToggle(event) {
        const type = event.target.value;
        this.setState((state) => ({ occupation: { type: type } }))
        if (type === "student") {
            this.setState((state) => ({
                occupation:
                {
                    ...state.occupation,
                    school: ""
                }
            }))
        } else if (type === "self-employed" || type === "employed") {
            this.setState((state) => ({
                occupation: {
                    ...state.occupation,
                    job: "",
                    company: ""
                }
            }))
        } else if (type === "other") {
            this.setState((state) => ({
                occupation: {
                    ...state.occupation,
                    description: ""
                }
            }))
        }
    }

    handleOccupationChange({ target }) {
        this.setState({ occupation: { ...this.state.occupation, [target.id]: target.value } });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.context;
        const data = { ...this.state, saveError: null }
        const responseLogUserIn = axios.put(
            `${
            process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_BASE_API_DEPLOY_URL
                : process.env.REACT_APP_BASE_API_LOCAL_URL
            }/user/details`, data, {
            params: {
                userID: user.userId
            }
        }
        ).then(response => {
            toaster.notify("Data has been saved", {
                duration: 3000,
                position: "top-right"
            })
        }).catch(error => {
            this.setState({ ...this.state, saveError: "There has been an error during saving data: " + error.message });
            console.error(new Error(error));
        });
    }

    render() {
        if (!this.context.user.isLoggedIn) return <Redirect to='/signin' />
        return (
            <div className="page">
                <div className="form-wrapper">
                    <a className="navigate-back" href="/overview">
                        <h2>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                        </h2>
                    </a>
                    <div className="form bg-light">
                        <h2>Personal data</h2>
                        <div>{this.getErrorPanel()}</div>
                        <form className="form-content" onSubmit={this.handleSubmit}>
                            <div>{this.getContactFields().map((field, i) => <div className="form-group" key={i}>{field}</div>)}</div>
                            <hr />
                            <div>{this.getOccupationField()}</div>
                            <hr />
                            <div>{this.getApprovalFlags().map((field, i) => <div className="form-group" key={i}>{field}</div>)}</div>
                            <div className="container form-group form-footer">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div >
                </div>
            </div>
        );
    }

    getErrorPanel() {
        if (this.state.saveError != undefined) {
            return <div className="alert alert-danger" role="alert">{this.state.saveError}</div>
        }
    }

    getContactFields() {
        return [
            this.getName(),
            this.getGender(),
            this.getDateOfBirth(),
            this.getEmail(),
            this.getPhone(),
            this.getZipCity()
        ];
    }

    getName() {
        return <div className="row">
            <div className="col">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
            </div>
            <div className="col">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
            </div>
        </div>
    }

    getGender() {
        return <div>
            <label htmlFor="gender">Gender</label>
            <select className="form-control" id="gender" required value={this.state.gender} onChange={this.handleChange}>
                <option value="M">male</option>
                <option value="W">female</option>
                <option value="O">divers</option>
            </select>
        </div>
    }

    getDateOfBirth() {
        return <div>
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input type="date" className="form-control" id="dateOfBirth" required value={this.state.dateOfBirth} onChange={this.handleChange}></input>
        </div>
    }

    getEmail() {
        return <div>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" readOnly value={this.state.email}></input>
        </div>
    }

    getPhone() {
        return <div>
            <label htmlFor="phone">Phone {this.getOptionalLabel()}</label>
            <input type="tel" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange}></input>
        </div>
    }

    getOptionalLabel() {
        return <span className="text-muted">(Optional)</span>;
    }

    getZipCity() {
        return <div className="row">
            <div className="col col-md-4">
                <label htmlFor="zip">Post code</label>
                <input type="text" className="form-control" id="zip" required value={this.state.zip} onChange={this.handleChange}></input>
            </div>
            <div className="col">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" required value={this.state.city} onChange={this.handleChange}></input>
            </div>
        </div>
    }

    getOccupationField() {
        return <div>
            <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <select className="form-control" id="occupation" required value={this.state.occupation.type} onChange={this.handleOccupationToggle}>
                    <option value="student">Pupil / Student</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="retired">Retirement</option>
                    <option value="other">Others</option>
                </select>
            </div>
            <div id="occupationContainer" >{this.getOccupationContainer(this.state.occupation.type)}</div>
        </div>
    }

    getOccupationContainer(occupation) {
        let dynamicPanel = "";
        if (occupation === "student") {
            dynamicPanel = this.getStudentPanel();
        } else if (occupation === "self-employed" || occupation === "employed") {
            dynamicPanel = this.getEmployerPanel(occupation === "employed");
        } else if (occupation === "other") {
            dynamicPanel = this.getOtherPanel();
        }
        return dynamicPanel;
    }

    getStudentPanel() {
        return <div className="form-group">
            <label htmlFor="school">School</label>
            <input type="text" className="form-control" id="school" required value={this.state.occupation.school} onChange={this.handleOccupationChange}></input>
        </div>
    }

    getEmployerPanel(companyRequired) {
        return <div className="form-group"><div className="form-group" >
            <label htmlFor="job">Job</label>
            <input type="text" className="form-control" id="job" required value={this.state.occupation.job} onChange={this.handleOccupationChange}></input>
        </div>
            <div className="form-group">
                <label htmlFor="company">Company {!companyRequired ? this.getOptionalLabel() : ""}</label>
                <input type="text" className="form-control" id="company" required={companyRequired} value={this.state.occupation.company} onChange={this.handleOccupationChange}></input>
            </div>
        </div>
    }

    getOtherPanel() {
        return <div className="form-group">
            <label htmlFor="description">Name</label>
            <input type="text" className="form-control" id="description" required value={this.state.occupation.description} onChange={this.handleOccupationChange}></input>
        </div>
    }

    getApprovalFlags() {
        return [
            this.getIWantToGetContacted(),
            this.getPublishMyData()
        ];
    }

    getIWantToGetContacted() {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" id="iWantToGetContacted" checked={this.state.iWantToGetContacted} onChange={this.handleCheckboxChange} />
            <label className="form-check-label" htmlFor="iWantToGetContacted">I would like to be contacted</label>
        </div>
    }

    getPublishMyData() {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" id="publishData" checked={this.state.publishData} onChange={this.handleCheckboxChange} />
            <label className="form-check-label" htmlFor="publishData">My data may be published anonymously</label>
        </div>
    }

}

export default Personalize;