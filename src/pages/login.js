import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

var validEmailRe = RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:s@\"]{2,})$/i
);
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: true,
      errors: {
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
  onSubmit = e => {
    e.preventDefault();
    const getData = axios
      .get(
        "http://localhost:8000/login",
        {
          params: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data);
        const token = localStorage.getItem("token");
        // console.log(localStorage.getItem("token"));

        const n = axios
          .get("http://localhost:8000/verify", { params: { token: token } })
          .then(respo => {
            if (respo.data === true) {
              window.location.href = "/home";
            } else {
              window.location.href = "/";
            }
          });

        this.setState({
          loading: false
        });
        console.log(n);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
    console.log(getData);
  };
  onChange(e) {
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
  }

  render() {
    const { email, password } = this.state;
    const isEnabled = validEmailRe.test(email) && password.length > 8;

    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="auth-wrapper" style={{ marginTop: "10%" }}>
            <div className="auth-inner">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
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
                  value={this.state.password}
                  name="password"
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
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
