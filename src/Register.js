import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
class Register extends Component {

    emptyItem = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(props){
        super(props);
        this.state={
            item: this.emptyItem
        };
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

        await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(results => {
            return results.json();
        }).then(data => {
            if(data.message ) {
                if (data.errors) {
                    if (data.errors.email !== undefined)
                        this.setState({
                            error: data.errors.email,
                            loading: false
                        });
                    if (data.errors.password !== undefined)
                        this.setState({
                            error: data.errors.password,
                            loading: false
                        });
                }
                else {
                    this.setState({
                        error: data.message,
                        loading: false
                    });
                }
            }
            else {
                this.setState({
                    error: 'User registered',
                    loading: false
                });
                this.props.history.push('/login');


            }

        });
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {
        const {item} = this.state;
        const title = <h2>Register</h2>;
        let Background = "geometric.jpg";
        return <div style={ { "background-size": "cover", "height": "100%"}}>
            <Navbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name"><b>Username</b></Label>
                        <Input type="text" name="name" id="name" onChange={this.handleChange} autoComplete="name" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email"><b>Email</b></Label>
                        <Input type="text" name="email" id="email" onChange={this.handleChange} autoComplete="email" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"><b>Password</b></Label>
                        <Input type="password" name="password" id="password" onChange={this.handleChange} autoComplete="password" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password_confirmation"><b>Confirm password</b></Label>
                        <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.handleChange} autoComplete="Confirm password" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="danger" type="submit">Register</Button>{' '}
                        <Button color="danger" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
                {this.renderError()}
            </Container>
        </div>
    }

}

export default withRouter(Register);