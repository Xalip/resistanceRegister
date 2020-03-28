import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component {

    constructor(props) {
        super(props);

        // TODO: flag-binding not working yet
        // TODO: mutation of value in dynamic fields not possible -> probalby bindin stuff
        // TODO: occupation selection -> not selected required value should be cleared

        this.state = {
            firstName: "Hans",
            lastName: "Muster",
            dateOfBirth: "2012-04-23",
            email: "hans.muster@hotmail.com",
            phone: "11111111",
            zip: "1000",
            city: "Zürich",
            occupation: "student",
            school: "Gymnasium",
            job: "Krankenpfleger",
            company: "Krankenhaus Altstetten",
            occupationDescription: "Arbeitssuchend",
            iWannaHelp: true,
            publishData: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectOccupation = this.handleSelectOccupation.bind(this);

    }

    handleChange(event) {
        this.state[event.target.id] = event.target.value;
        this.setState(this.state);
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
                <label for="firstName">Vorname</label>
                <input type="text" class="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
            </div>
            <div className="col">
                <label for="lastName">Nachname</label>
                <input type="text" class="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
            </div>
        </div>
    }

    getBirthDay() {
        return <div>
            <label for="birthday">Geburtsdatum</label>
            <input type="date" class="form-control" id="birthday" required value={this.state.dateOfBirth} onChange={this.handleChange}></input>
        </div>
    }

    getEmail() {
        return <div>
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" readOnly value={this.state.email}></input>
        </div>
    }

    getPhone() {
        return <div>
            <label for="phone">Telefon <span class="text-muted">(Optional)</span></label>
            <input type="tel" class="form-control" id="phone" value={this.state.phone} onChange={this.handleChange}></input>
        </div>
    }

    getZipCity() {
        return <div className="row">
            <div className="col col-md-4">
                <label for="zip">PLZ</label>
                <input type="text" class="form-control" id="zip" required value={this.state.zip} onChange={this.handleChange}></input>
            </div>
            <div className="col">
                <label for="city">Ort</label>
                <input type="text" class="form-control" id="city" required value={this.state.city} onChange={this.handleChange}></input>
            </div>
        </div>
    }

    getOccupationField() {
        return <div>
            <div class="form-group">
                <label for="occupation">Tätigkeit</label>
                <select class="form-control" id="occupation" value={this.state.occupation} onChange={this.handleSelectOccupation}>
                    <option value="student">Schüler(in) / Student(in)</option>
                    <option value="employed">Berufstätig</option>
                    <option value="self-employed">Selbständig</option>
                    <option value="retired">Ruhestand</option>
                    <option value="other">Andere</option>
                </select>
            </div>
            <div id="occupationContainer" >{this.getStudentPanel()}</div>
        </div>
    }

    handleSelectOccupation(event) {
        let selected = event.target.value;
        this.state.occupation = selected;
        this.setState(this.state);
        let dynamicPanel = "";
        if (selected == "student") {
            dynamicPanel = this.getStudentPanel();
        } else if (selected == "self-employed" || selected == "employed") {
            dynamicPanel = this.getEmployedPanel();
        } else if (selected == "other") {
            dynamicPanel = this.getOtherPanel();
        }
        ReactDOM.render(
            dynamicPanel,
            document.getElementById('occupationContainer')
        );
    }

    getStudentPanel() {
        return <div className="form-group">
            <label for="school">Schule</label>
            <input type="text" class="form-control" id="school" required value={this.state.school} onChange={this.handleChange}></input>
        </div>
    }

    getEmployedPanel() {
        return <div className="form-group"><div className="form-group" >
            <label for="job">Beruf</label>
            <input type="text" class="form-control" id="job" required value={this.state.job} onChange={this.handleChange}></input>
        </div>
            <div className="form-group">
                <label for="compnay">Firma</label>
                <input type="text" class="form-control" id="company" required value={this.state.company} onChange={this.handleChange}></input>
            </div>
        </div>
    }

    getOtherPanel() {
        return <div className="form-group">
            <label for="occupationDescription">Bezeichnung</label>
            <input type="text" class="form-control" id="occupationDescription" required value={this.state.occupationDescription} onChange={this.handleChange}></input>
        </div>
    }


    getApprovalFlags() {
        return [
            this.getIWannaHelp(),
            this.getPublishMyData()
        ];
    }

    getIWannaHelp() {
        return <div class="form-check">
            <input class="form-check-input" type="checkbox" id="iWannaHelp" required value={this.state.iWannaHelp} onChange={this.handleChange} />
            <label class="form-check-label" for="iWannaHelp">Ich möchte helfen</label>
        </div>
    }

    getPublishMyData() {
        return <div class="form-check">
            <input class="form-check-input" type="checkbox" id="publishData" value={this.state.publishData} onChange={this.handleChange} />
            <label class="form-check-label" for="publishData">Daten anonymisiert veröffentlichen</label>
        </div>
    }

}

export default Form;