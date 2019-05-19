import React from 'react';
import  './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navbar from './Navbar'
import Cookies from 'universal-cookie';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { Link } from 'react-router-dom';

class UsersListAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [], isLoading: true}
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .get(`/users/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => this.setState({users: response.data, isLoading: false}))
    }

    async deleteUser(id) {

        const cookies = new Cookies();
        const token = cookies.get('token');
        // console.log(`Token ${token}`);
        axios
            .delete(`/users/`+id + '/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));
        window.location.reload();
    };

    render() {
        const {users, isLoading} = this.state;

        const styles = {whiteSpace: 'nowrap', verticalAlign: "middle"};

        if (isLoading) {
            return <div id="app">
                <div  className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }



        const usersList = users.map(user => {

            return <tr key={user.id}>
                <td style={styles} >{user.name}</td>
                <td style={styles}>{user.email}</td>
                <td style={styles}>
                    <ButtonGroup >
                        <Button  size="bg" color="danger" onClick={() => this.deleteUser(user.id)}>Delete</Button>
                        {/*<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>

        });

        return (
            <div style={ { "background-size": "cover", "height": "100%"}}>
                {/*<Navbar/>*/}
                <Container fluid style={{width: "90%", backgroundColor: "white"}}>
                    <div className="float-right">
                        <Button color="danger" tag={Link} to="/adminMenu">Admin Menu</Button>{' '}
                        {/*<Button color="success" tag={Link} to="/carts">Carts</Button>{' '}*/}
                        {/*<Button color="primary" onClick={() => this.notify()}>Notify</Button>{' '}*/}

                    </div>
                    <h3 style={{"padding-top": "20px"}}>Users</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr >
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="20%"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersList}
                        </tbody>
                    </Table>
                    {/*<CommentList*/}
                    {/*loading={this.state.isLoading}*/}
                    {/*comments={comments}*/}
                    {/*/>*/}
                    {/*<CommentForm addComment={this.addComment}/>*/}
                </Container>

            </div>
        );
    }
}


export default UsersListAdmin;