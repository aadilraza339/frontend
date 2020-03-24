import React, { Component } from "react";
import Navbar from "./components/navbar";
import Page from "./components/page";
import "bootstrap/dist/css/bootstrap.min.css";
import Signups from "./pages/Signup";
import "./App.css";
import login from "./pages/login";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/profile";
import edit from "./components/edit";
import Homepage from "./components/Homepage";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Navbar} />

          <Route path="/home" component={Homepage} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit" component={edit} />

          <Route path="/login" component={login} />
          <Route path="/signup" component={Signups} />
          <Route component={Page} />
        </Switch>
      </div>
    );
  }
}
