import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import {Button, Container} from "reactstrap";
import axios from 'axios';
import Cookies from "universal-cookie";
import Navbar from './Navbar'


const MyMarker = props => {

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    };

    return <Marker ref={initMarker} {...props}/>
};

class MapApp extends Component {

    item = {
        start: null,
        end: null
    };
    state = {
        gpsPoints: [],
        markers: [],
        lat: 46.769496,
        lng: 23.588628,
        position: null,
        zoom: 15,
        isLoading: false,
        input: this.item
    };


    componentDidMount() {

        this.setState({isLoading: true});
        let input = {...this.state.input};
        const cookies = new Cookies();
        const token = cookies.get('token');
        axios
            .get(`/locations/` , {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => this.setState({gpsPoints: response.data, isLoading: false}));

        navigator.geolocation.getCurrentPosition(
            position => {
                //const location = JSON.stringify(position);
                console.log(position);
                this.setState({ position: [position.coords.latitude,position.coords.longitude] });
            },
            error => console.log('error at location'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }


    render() {
        const {gpsPoints, markers, isLoading,position} = this.state;

        // let lat = gpsPoints[0].latitude;
        // let lng = gpsPoints[0].longitude;
        // const position = [lat, lng];
        console.log(markers);
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }

        return (
            <div>
                <h2>Nearby facilities</h2>
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <MyMarker position={position}>
                    <Popup>
                        You are here
                    </Popup>
                </MyMarker>
                {/*<Polyline color={'red'} positions={markers}/>*/}
                { gpsPoints.map( gpsPoint =>
                    <Marker key={gpsPoint.id} position={[gpsPoint.latitude, gpsPoint.longitude]}>
                        <Popup>
                            {gpsPoint.address} <br/> {gpsPoint.name}
                        </Popup>
                    </Marker>

                )}

            </Map>
            </div>
        );
    }
}

export default MapApp;