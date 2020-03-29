import React, { Component, Fragment } from 'react'
import "./TestUpload.css"
import axios from 'axios';

class TestUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            imageContentType: null,
            imageLoadingProgressEnabled: false,
            resultOptions: [
                { display: "Please select", value: 'NONE' },
                { display: "Test has been positive.", value: "POSITIVE" },
                { display: "Test has been negative.", value: "NEGATIVE" },
                { display: "User has not been tested.", value: "NOTBEENTESTED" },
                { display: "User has been recovered.", value: "RECOVERED" },
            ],
            result: 'NONE',
            userId: '3JA3ubus7gAj2IuGZGQE',
            isUploading: false,
            errorMessage: ''
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
                                        <div className="text-center">
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
                            <button className="btn btn-primary float-right" type="submit" disabled={!this.isSaveEnabled()}>
                                {this.state.isUploading ?
                                    <Fragment>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading... </Fragment> :
                                    "Speichern"
                                }
                            </button>
                        </div>

                        {this.state.errorMessage &&
                            <span className="text-danger">
                                {this.state.errorMessage}
                            </span>}
                    </form>

                </div>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        const options = {
            headers: {
                'content-type': this.state.imageContentType,
                'testResult': this.state.result
            }
        };

        this.setState({ isUploading: true});


        const url = `${process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_API_DEPLOY_URL : process.env.REACT_APP_BASE_API_LOCAL_URL}/user/uploadResult?userID=${this.state.userId}`;

        console.log(url);

        axios.post(url, this.state.image, options)
            .then(e => {
                this.props.history.push('/overview');
            })
            .catch(e => {
                this.setState({ 
                    isUploading: false,
                    errorMessage: "Could not upload image, please try again." });
            });
    }

    handleSelectionChange(e) {
        this.setState({ result: e.target.value });
    }

    handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            this.setState({ imageLoadingProgressEnabled: true })

            reader.onload = (a) => {
                let mimeType2 = a.target.result.match(/[^:/]\w+(?=;|,)/)[0];
                this.setState({
                    image: a.target.result,
                    imageContentType: `image/${mimeType2}`,
                    imageLoadingProgressEnabled: false
                });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    isSaveEnabled() {
        return this.state.result && this.state.result !== 'NONE' && this.state.image;
    }
}

export default TestUpload;