import React from 'react';
import  './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from 'universal-cookie';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StarRatingComponent from 'react-star-rating-component';

class DoctorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ratings: [],comments: [], doctors: [], isLoading: true}
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookies();
        var medId= cookies.get('medId');
        if (!cookies.get('medId'))
            this.props.history.push('/facilities');
        console.log(`/api/doctors/medicalUnit/` + medId);
        fetch(`/api/doctors/medicalUnit/` + medId)
            .then(response => response.json())
            .then(data => this.setState({doctors: data, isLoading: false}));
        if(cookies.get("doctor_id")) {
            this.seeComments(cookies.get("doctor_id"))
        }
    }

    seeComments(id) {
        this.setState({isLoading: true});
        const cookies = new Cookies();
        cookies.remove("doctor_id");
        cookies.set("doctor_id",id);
        fetch(`/api/comments/doctor/` + id)
            .then(response => response.json())
            .then(data => this.setState({comments: data, isLoading: false}));
        fetch(`/api/comments/doctor/` + id)
            .then(response => response.json())
            .then(data => this.setState({comments: data, isLoading: false}));
    }

      getDoctorRating(id) {

        // let rating = await fetch(`/api/rating/doctor/` + id)
        //     .then(response => response.json())
        //     .then(data => this.setState({rating: data.rating}));
        return 3;
    }

    addComment(comment) {
        this.setState({
            loading: false,
            comments: [comment, ...this.state.comments]
        });
        // window.location.reload();
    }

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
        console.log(doctors.id);
        let { titleDoctors, name, speciality, graduation} = require('./' + language);

        const hospitalName = cookies.get('hospital');
        const doctorsList = doctors.map(doctors => {
            return <tr key={doctors.id}>
                <td style={styles} ><img width={"150"} height={'170 '} src={ `data:image/jpeg;base64,${doctors.pictureBase64}`} alt={"Logo"}/></td>
                <td style={styles}><StarRatingComponent
                    // value={this.state.comment.rating}
                    name="rating"
                    editing={false}

                    starCount={5}
                    value={doctors.rating}
                /></td>
                <td style={styles} >{doctors.name}</td>
                <td style={styles}>{doctors.speciality}</td>
                <td style={styles}>{doctors.graduationYear}</td>

                <td style={styles}><Button size="sm" color="danger" onClick={() => this.seeComments(doctors.id)}>Comments</Button></td>

            </tr>

        });
        let Background = "geometric.jpg";

        //let comments=[{name: "Andrei", message: "Yes", time:"Yesterday"},{name: "Paul", message: "No", time:"Today"}];
        return (
            <div style={ { "background-size": "cover", "height": "100%"}}>
                <Navbar/>
                <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                    <div className="float-right">
                    {/*<Button color="success" tag={Link} to="/books/new">Add Book</Button>{' '}*/}
                    {/*<Button color="success" tag={Link} to="/carts">Carts</Button>{' '}*/}
                    {/*<Button color="primary" onClick={() => this.notify()}>Notify</Button>{' '}*/}

                </div>
                    <h3 style={{"padding-top": "20px"}}>{titleDoctors} {hospitalName}</h3>
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
                    <CommentList
                        loading={this.state.isLoading}
                        comments={comments}
                    />
                    <CommentForm addComment={this.addComment}/>
                </Container>

            </div>
        );
    }
}


export default DoctorsList;