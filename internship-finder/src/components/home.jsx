import React, { Component } from 'react';


class Home extends Component {
    render() { 
        return (<div>
            <h1>Welcome to Internshipper!</h1>
            <p>Tired of spending all your time combing the internet for internships like this?</p>
            <img src={require("./messy.png")} width = "800"/>
            <p>Only to find out some of them are only for college students?</p>
            <p>Come register now to get started on a much easier time searching for internships for highschool students!</p>
        </div>);
    }
}
 
export default Home;