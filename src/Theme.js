import React from 'react';
import './App.css';
import Navbar from './Navbar'
import Jumbotron from './Jumbotron'
import MedicalFacilityList from './MedicalFacilityList'
import PropTypes from 'prop-types'

class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'home',
            brand: 'ReactStrap'
        };
    };
    handleChange = (page) => {
        this.setState({
            currentPage: page,
            brand: 'ReactStrap'
        });
    };
    handleChangeBrand = (name) => {
        this.setState({
            brand: name
        });
    };
    render() {
        var { jumboTitle, jumboText, jumboBtn } = this.props,
            { brand, currentPage } = this.state;
        return (
            <div>
                <Navbar currentPage={currentPage} brand={brand} change={this.handleChange}/>
                <Jumbotron currentPage={currentPage} jumboTitle={jumboTitle} jumboText={jumboText} jumboBtn={jumboBtn} changeBrand={this.handleChangeBrand}/>
                <MedicalFacilityList currentPage={currentPage} />
            </div>
        )
    }
}

export default Theme;

Theme.propTypes = {
    name: PropTypes.string
};

Theme.defaultProps = {
    jumboTitle: 'Hello World!',
    jumboText: 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.',
    jumboBtn: 'Learn React'
};