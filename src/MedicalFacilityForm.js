import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import FileBase64 from 'react-file-base64';
import queryString from 'query-string';
import axios from "axios";

class MedicalFacilityForm extends Component {

    emptyItem = {
        id: '',
        name: '',
        address: '',
        type: '',
        logobase64: ''
    };

    constructor(props) {
        super(props);


        this.state = {
            clinic: this.emptyItem,
            isLoading: true,
            type: '',
            token: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }

    componentDidMount() {

        const cookies = new Cookies();
        // var userId = cookies.get('user');
        //console.log("getting cookie");
        // if (!cookies.get('user'))
        //     this.props.history.push('/login');
        // this.setState({email: cookies.get('email')});
        const token = cookies.get('token');


        this.searchObj = queryString.parse(this.props.location.search);
        console.log(this.searchObj.type);
        this.setState({type: this.searchObj.type, token: token});
        if (this.searchObj.type === 'add') {

            this.setState({isLoading: false});
        } else {

            axios
                .get(`/medicalUnits/` + this.searchObj.id + '/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(response => this.setState({clinic: response.data, isLoading: false}))
                .catch(error => console.log(error));

            this.setState({isLoading: false});
        }
    }

    getFiles(files) {
        let clinic = {...this.state.clinic};
        let totalBase64 = files[0].base64;
        let lenght = totalBase64.length;
        clinic.logobase64 = totalBase64.slice(23, lenght);
        console.log(clinic);
        this.setState({clinic});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let clinic = {...this.state.clinic};
        clinic[name] = value;
        this.setState({clinic});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let clinic = {...this.state.clinic};
        let type = {...this.state.type};
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log(type);

        console.log('here');
        await axios
            .post('/medicalUnits/', clinic, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));

        this.props.history.push('/adminMenu')

        this.setState({isLoading: false});
        //window.location.reload();
    }

    async handleSubmitUpdate(event) {
        event.preventDefault();
        let clinic = {...this.state.clinic};
        let type = {...this.state.type};
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log(type);

        console.log(clinic.id);

        await axios
            .put('/medicalUnits/' + clinic.id + '/', clinic, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));

        this.props.history.push('/adminMenu')

        this.setState({isLoading: false});
        //window.location.reload();
    }

    render() {

        const {clinic, type, isLoading} = this.state;
        //console.log(profile);
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        console.log(clinic);
        console.log(clinic.logobase64);
        let encodedData = decodeURIComponent(clinic.logobase64);
        if (encodedData[0] === '9') {
            encodedData = '/' + encodedData;
        }
        if (type === 'edit') {
            return <div style={{"background-size": "cover", "height": "100%"}}>
                <Container>
                    <div className="float-right">
                        <Button size="bg" color="danger" tag={Link} to="/adminMenu">Admin Menu</Button>
                    </div>
                    <h2>Edit clinic</h2>
                    <img style={{"border-radius": "8px", border: "1px solid #ddd", padding: "5px", margin: " 10px"}}
                         width={"200"} height={'117 '} src={`data:image/jpeg;base64,${encodedData}`}
                         alt={"Picture"}/>
                    <Form onSubmit={this.handleSubmitUpdate}>
                        <FormGroup>
                            <Label for="id"><b>Id</b></Label>
                            <Input type="text" name="id" id="id" value={clinic.id} onChange={this.handleChange}
                                   autoComplete="id" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name"><b>Name</b></Label>
                            <Input type="text" name="name" id="name" value={clinic.name} onChange={this.handleChange}
                                   autoComplete="name" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type"><b>Type</b></Label>
                            <Input type="text" name="type" id="type" value={clinic.type} onChange={this.handleChange}
                                   autoComplete="Type" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address"><b>Address</b></Label>
                            <Input type="text" name="address" id="address" value={clinic.address}
                                   onChange={this.handleChange}
                                   autoComplete="Address" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            {/*<Input type="file" name="picture" id="picture" onChange={this.onDrop} autoComplete="Confirm password" style={{width: "370px"}}/>*/}
                            <FileBase64
                                multiple={true}
                                onDone={this.getFiles.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="danger" type="submit">Apply</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        } else {
            return <div style={{"background-size": "cover", "height": "100%"}}>
                <Container>
                    <h2>Add clinic</h2>
                    <div className="float-right">
                        <Button size="bg" color="danger" tag={Link} to="/adminMenu">Admin Menu</Button>
                    </div>
                    <img style={{"border-radius": "8px", border: "1px solid #ddd", padding: "5px", margin: " 10px"}}
                         width={"200"} height={'117 '} src={`data:image/jpeg;base64,${encodedData}`}
                         alt={"Picture"}/>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name"><b>Name</b></Label>
                            <Input type="text" name="name" id="name" value={clinic.name} onChange={this.handleChange}
                                   autoComplete="name" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type"><b>Type</b></Label>
                            <Input type="text" name="type" id="type" value={clinic.type} onChange={this.handleChange}
                                   autoComplete="Type" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address"><b>Address</b></Label>
                            <Input type="text" name="address" id="address" value={clinic.address}
                                   onChange={this.handleChange}
                                   autoComplete="Address" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            {/*<Input type="file" name="picture" id="picture" onChange={this.onDrop} autoComplete="Confirm password" style={{width: "370px"}}/>*/}
                            <FileBase64
                                multiple={true}
                                onDone={this.getFiles.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="danger" type="submit">Apply</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        }
    }

}

export default withRouter(MedicalFacilityForm);