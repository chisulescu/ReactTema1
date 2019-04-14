import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import FileBase64 from 'react-file-base64';

class UserPage extends Component {

    emptyItem = {
        name: '',
        email: '',
        affliction: '',
        profilePictureBase64: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            profile: this.emptyItem,
            email: "",
            isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }

    componentDidMount() {

        const cookies = new Cookies();
        var userId = cookies.get('user');
        console.log("getting cookie");
        if (!cookies.get('user'))
            this.props.history.push('/login');
        this.setState({email: cookies.get('email')});
        fetch(`api/user/` + userId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }})
            .then(response => {
                const contentType = response.headers.get("content-type");
                console.log("fetch");
                this.setState({ isLoading: false});
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                        .then(data => this.setState({profile: data, isLoading: false}));
                } else {

                    return response.text().then(text => {

                        console.log(text);
                        this.props.history.push('/login');
                    });

                }
            });
    }

    getFiles(files) {
        let profile = {...this.state.profile};
        let totalBase64 = files[0].base64;
        let lenght = totalBase64.length;
        profile.profilePictureBase64 = totalBase64.slice(23, lenght);
        console.log(profile);
        this.setState({profile});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let profile = {...this.state.profile};
        profile[name] = value;
        this.setState({profile});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let profile = {...this.state.profile};
        const cookies = new Cookies();
        profile.id = cookies.get('user');
        this.setState({profile: profile, isLoading: true});
        await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile),
        }).then(results => {
            return results.json();
        });
        console.log(profile);
        this.setState({isLoading: false});
        //window.location.reload();
    }

    render() {
        const {profile, email, isLoading} = this.state;
        //console.log(profile);
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        const cookies = new Cookies();
        let language = 'en.json';
        if (cookies.get('language')) {
            language = cookies.get('language');
        }
        let {titleUserPage, name, affliction, edit} = require('./' + language);
        return <div style={{"background-size": "cover", "height": "100%"}}>
            <Navbar/>
            <Container>
                <h2>{titleUserPage}</h2>
                <img style={{"border-radius": "8px", border: "1px solid #ddd", padding: "5px", margin: " 10px"}}
                     width={"170"} height={'170 '} src={`data:image/jpeg;base64,${profile.profilePictureBase64}`}
                     alt={"Logo"}/>
                {/*<img width={"150"} height={'170 '} src={'./neamtI.jpg'} alt={"Logo"}/>*/}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name"><b>{name}</b></Label>
                        <Input type="text" name="name" id="name" value={profile.name} onChange={this.handleChange}
                               autoComplete="name" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="affliction"><b>{affliction}</b></Label>
                        <Input type="text" name="affliction" id="affliction" value={profile.affliction}
                               onChange={this.handleChange} autoComplete="affliction" style={{width: "370px"}}/>
                    </FormGroup>
                    {/*<FormGroup>*/}
                    {/*<Label for="password"><b>Password</b></Label>*/}
                    {/*<Input type="password" name="password" id="password" value={profile.password} onChange={this.handleChange} autoComplete="password" style={{width: "370px"}}/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <Label for="email"><b>Email</b></Label>
                        <Input type="text" name="email" id="email" value={email} onChange={this.handleChange}
                               autoComplete="Confirm password" style={{width: "370px"}}/>
                    </FormGroup>
                    <FormGroup>
                        {/*<Input type="file" name="picture" id="picture" onChange={this.onDrop} autoComplete="Confirm password" style={{width: "370px"}}/>*/}
                        <FileBase64
                            multiple={true}
                            onDone={this.getFiles.bind(this)}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="danger" type="submit">{edit}</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default withRouter(UserPage);