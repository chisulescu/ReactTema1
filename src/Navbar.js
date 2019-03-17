import React from 'react';
import {Button, ButtonGroup, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";

export default class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async changeLanguage(language) {

        const cookies = new Cookies();
        cookies.remove('language');
        cookies.set('language', language);
        window.location.reload();
    };

    render() {

        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
           language = cookies.get('language');
        }

        let home = 'Home';
        let facilities = 'Facilities';
        let doctors = 'Doctors';
        let english = 'English';
        let romanian = 'Romanian';

        if (language === 'ro') {
            home = 'Acasa';
            facilities = 'Unitati';
            doctors = 'Doctori';
            english = 'Engleza';
            romanian = 'Romana';
        }

        return <Navbar dark expand="md">
            <NavbarBrand tag={Link} to="/">{home}</NavbarBrand>
            <NavbarBrand tag={Link} to="/facilities">{facilities}</NavbarBrand>
            <NavbarBrand tag={Link} to="/doctors">{doctors}</NavbarBrand>
            {/*<NavbarToggler onClick={this.toggle}>here</NavbarToggler>*/}
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <ButtonGroup >
                        <Button variant="outlined" size="sm" color="light"  onClick={() => this.changeLanguage('en')}>{english}</Button>
                        <Button size="sm" color="light" onClick={() => this.changeLanguage('ro')}>{romanian}</Button>
                    </ButtonGroup>
                </Nav>

            </Collapse>
        </Navbar>
    }
}
