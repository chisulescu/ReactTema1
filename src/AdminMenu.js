import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link, Route, Router, Switch} from "react-router-dom";
import AppNavbar from './Navbar'
import Jumbotron from './Jumbotron'
import SlideShow from './SlideShow'
import MedicalFacilityList from './MedicalFacilityList'
import Cookies from "universal-cookie";
import DoctorsListAdmin from "./DoctorsListAdmin"
import MedicalFacilityListAdmin from "./MedicalFacilityListAdmin"
import axios from "axios";
import {Button, Container} from "reactstrap";

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'home',
            brand: 'ReactStrap'
        };
        this.logout = this.logout.bind(this);

        const cookies = new Cookies();
        if(cookies.get("token")) {
            const token = cookies.get("token");
            axios
                .get(`/doctors/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.props.history.push('/adminLogin');
                    }
                });
        }else {
            this.props.history.push('/adminLogin');
        }
    };

    componentDidMount() {

    };

    logout() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .get(`/auth/logout/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
        window.location.reload();
    }

    render() {

        return (
            <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                <div className="float-right">
                    <Button size="bg" color="danger" tag={Link} to="/">Site</Button>{' '}
                    <Button size="bg" color="danger" tag={Link} to="/adminUsers">Users</Button>{' '}
                    <Button size="bg" color="danger" onClick={() => this.logout()}>Logout</Button>
                </div>
                <MedicalFacilityListAdmin />
                <DoctorsListAdmin />
            </Container>
        )
    }


}

export default AdminMenu;