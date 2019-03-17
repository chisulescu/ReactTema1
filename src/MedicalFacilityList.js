import React from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from "universal-cookie";

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
        var data = require('./medicalFacilities.json');
        if (language === 'ro')
            data = require('./unitatiMedicale.json');
        console.log(data);
        this.setState({medicalFacilities: data, isLoading: false})
    }

    async seeDoctors(id) {

        const cookies = new Cookies();
        cookies.remove('medId');
        cookies.set('medId',id);
        this.props.history.push(`/doctors`);
    };

    render() {
        const {medicalFacilities, isLoading} = this.state;

        const styles = {whiteSpace: 'nowrap', verticalAlign: "middle"};
        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }

        let { title, name, address, type, doctors} = { title: 'Medical facilities', name: 'Name',address: 'Address', type: 'Type', doctors: 'Doctors'};

        if (language === 'ro') {
             title= 'Unitati medicale';
             name= 'Nume';
             address= 'Adresa';
             type= 'Tip';
             doctors= 'Doctori';


        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const medicalFacilityList = medicalFacilities.map(medicalFacility => {
            return <tr key={medicalFacility.id}>
                <td style={styles} ><img width={"200"} height={'117'} src={require('./images/' + medicalFacility.logo)} alt={"Logo"}/></td>
                <td style={styles} >{medicalFacility.name}</td>
                <td style={styles}>{medicalFacility.type}</td>
                <td style={styles}>{medicalFacility.address}</td>

                {/*<td style={{whiteSpace: 'nowrap'}}>{medicalFacility.}</td>*/}
                <td style={styles}>
                    <ButtonGroup >
                        <Button  size="sm" color="danger" onClick={() => this.seeDoctors(medicalFacility.id)}>{doctors}</Button>
                        {/*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>

        });

        return (
            <div>
                <Navbar/>
                <Container fluid>
                    <h3>{title}</h3>
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