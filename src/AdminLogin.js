import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
class AdminLogin extends Component {

    emptyItem = {
        username: '',
        password: ''
    };

    constructor(props){
        super(props);
        this.state={
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        axios
            .post(`/auth/login/`, item)
            .then(response => {
                const { token } = response.data;
                // We set the returned token as the default authorization header
                const cookies = new Cookies();
                cookies.set('token',token);
                // axios.defaults.headers.common['Authorization'] = `Token ${token}`;
                // console.log(axios.defaults.headers);
                // // Navigate to the home screen
                // console.log(token)
                this.props.history.push('/adminMenu');
            })
            .catch(error => console.log(error));
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {
        const {item} = this.state;
        const title = <h2>Login as admin</h2>;
        let Background = "geometric.jpg";
        return <div style={ { "background-size": "cover", "height": "100%"}}>
            <Container>
                <div style={{"padding-bottom": "40px"}}>{title}</div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username"><b>Username</b></Label>
                        <Input type="text" name="username" id="username" onChange={this.handleChange} autoComplete="username" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"><b>Password</b></Label>
                        <Input type="password" name="password" id="password" onChange={this.handleChange} autoComplete="password" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="danger" type="submit">Login</Button>{' '}
                    </FormGroup>
                </Form>
                {this.renderError()}
            </Container>

        </div>

    }
}
export default AdminLogin;