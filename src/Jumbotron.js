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
        let Background= "geometric.jpg";
        var style = { margin: "10px"};
        return (
            <div className={(this.props.currentPage === 'home') ? 'jumbotron show' : 'jumbotron hide'} style={{ backgroundImage: `url(${Background})`}}>
                <div className="container"  >
                    <div style={{margin: '10px', padding: '10px', 'border-radius': '25px' , backgroundColor: 'white', opacity: 0.75}}><h1 style={style}>{jumboTitle}</h1>
                    <p ><b>{jumboText}</b></p></div>
                    <Button style={{margin: "10px"}} variant="outline-danger" size="lg" color="light" tag={Link} to={"/facilities"}>{jumboBtn}</Button>

                </div>
            </div>
        )
    }
}

export default Jumbotron;