import React from 'react';

class Form extends React.Component {

    constructor() {
        super();

        this.state = {
            firstName: "Hans",
            lastName: "Muster",
            yearOfBirth: "1990",
            email: "hans.muster@hotmail.com",
            phone: "11111111",
            zip: "1000",
            city: "Zürich"
        }
    }

    render() {
        return (
            <div className="form bg-light">
                <h2>Personalien</h2>
                <div className="form-content">
                    <form>{this.getContactFields().map(field => <div className="form-group">{field}</div>)}</form>
                    <hr />
                    <form>{this.getOccupationFields().map(field => <div className="form-group">{field}</div>)}</form>
                    <hr />
                    <form>{this.getOccupationFields().map(field => <div className="form-group">{field}</div>)}</form>
                </div>
                <footer className="form-footer">
                    <div className="container">
                        <button className="btn btn-primary">Speichern</button>
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
                <input type="text" class="form-control" id="firstName"></input>
            </div>
            <div className="col">
                <label for="lastName">Nachname</label>
                <input type="text" class="form-control" id="lastName"></input>
            </div>
        </div>
    }

    getBirthDay() {
        return <div>
            <label for="birthday">Geburtsdatum</label>
            <input type="date" class="form-control" id="birthday"></input>
        </div>
    }

    getEmail() {
        return <div>
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" readOnly></input>
        </div>
    }

    getPhone() {
        return <div>
            <label for="phone">Telefon <span class="text-muted">(Optional)</span></label>
            <input type="tel" class="form-control" id="phone"></input>
        </div>
    }

    getZipCity() {
        return <div className="row">
            <div className="col col-md-4">
                <label for="zip">PLZ</label>
                <input type="text" class="form-control" id="zip"></input>
            </div>
            <div className="col">
                <label for="city">Ort</label>
                <input type="text" class="form-control" id="city"></input>
            </div>
        </div>
    }

    getOccupationFields() {
        return [];
    }

}

export default Form;