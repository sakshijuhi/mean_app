import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
        this.showLoginFun = this.showLoginFun.bind(this);
    }

    showLoginFun(show) {
        this.setState({
            showLogin: show
        })
    }

    render() {
        return (
            <div>
                <div className="AppAside"> </div>
                <div className="AppForm">
                    <div className="PageSwitcher">
                        <a href="#" className="PageSwitcherItem" onClick={event => { this.showLoginFun(true) }}> Sign In </a>
                        <a href="#" className="PageSwitcherItem PageSwitcher__Item--Active" onClick={event => { this.showLoginFun(false) }}> Sign Up </a>
                    </div>

                    {this.state.showLogin ?
                        <SignInForm />
                        :
                        <SignUpForm showLogin={this.showLoginFun}/>
                    }
                </div>

            </div>
        );
    }




}

export default HomePage;