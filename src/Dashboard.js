import React, {Component} from "react";
import Navbar from "./Navbar";
import Geocode from "react-geocode";
class Dashboard extends Component {

    render() {
        return (
            <div>
            <Navbar/>
            <iframe
    src="http://localhost:3002/public/dashboard/25cb25d9-9684-47cd-8593-b405b66ed15e"
    frameBorder="0"
    width="1500"
    height="1000"
    allowTransparency
    />
            </div>
        )
    }
}

export default Dashboard;