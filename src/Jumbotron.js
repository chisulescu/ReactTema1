import React from 'react';
import ReactJS, {Button} from 'reactstrap'
import './App.css';
import {Link} from "react-router-dom";

class Jumbotron extends React.Component {
    changeBrand(brandName) {
        this.props.changeBrand(brandName);
    }
    render() {
        var { jumboTitle, jumboText, jumboBtn } = this.props;
        var style = {color: "black"};
        return (
            <div className={(this.props.currentPage === 'home') ? 'jumbotron show' : 'jumbotron hide'}>
                <div className="container" >
                    <h1 style={style}>{jumboTitle}</h1>
                    <p style={style}>{jumboText}</p>
                    <Button variant="outline-danger" size="lg" color="light" tag={Link} to={"/facilities"}>{jumboBtn}</Button>

                </div>
            </div>
        )
    }
}

export default Jumbotron;