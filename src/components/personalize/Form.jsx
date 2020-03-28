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
            <div>
                <h1>Personalien</h1>
                <h2>Kontaktinformationen</h2>
                <form>{this.getContactFields().map(field => <div className="formGroup">{field}</div>)}</form>
                <div className="h-divider"></div>
                <h2>Tätigkeit</h2>
                <form>{this.getOccupationFields().map(field => <div className="formGroup">{field}</div>)}</form>
            </div>
        );
    }

    getContactFields() {
        return [
            this.getFirstName(),
            this.getLastName(),
            this.getYearOfBirth(),
            this.getEmail(),
            this.getPhone(),
            this.getZip(),
            this.getCity()
        ];
    }

    getFirstName() {
        return <div>
            <label for="firstName">Vorname</label>
            <input type="text" class="form-control" id="firstName"></input>
        </div>
    }

    getLastName() {
        return <div>
            <label for="lastName">Nachname</label>
            <input type="text" class="form-control" id="lastName"></input>
        </div>
    }

    getYearOfBirth() {
        return <div></div>;
    }

    getEmail() {
        return <div></div>;
    }

    getPhone() {
        return <div></div>;
    }

    getZip() {
        return <div></div>;
    }

    getCity() {
        return <div></div>;
    }

    getOccupationFields() {
        return [];
    }

}

export default Form;