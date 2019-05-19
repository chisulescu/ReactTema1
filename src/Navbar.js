import React from 'react';
import {Button, ButtonGroup, Collapse, Nav, Navbar, NavbarBrand} from 'reactstrap';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";

export default class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
        AppNavbar.logout = AppNavbar.logout.bind(this);
        AppNavbar.changeLanguage = AppNavbar.changeLanguage.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

     static async changeLanguage(language) {

        const cookies = new Cookies();
        cookies.remove('language');
        cookies.set('language', language);
        window.location.reload();
    };

     static async logout() {

        await fetch(`/api/logout`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
         window.location.reload();
    };

    render() {

        const cookies = new Cookies();
        let language = 'en.json';
        if(cookies.get('language')) {
           language = cookies.get('language');
        }
        let {home, facilities, doctors, english, romanian, logout, user, login} = require("./"+language);

        return <Navbar dark expand="md">
            <NavbarBrand tag={Link} to="/">{home}</NavbarBrand>
            <NavbarBrand tag={Link} to="/facilities">{facilities}</NavbarBrand>
            <NavbarBrand tag={Link} to="/doctors">{doctors}</NavbarBrand>
            <NavbarBrand tag={Link} to="/user">{user}</NavbarBrand>
            <NavbarBrand tag={Link} to="/dashboard">Dashboard</NavbarBrand>
            {/*<NavbarBrand tag={Link} to="/login">{login}</NavbarBrand>*/}
            {/*<NavbarToggler onClick={this.toggle}>here</NavbarToggler>*/}
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <ButtonGroup  >
                        <Button variant="outlined" size="sm" color="light"  onClick={() => AppNavbar.changeLanguage('en.json')}>{english}</Button>{' '}
                        <Button size="sm" color="light" onClick={() => AppNavbar.changeLanguage('ro.json')}>{romanian}</Button>
                        <div style={{ width: '5px'}} />
                        <Button  size="sm" color="light"  onClick={() => AppNavbar.logout()}>{logout}</Button>
                    </ButtonGroup>
                    <ButtonGroup >

                    </ButtonGroup>
                </Nav>

            </Collapse>
        </Navbar>
    }
}
