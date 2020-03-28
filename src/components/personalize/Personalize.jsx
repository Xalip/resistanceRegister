import React from 'react';
import './Personalize.css';

class Personalize extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "Hans",
            lastName: "Muster",
            dateOfBirth: "2012-04-23",
            email: "hans.muster@hotmail.com",
            phone: "11111111",
            zip: "1000",
            city: "Zürich",
            occupation: "student",
            occupationData: {
                school: "Gymnasium",
            },
            iWannaHelp: true,
            publishData: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOccupationChange = this.handleOccupationChange.bind(this);
        this.changeOccupationData = this.changeOccupationData.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });
    }

    handleCheckboxChange(event) {
        const { id, checked } = event.target;
        this.setState({ ...this.state, [id]: checked });
    }

    handleOccupationChange(event) {
        const occupationValue = event.target.value;
        this.setState({occupation: occupationValue})
        if (occupationValue === "student") {
            this.setState({
                occupationData: {
                    school: ""
                }
            });
        } else if (occupationValue === "self-employed" || occupationValue === "employed") {
            this.setState({
                occupationData: {
                    job: "",
                    company: ""
                }
            })
        } else if (occupationValue === "other") {
            this.setState({
                occupationData: {
                    occupationDescription: ""
                }
            });
        }
    }

    changeOccupationData({target}) {
        this.setState({occupationData: {...this.state.occupationData, [target.id]: target.value}});
    }

    handleSubmit(event) {
    }

    render() {
        return (
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
        );
    }

    getContactFields() {
        return [
            this.getName(),
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
            <label htmlFor="phone">Telefon <span className="text-muted">(Optional)</span></label>
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
                <select className="form-control" id="occupation" value={this.state.occupation} onChange={this.handleOccupationChange}>
                    <option value="student">Schüler(in) / Student(in)</option>
                    <option value="employed">Berufstätig</option>
                    <option value="self-employed">Selbständig</option>
                    <option value="retired">Ruhestand</option>
                    <option value="other">Andere</option>
                </select>
            </div>
            <div id="occupationContainer" >{this.getOccupationContainer(this.state.occupation)}</div>
        </div>
    }

    getOccupationContainer(occupation) {
        let dynamicPanel = "";
        if (occupation === "student") {
            dynamicPanel = this.getStudentPanel();
        } else if (occupation === "self-employed" || occupation === "employed") {
            dynamicPanel = this.getEmployedPanel();
        } else if (occupation === "other") {
            dynamicPanel = this.getOtherPanel();
        }
        return dynamicPanel;
    }

    getStudentPanel() {
        return <div className="form-group">
            <label htmlFor="school">Schule</label>
            <input type="text" className="form-control" id="school" required value={this.state.occupationData.school} onChange={this.changeOccupationData}></input>
        </div>
    }

    getEmployedPanel() {
        return <div className="form-group"><div className="form-group" >
            <label htmlFor="job">Beruf</label>
            <input type="text" className="form-control" id="job" required value={this.state.occupationData.job} onChange={this.changeOccupationData}></input>
        </div>
            <div className="form-group">
                <label htmlFor="company">Firma</label>
                <input type="text" className="form-control" id="company" required value={this.state.occupationData.company} onChange={this.changeOccupationData}></input>
            </div>
        </div>
    }

    getOtherPanel() {
        return <div className="form-group">
            <label htmlFor="occupationDescription">Bezeichnung</label>
            <input type="text" className="form-control" id="occupationDescription" required value={this.state.occupationData.description} onChange={this.changeOccupationData}></input>
        </div>
    }

    getApprovalFlags() {
        return [
            this.getIWannaHelp(),
            this.getPublishMyData()
        ];
    }

    getIWannaHelp() {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" id="iWannaHelp" checked={this.state.iWannaHelp} onChange={this.handleCheckboxChange} />
            <label className="form-check-label" htmlFor="iWannaHelp">Ich möchte kontaktiert werden</label>
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