import React from 'react';
import './Personalize.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Personalize extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "Hans",
            lastName: "Muster",
            gender: "M",
            dateOfBirth: "2012-04-23",
            email: "hans.muster@hotmail.com",
            phone: "11111111",
            zip: "1000",
            city: "Zürich",
            occupation: {
                type: "student",
                school: "gymnasium"
            },
            iWantToGetContacted: true,
            publishData: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOccupationToggle = this.handleOccupationToggle.bind(this);
        this.handleOccupationChange = this.handleOccupationChange.bind(this);
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
        // todo: do required field validation
        // todo: fix error in console
        // todo: put to server
        console.log(this.state.occupation.type + " | "
            + this.state.occupation.school + " | "
            + this.state.occupation.job + " | "
            + this.state.occupation.company + " | "
            + this.state.occupation.description)
    }

    render() {
        return (
            <div className="page">
                <div className="form-wrapper">
                    <a className="navigate-back" href="/overview">
                        <h1>
                            <FontAwesomeIcon size="lg" icon={faArrowAltCircleLeft} />
                        </h1>
                    </a>
                    <div className="form bg-light">
                        <h2>Personalien</h2>
                        <div className="form-content">
                            <form>{this.getContactFields().map(field => <div className="form-group">{field}</div>)}</form>
                            <hr />
                            <form>{this.getOccupationField()}</form>
                            <hr />
                            <form>{this.getApprovalFlags().map(field => <div className="form-group">{field}</div>)}</form>
                        </div>
                        <footer className="form-footer">
                            <div className="container">
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Speichern</button>
                            </div>
                        </footer>
                    </div >
                </div>
            </div>
        );
    }

    getContactFields() {
        return [
            this.getName(),
            this.getGender(),
            this.getBirthDay(),
            this.getEmail(),
            this.getPhone(),
            this.getZipCity()
        ];
    }

    getName() {
        return <div className="row">
            <div className="col">
                <label htmlFor="firstName">Vorname</label>
                <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
            </div>
            <div className="col">
                <label htmlFor="lastName">Nachname</label>
                <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
            </div>
        </div>
    }

    getGender() {
        return <div>
            <label htmlFor="gender">Geschlecht</label>
            <select className="form-control" id="gender" required value={this.state.gender} onChange={this.handleChange}>
                <option value="M">Männlich</option>
                <option value="W">Weiblich</option>
                <option value="O">Andere</option>
            </select>
        </div>
    }

    getBirthDay() {
        return <div>
            <label htmlFor="birthday">Geburtsdatum</label>
            <input type="date" className="form-control" id="birthday" required value={this.state.dateOfBirth} onChange={this.handleChange}></input>
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
            <label htmlFor="phone">Telefon<span className="text-muted">(Optional)</span></label>
            <input type="tel" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange}></input>
        </div>
    }

    getZipCity() {
        return <div className="row">
            <div className="col col-md-4">
                <label htmlFor="zip">PLZ</label>
                <input type="text" className="form-control" id="zip" required value={this.state.zip} onChange={this.handleChange}></input>
            </div>
            <div className="col">
                <label htmlFor="city">Ort</label>
                <input type="text" className="form-control" id="city" required value={this.state.city} onChange={this.handleChange}></input>
            </div>
        </div>
    }

    getOccupationField() {
        return <div>
            <div className="form-group">
                <label htmlFor="occupation">Tätigkeit</label>
                <select className="form-control" id="occupation" required value={this.state.occupation.type} onChange={this.handleOccupationToggle}>
                    <option value="student">Schüler(in) / Student(in)</option>
                    <option value="employed">Angestellt</option>
                    <option value="self-employed">Selbständig</option>
                    <option value="retired">Ruhestand</option>
                    <option value="other">Andere</option>
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
            <label htmlFor="school">Schule</label>
            <input type="text" className="form-control" id="school" required value={this.state.occupation.school} onChange={this.handleOccupationChange}></input>
        </div>
    }

    getEmployerPanel(companyRequired) {
        // todo: add optional label to company field if not required
        return <div className="form-group"><div className="form-group" >
            <label htmlFor="job">Beruf</label>
            <input type="text" className="form-control" id="job" required value={this.state.occupation.job} onChange={this.handleOccupationChange}></input>
        </div>
            <div className="form-group">
                <label htmlFor="company">Firma</label>
                <input type="text" className="form-control" id="company" required={companyRequired} value={this.state.occupation.company} onChange={this.handleOccupationChange}></input>
            </div>
        </div>
    }

    getOtherPanel() {
        return <div className="form-group">
            <label htmlFor="description">Bezeichnung</label>
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
            <label className="form-check-label" htmlFor="iWantToGetContacted">Ich möchte kontaktiert werden</label>
        </div>
    }

    getPublishMyData() {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" id="publishData" checked={this.state.publishData} onChange={this.handleCheckboxChange} />
            <label className="form-check-label" htmlFor="publishData">Daten anonymisiert veröffentlichen</label>
        </div>
    }

}

export default Personalize;