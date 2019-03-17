import React from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from 'universal-cookie';

class DoctorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {doctors: [], isLoading: true}

    }

    componentDidMount() {
        this.setState({isLoading: true});
        const cookies = new Cookies();
        var medId= cookies.get('medId');
        var data = require('./doctors.json');
        if (!cookies.get('medId'))
            this.props.history.push('/facilities');
        var filteredData = data.filter( doctor => doctor.mdId === medId);

        this.setState({doctors: filteredData, isLoading: false})
    }

    render() {
        const {doctors, isLoading} = this.state;

        const styles = {whiteSpace: 'nowrap', verticalAlign: "middle"};

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }

        let { title, name, speciality, graduation} = { title: 'Doctors', speciality: 'Medical Speciality',name: 'Name', graduation: 'Graduation Year'};

        if (language === 'ro') {
            title= 'Doctori';
            name= 'Nume';
            speciality= 'Specializare';
            graduation= 'An absolvire';

        }

        const doctorsList = doctors.map(doctors => {
            return <tr key={doctors.id}>
                <td style={styles} ><img width={"150"} height={'170 '} src={require('./images/' +doctors.picture )} alt={"Logo"}/></td>
                <td style={styles} >{doctors.name}</td>
                <td style={styles}>{doctors.speciality}</td>
                <td style={styles}>{doctors.graduationYear}</td>

                {/*<td style={{whiteSpace: 'nowrap'}}>{medicalFacility.}</td>*/}
                {/*<td style={styles}>*/}
                    {/*<ButtonGroup >*/}
                        {/*<Button  size="sm" color="danger" tag={Link} to={"/books/" + book.id}>Edit</Button>*/}
                        {/*/!*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*!/*/}
                    {/*</ButtonGroup>*/}
                {/*</td>*/}
            </tr>

        });

        return (
            <div>
                <Navbar/>
                <Container fluid>
                    {/*<div className="float-right">*/}
                    {/*<Button color="success" tag={Link} to="/books/new">Add Book</Button>{' '}*/}
                    {/*<Button color="success" tag={Link} to="/carts">Carts</Button>{' '}*/}
                    {/*<Button color="primary" onClick={() => this.notify()}>Notify</Button>{' '}*/}
                    {/*<Button color="danger" onClick={() => this.logOut()}>Log out</Button>*/}
                    {/*</div>*/}
                    <h3>{title}</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%"> </th>
                            <th width="30%">{name}</th>
                            <th width="40%">{speciality}</th>
                            <th width="20%">{graduation}</th>
                            {/*<th width="20%">Staff</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {doctorsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default DoctorsList;