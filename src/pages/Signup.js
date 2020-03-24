import React, { Component } from "react";
import axios from "axios";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navgurukul_logo from "../components/navgurukul.png";

var validEmailRe = RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:s@\"]{2,})$/i
);

class Register extends Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      email: "",
      password: "",
      errors: {
        Username: "",
        email: "",
        password: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  validateUsername = userName => {
    return userName && userName.length >= 5;
  };
  onChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;
    const newErros = { ...errors };
    switch (name) {
      case "Username":
        newErros.Username = this.validateUsername(value)
          ? ""
          : "Full Name must be 5 characters long!";
        break;
      case "email":
        newErros.email = validEmailRe.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        newErros.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({
      errors: newErros,
      [name]: value
    });
  };
  goToHome = () => {
    this.props.history.replace("/login");
  };
  onSubmit = async e => {
    e.preventDefault();
    const newuser = {
      Username: this.state.Username,
      email: this.state.email,
      password: this.state.password
    };

    const response = await axios.post(
      "http://localhost:8000/register",
      newuser
    );
    if (response.errors === null) {
      console.log("komal");
    } else {
      this.goToHome();
    }
  };

  render() {
    const { email, Username, password } = this.state;
    console.log(this.state);

    const isEnabled =
      validEmailRe.test(email) && password.length > 8 && Username.length > 4;

    return (
      <div>
        <Navbar
          expand="lg"
          variant="light"
          style={{ backgroundColor: "#3578E5" }}
        >
         
          <img src={Navgurukul_logo} style={{ height: "200px" }} alt="img" />

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
              <li className="nav-item">
                <Link to="/signup">
                  {" "}
                  <Button
                    variant="primary"
                    style={{ height: "40px", width: "90px" }}
                  >
                    Signup
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </Navbar>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="auth-wrapper" style={{ marginTop: "10%" }}>
            <div className="auth-inner">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  onChange={this.onChange}
                  name="Username"
                  value={this.state.Username}
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div style={{ color: "red" }}>{this.state.errors.Username}</div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  onChange={this.onChange}
                  name="email"
                  value={this.state.email}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div style={{ color: "red" }}>{this.state.errors.email}</div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  onChange={this.onChange}
                  name="password"
                  value={this.state.password}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <div style={{ color: "red" }}>{this.state.errors.password}</div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!isEnabled}
                style={{ height: "40px", width: "90px" }}
              >
                Sign Up
              </button>
             
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
