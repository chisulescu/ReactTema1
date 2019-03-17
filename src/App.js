import React, {Component} from 'react';
import './App.css';
import AppNavbar from './Navbar'
import Jumbotron from './Jumbotron'
import MedicalFacilityList from './MedicalFacilityList'
import SlideShow from './SlideShow'
import Home from './Home'
import DoctorsList from './DoctorsList'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/facilities' exact={true} component={MedicalFacilityList}/>
                    <Route path='/slides' exact={true} component={SlideShow}/>
                    <Route path='/doctors' exact={true} component={DoctorsList}/>
                    {/*<Route path='/facility/:id' exact={true} component={BookEdit}/>*/}
                </Switch>
            </Router>
        )
    }

}

export default App;
