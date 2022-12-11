import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Internships from "./components/internships";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import auth from "./services/authService";
import InternshipPage from "./components/internshipPage";
import "react-toastify/dist/ReactToastify.css";

import './App.css';
class App extends Component {
  state={};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user}/>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/myInterestList" component={InternshipPage} />
            {/* <Route path="/internships/:id" component={InternshipPage} /> */}
            <Route path="/internships" component={Internships} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
