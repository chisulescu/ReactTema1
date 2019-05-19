import React, {Component} from 'react';
import './App.css';
import AppNavbar from './Navbar'
import Jumbotron from './Jumbotron'
import MedicalFacilityList from './MedicalFacilityList'
import SlideShow from './SlideShow'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import DoctorsList from './DoctorsList'
import UserPage from './UserPage'
import PropTypes from 'prop-types'
import AdminLogin from './AdminLogin'
import axios from 'axios'
import MedicalFacilityForm from './MedicalFacilityForm'
import AdminMenu from "./AdminMenu"
import DoctorForm from "./DoctorForm"
import UsersListAdmin from "./UsersListAdmin"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./Dashboard";
import MapContainer from "./MapContainer";

class App extends Component {

    componentWillMount() {
        axios.defaults.baseURL = 'http://127.0.0.1:8001/api';
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/facilities' exact={true} component={MedicalFacilityList}/>
                    <Route path='/slides' exact={true} component={SlideShow}/>
                    <Route path='/doctors' exact={true} component={DoctorsList}/>
                    <Route path='/login' exact={true} component={Login}/>
                    <Route path='/register' exact={true} component={Register}/>
                    <Route path='/user' exact={true} component={UserPage}/>
                    <Route path='/adminLogin' exact={true} component={AdminLogin}/>
                    <Route path='/adminMenu' exact={true} component={AdminMenu}/>
                    <Route path='/adminMedical' exact={true} component={MedicalFacilityForm}/>
                    <Route path='/adminDoctor' exact={true} component={DoctorForm}/>
                    <Route path='/adminUsers' exact={true} component={UsersListAdmin}/>
                    <Route path='/dashboard' exact={true} component={Dashboard}/>
                    <Route path='/map' exact={true} component={MapContainer}/>
                </Switch>
            </Router>
        )
    }

}

export default App;
