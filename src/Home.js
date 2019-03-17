import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Route, Router, Switch} from "react-router-dom";
import AppNavbar from './Navbar'
import Jumbotron from './Jumbotron'
import SlideShow from './SlideShow'
import MedicalFacilityList from './MedicalFacilityList'
import Cookies from "universal-cookie";

class Home extends Component {
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
        const cookies = new Cookies();
        let language = 'en';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }

        var { jumboTitleEnglish, jumboTextEnglish, jumboBtnEnglish, jumboTitleRomanian, jumboTextRomanian, jumboBtnRomanian } = this.props,
            { brand, currentPage } = this.state;
        var { jumboTitle, jumboText, jumboBtn} = {jumboTitle: jumboTitleEnglish, jumboBtn: jumboBtnEnglish, jumboText: jumboTextEnglish};
        if (language === 'ro') {
            jumboTitle = jumboTitleRomanian;
            jumboText = jumboTextRomanian;
            jumboBtn = jumboBtnRomanian;
        }


        const styles = { verticalAlign: "middle", margin: 'auto'};
        return (
            <div>
                <AppNavbar currentPage={currentPage} brand={brand} change={this.handleChange}/>
                <Jumbotron currentPage={currentPage} jumboTitle={jumboTitle} jumboText={jumboText} jumboBtn={jumboBtn} changeBrand={this.handleChangeBrand}/>
                {/*<img style={styles} src={require('./images/lifechoices.jpg')} alt={"Logo"}/>*/}
                <SlideShow/>
                {/*<MedicalFacilityList currentPage={currentPage} />*/}
            </div>
        )
    }
}


Home.propTypes = {
    name: PropTypes.string
};

Home.defaultProps = {
    jumboTitleEnglish: 'Welcome!',
    jumboTextEnglish: 'This site contains a list of all the most important medical facilities in Cluj-Napoca and the doctors that work there.',
    jumboBtnEnglish: 'See more',
    jumboTitleRomanian: 'Bine ati venit!',
    jumboTextRomanian: 'Acest site contine o lista cu cele mai importante unitati medicale din Cluj-Napoca si doctorii care lucreaza acolo.',
    jumboBtnRomanian: 'Vezi mai multe'
};

export default Home;