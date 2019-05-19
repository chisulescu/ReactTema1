import React from 'react';
import  './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from 'universal-cookie';
import CommentForm from './CommentForm';
import CommentListAdmin from './CommentListAdmin';
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { Link } from 'react-router-dom';

class DoctorsListAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ratings: [],comments: [], doctors: [], isLoading: true}
        this.addComment = this.addComment.bind(this);
        this.deleteDoctor = this.deleteDoctor.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .get(`/doctors/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => this.setState({doctors: response.data.doctors, isLoading: false}))
        if(cookies.get("doctor_id")) {
            this.seeComments(cookies.get("doctor_id"))
        }
    }

    seeComments(id) {
        this.setState({isLoading: true});
        const cookies = new Cookies();
        cookies.remove("doctor_id");
        cookies.set("doctor_id",id);
        const token = cookies.get('token');
        axios
            .get(`/comments/doctor/` + id + "/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => this.setState({comments: response.data, isLoading: false}));
    }

    addComment(comment) {
        this.setState({
            loading: false,
            comments: [comment, ...this.state.comments]
        });
        // window.location.reload();
    }

    async deleteDoctor(id) {

        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .delete(`/doctors/`+id + '/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));
        window.location.reload();
    };

    render() {
        const {doctors, isLoading, comments} = this.state;

        const styles = {whiteSpace: 'nowrap', verticalAlign: "middle"};

        if (isLoading) {
            return <div id="app">
                <div  className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }

        const cookies = new Cookies();
        let language = 'en.json';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }
        console.log(doctors);
        let { titleDoctors, name, speciality, graduation} = require('./' + language);



        const doctorsList = doctors.map(doctors => {
            let encodedData = doctors.picturebase64;
            if(encodedData!=null && encodedData[0] === '9') {
                encodedData = '/' + encodedData;
            }
            const editLink = '/adminDoctor?type=edit&id=' + doctors.id;
            return <tr key={doctors.id}>
                <td style={styles} ><img width={"150"} height={'170 '} src={ `data:image/jpeg;base64,${encodedData}`} alt={"Logo"}/></td>
                <td style={styles}><StarRatingComponent
                    // value={this.state.comment.rating}
                    name="rating"
                    editing={false}

                    starCount={5}
                    value={doctors.rating}
                /></td>
                <td style={styles} >{doctors.name}</td>
                <td style={styles}>{doctors.speciality}</td>
                <td style={styles}>{doctors.graduationyear}</td>
                <td style={styles}>
                    <ButtonGroup >
                        <Button size="sm" color="danger" onClick={() => this.seeComments(doctors.id)}>Comments</Button>
                        <Button  size="bg" color="danger" onClick={() => this.deleteDoctor(doctors.id)}>Delete</Button>
                        <Button  size="bg" color="danger" tag={Link} to={editLink}>Edit</Button>
                        {/*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>

        });
        let Background = "geometric.jpg";

        //let comments=[{name: "Andrei", message: "Yes", time:"Yesterday"},{name: "Paul", message: "No", time:"Today"}];
        return (
            <div style={ { "background-size": "cover", "height": "100%"}}>
                {/*<Navbar/>*/}
                <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                    <div className="float-right">
                        <Button color="danger" tag={Link} to="/adminDoctor?type=add">Add Doctor</Button>{' '}
                        {/*<Button color="success" tag={Link} to="/carts">Carts</Button>{' '}*/}
                        {/*<Button color="primary" onClick={() => this.notify()}>Notify</Button>{' '}*/}

                    </div>
                    <h3 style={{"padding-top": "20px"}}>{titleDoctors}</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr >
                            <th width="30%"> </th>
                            <th width="20%">Rating</th>
                            <th width="30%">{name}</th>
                            <th width="30%">{speciality}</th>
                            <th width="30%">{graduation}</th>
                            <th width="20%"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctorsList}
                        </tbody>
                    </Table>
                    <CommentListAdmin
                        loading={this.state.isLoading}
                        comments={comments}
                    />
                    {/*<CommentForm addComment={this.addComment}/>*/}
                </Container>

            </div>
        );
    }
}


export default DoctorsListAdmin;