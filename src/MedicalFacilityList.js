import React from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from "universal-cookie";
import CommentForm from './CommentForm'

class MedicalFacilityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {medicalFacilities: [], isLoading: true}
        this.seeDoctors = this.seeDoctors.bind(this);

    }

    componentDidMount() {
        this.setState({isLoading: true});

        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }
        fetch(`/api/medicalUnits`)
            .then(response =>{
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                        .then(data => this.setState({medicalFacilities: data, isLoading: false}));
                }
                else {

                    return response.text().then(text => {
                        console.log(text);
                        this.props.history.push('/');
                    });

                }
            })

            // .catch(() => this.props.history.push('/'));
        // var data = require('./medicalFacilities.json');
        // if (language === 'ro.json')
        //     data = require('./unitatiMedicale.json');
        // console.log(data);
        // this.setState({medicalFacilities: data, isLoading: false})
    }

    async seeDoctors(id, hospitalName) {

        const cookies = new Cookies();
        cookies.remove('medId');
        cookies.set('medId',id);
        cookies.remove('hospital');
        cookies.set('hospital', hospitalName);
        this.props.history.push(`/doctors`);
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

        // if (language === 'ro') {
        //      title= 'Unitati medicale';
        //      name= 'Nume';
        //      address= 'Adresa';
        //      type= 'Tip';
        //      doctors= 'Doctori';
        //
        //
        // }

        if (isLoading) {
            return <div id="app">
                <div  className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        console.log(medicalFacilities);
        const medicalFacilityList = medicalFacilities.map(medicalFacility => {
            const encodedData = medicalFacility.logoBase64;
            console.log(`data:image/jpg;base64,${encodedData}`);
            return <tr key={medicalFacility.id}>
                <td style={styles} ><img width={"200"} height={'117'} src={ `data:image/jpeg;base64,${encodedData}`} alt={"Logo"}/></td>
                <td style={styles} >{medicalFacility.name}</td>
                <td style={styles}>{medicalFacility.type}</td>
                <td style={styles}>{medicalFacility.address}</td>

                {/*<td style={{whiteSpace: 'nowrap'}}>{medicalFacility.}</td>*/}
                <td style={styles}>
                    <ButtonGroup >
                        <Button  size="bg" color="danger" onClick={() => this.seeDoctors(medicalFacility.id, medicalFacility.name)}>{doctors}</Button>
                        {/*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>

        });
        let Background = "geometric.jpg";
        return (
            <div style={ { height: "100%"}}>
                <Navbar/>
                <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                    <h3 style={{"padding-top": "20px"}}>{titleMedical}</h3>
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


export default MedicalFacilityList;