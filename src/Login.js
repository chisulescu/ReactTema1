import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';

class Login extends Component {

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
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
            .then(results => {
                return results.json();
            }).then(data => {
                if(data.message === "The given data was invalid.")
                {
                    this.setState({
                        error: data.message,
                        loading: false
                    });
                }
                else {
                    console.log(data[0].email);
                    const cookies = new Cookies();
                    cookies.set('user', data[0].id, { path: '/' });
                    cookies.set('email', data[0].email, { path: '/' });
                    cookies.set('userName',data[0].name);
                    this.props.history.push('/user');
                    //alert(item.username);

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
        const title = <h2>Login</h2>;
        let Background = "geometric.jpg";
        return <div style={ { "background-size": "cover", "height": "100%"}}>
            <Navbar/>
            <Container>
                <div style={{"padding-bottom": "40px"}}>{title}</div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username"><b>Username</b></Label>
                        <Input type="text" name="email" id="email" onChange={this.handleChange} autoComplete="email" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"><b>Password</b></Label>
                        <Input type="password" name="password" id="password" onChange={this.handleChange} autoComplete="password" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="danger" type="submit">Login</Button>{' '}
                        <Button color="danger" tag={Link} to="/register">Register</Button>
                    </FormGroup>
                </Form>
                {this.renderError()}
            </Container>

        </div>

    }
}
export default Login;