import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./edit.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
var validEmailRe = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      email: "",
      birthday: "",
      education: "",
      phone: "",
      bio: "",
      Bio:"",
      image:"",

      errors: {
        address: "",
        email: "",
        phone: "",
        education: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.education)
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"), "tokan is ..");
    const decoded = jwt_decode(token);
    console.log(decoded, "decode..");
    const newUser = axios
      .post(
        "http://localhost:8000/edit",
        { headers: { token: token } },
        {
          params: {
            phone: this.state.phone,
            email: this.state.email,
            birthday:this.state.birthday,
            education: this.state.education,
            address: this.state.address,
            bio: this.state.bio
          }
        }
      )
      .then(res => {
        console.log(res);
      });
    console.log(newUser);
  };
  onChange = async e => {
    const { name, value } = e.target;
    let errors = this.state.errors;
    const newErros = { ...errors };
    switch (name) {
      case "address":
        newErros.address =
          value.length > 8 ? "" : "Full Name must be 8 characters long!";
        break;

      case "email":
        newErros.email = validEmailRe.test(value) ? "" : "Email is not valid!";
        break;
      case "phone":
        newErros.phone =
          value.length < 10 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({
      errors: newErros,
      [name]: value
    });

  };
  getBio = async e => {
    // console.log("hello err");
    const token = localStorage.getItem("token");
    const userBio = await axios.get("http://localhost:8000/get_bio", {
      params: { token: token }
    });

    this.setState({
      Bio: userBio.data
    });
    return(userBio);

  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    let data = await axios.get("http://localhost:8000/get_bio", {
      params: { token: token }
    })
    const mydata=data.data[0]
  console.log(data)
  if(mydata===undefined){
    this.setState({
      address: "",
      education: "",
      phone: "",
      email: "",
      birthday:"",
      bio: ""
    })
      
  }
  else{
    const mydata = data.data[0]
      this.setState({
        address: mydata.address,
        education: mydata.education,
        phone: mydata.phone_number,
        email: mydata.email,
        birthday: mydata.data_brith,
        bio: mydata.bio
      })
  }
     }
  render() {
    const { phone, email, birthday, education, address, bio } = this.state;
    console.log(this.state);

    const isEnabled =
      phone.length > 0 &&
      email.length > 0 &&
      birthday.length > 0 &&
      education.length > 0 &&
      address.length > 0 &&
      bio.length > 0;

    return (
      <div>
        <div>
          <Navbar
            expand="lg"
            variant="light"
            style={{ backgroundColor: "#3578E5" }}
          >
               <Link to="/home">
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            </Link>
            <span>Home</span>
            <div className="container" style={{ width: "10px" }}>
              {/* <IconButton color="inherit">
                <FavoriteBorderIcon />
              </IconButton> */}
              {/* <IconButton color="inherit">
                <Link to="/CreatePost">
                  <AddIcon />{" "}
                </Link>
              </IconButton> */}
              <IconButton color="inherit">
                <Link to="/profile">
                  {" "}
                  <AccountCircleIcon />
                </Link>
              </IconButton>
            </div>
          </Navbar>
        </div>
        <div className="class" style={{ marginTop: "3%" }}>
          <Card className="card" style={{ marginTop: "10%" }}>
            <h3>Edit Profile</h3>

            <CardContent>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="tel"
                    name="education"
                    placeholder="Education"
                    required
                    value={this.state.education}
                    onChange={this.onChange}
                  />
                </div>
                <div style={{ color: "red" }}>
                  {this.state.errors.education}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your Phone Number"
                    required
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                </div>
                <div style={{ color: "red" }}>{this.state.errors.phone}</div>
                <div className="form-group">
                  <input
                    type="email"
                    onChange={this.onChange}
                    name="email"
                    label="email"
                    value={this.state.email}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div style={{ color: "red" }}>{this.state.errors.email}</div>
                <div className="form-group">
                
                   <input
                    type="tel"
                    name="birthday"
                    label="Phone Number"
                    placeholder="Enter your birth"
                    
                    value={this.state.birthday}
                     onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="address"
                    label="Phone Number"
                    placeholder="Enter your address"
                    required
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                </div>
                <div style={{ color: "red" }}>{this.state.errors.address}</div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="bio"
                    label="Phone Number"
                    placeholder="Enter your bio"
                    required
                    value={this.state.bio}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!isEnabled}
                  style={{ height: "40px", width: "90px" }}
                >
                  Submit
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
export default Edit;
