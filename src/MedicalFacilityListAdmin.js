import React from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import axios from "axios";

class MedicalFacilityListAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {medicalFacilities: [], isLoading: true}
        this.deleteClinic = this.deleteClinic.bind(this);

    }

    componentDidMount() {
        this.setState({isLoading: true});

        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }

        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .get(`/medicalUnits/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => this.setState({medicalFacilities: response.data.medicalUnits, isLoading: false}))
            .catch(error => console.log(error));
    }

    async deleteClinic(id) {

        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .delete(`/medicalUnits/`+id + '/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));
        window.location.reload();
    };

    render() {
        const {medicalFacilities, isLoading} = this.state;

        const styles = {whiteSpace: 'nowrap', verticalAlign: "middle"};
        const cookies = new Cookies();
        let language = 'en.json';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }
        console.log("limba "+ language);
        let { titleMedical, name, address, type, doctors} = require('./' + language);

        if (isLoading) {
            return <div id="app">
                <div  className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        console.log(medicalFacilities);
        const medicalFacilityList = medicalFacilities.map(medicalFacility => {
            let encodedData = decodeURIComponent(medicalFacility.logobase64);
            if(encodedData[0] === '9') {
                encodedData = '/' + encodedData;
            }
            const editLink = '/adminMedical?type=edit&id=' + medicalFacility.id;
            console.log(`data:image/jpg;base64,${encodedData}`);
            return <tr key={medicalFacility.id}>
                <td style={styles} ><img width={"200"} height={'117'} src={ `data:image/jpeg;base64,${encodedData}`} alt={"Logo"}/></td>
                <td style={styles} >{medicalFacility.name}</td>
                <td style={styles}>{medicalFacility.type}</td>
                <td style={styles}>{medicalFacility.address}</td>

                {/*<td style={{whiteSpace: 'nowrap'}}>{medicalFacility.}</td>*/}
                <td style={styles}>
                    <ButtonGroup >
                        <Button  size="bg" color="danger" onClick={() => this.deleteClinic(medicalFacility.id)}>Delete</Button>
                        <Button  size="bg" color="danger" tag={Link} to={editLink}>Edit</Button>
                        {/*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>

        });
        let Background = "geometric.jpg";
        return (
            <div style={ { height: "100%"}}>
                {/*<Navbar/>*/}
                <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                    <h3 style={{"padding-top": "20px"}}>{titleMedical}</h3>
                    <div className="float-right">
                        <Button  size="bg" color="danger" tag={Link} to="/adminMedical?type=add">Add clinic</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%"></th>
                            <th width="40%">{name}</th>
                            <th width="20%">{type}</th>
                            <th width="40%">{address}</th>
                            {/*<th width="20%">Staff</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {medicalFacilityList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default MedicalFacilityListAdmin;