import React from 'react';
import ReactJS, {Button} from 'reactstrap'
import './App.css';
import { Slide } from 'react-slideshow-image';

class SlideShow extends React.Component {


    render() {

        const properties = {
            duration: 10000,
            transitionDuration: 1000,
            infinite: true,
            arrows: true
        };

        return (
            <Slide {...properties} style={{height: "100%"}}>
                <div className="each-slide">
                    <div >
                        <img src={require('./images/lifechoices.jpg')} alt={"Logo"}/>

                    </div>
                </div>
                <div className="each-slide">
                    <div >
                        <img src={require('./images/grafitti3.jpg')} alt={"Logo"}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div >
                        <img src={require('./images/grafitti4.jpg')} alt={"Logo"}/>
                    </div>
                </div>
            </Slide>
        )    }
}

export default SlideShow;