import React, { Component } from 'react'
import "./TestUpload.css"

class TestUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            imageLoadingProgressEnabled: false,
            resultOptions: [
                { display: "Please select", value: 0 },
                { display: "Not Resistant", value: 1 },
                { display: "Resistant", value: 2 }],
            result: 0
        }

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.isSaveEnabled = this.isSaveEnabled.bind(this)
    }

    render() {
        return (
            <div className="testuploader">
                <div className="container">
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="resultImage" onChange={this.handleFileChange} accept="image/gif, image/jpeg, image/png" />
                                <label className="custom-file-label" htmlFor="resultImage">Datei auswählen...</label>
                            </div>
                            <div className="previewImage">

                                {this.state.image ?
                                    <img src={this.state.image} style={{ height: "500px" }} className="img-fluid" alt="" /> :

                                    (this.state.imageLoadingProgressEnabled &&
                                        <div class="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="resultSelect">Ergebnis auswählen</label>
                            <select className="custom-select"
                                defaultValue={this.state.result}
                                onChange={this.handleSelectionChange}
                                id="resultSelect" >
                                {this.state.resultOptions.map(option => (
                                    <option value={option.value} key={option.value}>{option.display}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary float-right" type="submit" disabled={!this.isSaveEnabled()}>Speichern</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // this.state.image = base64 blob
        // this.state.result = id of result 
    }

    handleSelectionChange(e) {
        this.setState({ result : e.target.value});
    }

    handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            this.setState({ imageLoadingProgressEnabled: true })

            reader.onload = (a) => {
                console.log(a.target.result)

                this.setState({
                    image: a.target.result,
                    imageLoadingProgressEnabled: false
                });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    isSaveEnabled() {
        return this.state.result && this.state.result > 0 && this.state.image;
    }
}

export default TestUpload;