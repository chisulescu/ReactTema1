import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import FileBase64 from 'react-file-base64';
import queryString from 'query-string';
import axios from "axios";

class DoctorForm extends Component {

    emptyItem = {
        id: '',
        name: '',
        speciality: '',
        graduationyear: '',
        picturebase64: ''
    };

    emptyItemFacility = {
        id: '',
        name: '',
    };

    constructor(props) {
        super(props);


        this.state = {
            doctor: this.emptyItem,
            isLoading: true,
            type: '',
            token: '',
            assignFacility: '',
            facilities: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleChangeAssignFacility = this.handleChangeAssignFacility.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.handleAssign = this.handleAssign.bind(this);
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
        //console.log(this.searchObj.type);
        this.setState({type: this.searchObj.type, token: token});
        axios
            .get(`/medicalUnits/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => {
                //console.log(response.data.medicalUnits);
                this.setState( {facilities: response.data.medicalUnits})})
            .catch(error => console.log(error));
        if (this.searchObj.type === 'add') {

            this.setState({isLoading: false});
        } else {

            axios
                .get(`/doctors/` + this.searchObj.id + '/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(response => this.setState({doctor: response.data, isLoading: false}))
                .catch(error => console.log(error));



            this.setState({isLoading: false});
        }
    }

    getFiles(files) {
        let doctor = {...this.state.doctor};
        let totalBase64 = files[0].base64;
        let lenght = totalBase64.length;
        doctor.picturebase64 = totalBase64.slice(23, lenght);
        //console.log(doctor);
        this.setState({doctor});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let doctor = {...this.state.doctor};
        doctor[name] = value;
        this.setState({doctor});
    }

    handleChangeAssignFacility(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let assignFacility = {...this.state.assignFacility};
        assignFacility[name] = value;
        console.log(assignFacility);
        this.setState({assignFacility: assignFacility});
        console.log(this.state)
    }

    async handleSubmit(event) {
        event.preventDefault();
        let doctor = {...this.state.doctor};
        let type = {...this.state.type};
        const cookies = new Cookies();
        const token = cookies.get('token');
        //console.log(type);
        await axios
            .post('/doctors/', doctor, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));

        this.props.history.push('/adminMenu');

        this.setState({isLoading: false});

    }

    async handleAssign(event) {
        event.preventDefault();
        let assignFacility = {...this.state.assignFacility};
        let doctor = {...this.state.doctor};
        const cookies = new Cookies();
        const token = cookies.get('token');
        let body = ({doctorId: doctor.id, medId: assignFacility.assignFacility});
        //console.log(type);
        await axios
            .post('/assign/', body, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));

        this.props.history.push('/adminMenu');



    }

    async handleSubmitUpdate(event) {
        event.preventDefault();
        let doctor = {...this.state.doctor};
        //let type = {...this.state.type};
        const cookies = new Cookies();
        const token = cookies.get('token');
        //console.log(type);

        //console.log(doctor.id);

        await axios
            .put('/doctors/' + doctor.id + '/', doctor, {
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

        const {doctor, type, isLoading, assignFacility, facilities} = this.state;
        let facilitiesSelect = facilities.map(facility => {
            //console.log(facility);
            return <option key={facility.name} value={facility.id} >{facility.name}</option>;
        });
        //console.log(profile);
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }

        let encodedData = decodeURIComponent(doctor.picturebase64);
        if (encodedData[0] === '9') {
            encodedData = '/' + encodedData;
        }
        if (type === 'edit') {

            return <div style={{"background-size": "cover", "height": "100%"}}>
                <Container>
                    <div className="float-right">
                        <Button size="bg" color="danger" tag={Link} to="/adminMenu">Admin Menu</Button>
                    </div>
                    <h2>Edit doctor</h2>
                    <img style={{"border-radius": "8px", border: "1px solid #ddd", padding: "5px", margin: " 10px"}}
                         width={"150"} height={'170 '} src={`data:image/jpeg;base64,${encodedData}`}
                         alt={"Picture"}/>
                    <Form onSubmit={this.handleSubmitUpdate}>
                        <FormGroup>
                            <Label for="id"><b>Id</b></Label>
                            <Input type="text" name="id" id="id" value={doctor.id} onChange={this.handleChange}
                                   autoComplete="id" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name"><b>Name</b></Label>
                            <Input type="text" name="name" id="name" value={doctor.name} onChange={this.handleChange}
                                   autoComplete="name" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="speciality"><b>Speciality</b></Label>
                            <Input type="text" name="speciality" id="speciality" value={doctor.speciality} onChange={this.handleChange}
                                   autoComplete="Speciality" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="graduationyear"><b>Graduation Year</b></Label>
                            <Input type="text" name="graduationyear" id="graduationyear" value={doctor.graduationyear}
                                   onChange={this.handleChange}
                                   autoComplete="Graduationyear" style={{width: "370px"}}/>
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
                    <Form onSubmit={this.handleAssign}>
                        <FormGroup>
                            <Label for="assignHospital"><b>Assign to facility</b></Label>
                            <div> </div>
                            <select  name="assignFacility" id="assignFacility" value={assignFacility}
                                     onClick={this.handleChangeAssignFacility} autoComplete="assignFacility" style={{height: "40px", width: "370px"}}>
                                {facilitiesSelect}

                            </select>
                            {/*<Input type="text" name="affliction" id="affliction" value={profile.affliction}*/}
                            {/*onChange={this.handleChange} autoComplete="affliction" style={{width: "370px"}}/>*/}
                        </FormGroup>

                    <FormGroup>
                        <Button color="danger" type="submit">Assign</Button>
                    </FormGroup>
                    </Form>
                </Container>
            </div>
        } else {
            return <div style={{"background-size": "cover", "height": "100%"}}>
                <Container>
                    <div className="float-right">
                        <Button size="bg" color="danger" tag={Link} to="/adminMenu">Admin Menu</Button>
                    </div>
                    <h2>Add doctor</h2>
                    <img style={{"border-radius": "8px", border: "1px solid #ddd", padding: "5px", margin: " 10px"}}
                         width={"150"} height={'170 '} src={`data:image/jpeg;base64,${encodedData}`}
                         alt={"Picture"}/>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name"><b>Name</b></Label>
                            <Input type="text" name="name" id="name"  onChange={this.handleChange}
                                   autoComplete="name" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="speciality"><b>Speciality</b></Label>
                            <Input type="text" name="speciality" id="speciality"  onChange={this.handleChange}
                                   autoComplete="Speciality" style={{width: "370px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="graduationyear"><b>Graduation Year</b></Label>
                            <Input type="text" name="graduationyear" id="graduationyear"
                                   onChange={this.handleChange}
                                   autoComplete="Graduation year" style={{width: "370px"}}/>
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

export default withRouter(DoctorForm);