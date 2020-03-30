import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { userContext } from './../../userContext'

import axios from 'axios';
import "./TestUpload.css"

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
            isUploading: false,
            errorMessage: '',

            results: [],
            selectedResultImage: null,
        }

        this.baseUrl = `${process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_API_DEPLOY_URL : process.env.REACT_APP_BASE_API_LOCAL_URL}/testResult`;

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.isSaveEnabled = this.isSaveEnabled.bind(this)

        this.loadImage = this.loadImage.bind(this);
    }

    static contextType = userContext

    componentDidMount() {
        const { user } = this.context;

        if (user.isLoggedIn && user.userId) {
            axios.get(`${this.baseUrl}/all?userID=${user.userId}`)
                .then((resp) => {
                    this.setState({ results: resp.data });
                })
                .catch(e => {
                    this.setState({
                        errorMessage: "Could not fetch data, please try again."
                    });
                });
        }
    }

    componentWillUnmount() {

    }

    render() {
        if (!this.context.user.isLoggedIn) return <Redirect to='/signin' />

        return (
            <div className="container">
                <div className="jumbotron bg-white">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 ">
                            <h2 className="display-4">New Result</h2>

                            <div className="testuploader">
                                <div className="container">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="resultImage" onChange={this.handleFileChange} accept="image/gif, image/jpeg, image/png" />
                                                <label className="custom-file-label" htmlFor="resultImage"> Choose a file...</label>
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
                                            <label className="form-label" htmlFor="resultSelect">Select result</label>
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
                                                    "Save"
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
                        </div>

                        <div className="col-xl-6 col-lg-12">
                            <h2 className="display-4">Recent Results</h2>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Result</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.results &&
                                        this.state.results.map(result =>
                                            <tr key={result.imageID}>
                                                <td>{result.createdAt}</td>
                                                <td>{result.result}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary" onClick={() => this.loadImage(result.imageID)}>
                                                        Show
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>

                            <div>

                                {this.state.selectedResultImage &&
                                    <img src={this.state.selectedResultImage} style={{ height: "500px" }} className="img-fluid" alt="" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        const { user } = this.context;

        e.preventDefault();

        const options = {
            headers: {
                "content-type": this.state.imageContentType,
                testResult: this.state.result
            }
        };

        this.setState({ isUploading: true });

        axios
            .post(`${this.baseUrl}/uploadImage?userID=${user.userId}`, this.state.image, options)
            .then(resp => {

                this.setState({ isUploading: false, errorMessage: "" });

                axios.get(`${this.baseUrl}/all?userID=${user.userId}`)
                    .then((resp) => {
                        this.setState({ results: resp.data });
                    })
                    .catch(e => {
                        this.setState({
                            errorMessage: "Could not fetch data, please try again."
                        });
                    });

            })
            .catch(e => {
                this.setState({
                    isUploading: false,
                    errorMessage: "Could not upload data, please try again."
                });
            });
    }

    handleSelectionChange(e) {
        this.setState({ result: e.target.value });
    }

    handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            this.setState({ imageLoadingProgressEnabled: true });

            reader.onload = a => {
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

    loadImage(imageId) {
        axios.get(`${this.baseUrl}/downloadImage?id=${imageId}`)
            .then((resp) => {
                this.setState({ selectedResultImage: resp.data });
            })
            .catch(e => {
                this.setState({
                    errorMessage: "Could not fetch data, please try again."
                });
            });
    }
}

export default TestUpload;
