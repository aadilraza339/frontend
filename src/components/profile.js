import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import demo from "./demo.jpg";
import Username from "./UserNames";
import axios from "axios";
import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: demo,
      loading: false,
      gets: "",
      post:""
    };
  }

  uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "venu18");
    this.setState({
      loading: true
    });

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coder-202/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    this.setState({
      image: file.secure_url
    });
    console.log(file.secure_url);
    this.setState({
      loading: false
    });
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"), "tokan is ..");

    axios
      .post("http://localhost:8000/profile_image", {
        header: { imageUrl: file.secure_url, token: token }
      })

      .then(res => {
        console.log("post :" + res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getProfile = async () => {
    const token = localStorage.getItem("token");
    const getResponse = await axios.get("http://localhost:8000/get_profile", {
      params: { token: token }
    });
    this.setState({ gets: getResponse.data });
    return getResponse;
  };
  userPosts = async()=>{
    const token = localStorage.getItem("token");
  const postResponse = await axios.get("http://localhost:8000/user_posts", {
    params: { token: token }
  });

  this.setState({ post: postResponse.data });
  }


  async componentDidMount() {
    this.userPosts()
    var mydata = await this.getProfile();
    
    // console.log(mydata)
    const data = mydata.data[0];
    console.log(data);
    if (data === undefined) {
      this.setState({
        src: ""
      });
    } else {
      const data = mydata.data[0];
      this.setState({
        image: data.pro_url
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <Navbar
            expand="lg"
            variant="light"
            style={{ backgroundColor: "#3578E5" }}
          >
            <IconButton color="inherit">
              <Link to="/home">
                {" "}
                <HomeIcon />
              </Link>
            </IconButton>
            <span>Home</span>
            <div className="container" style={{ width: "10px" }}></div>
          </Navbar>
        </div>

        <div
         
        >
          <input
            type="file"
            multiple="true"
            id="file"
            style={{ display: "none" }}
            name="file"
            onChange={this.uploadImage}
          />
          <div style={{ marginLeft: "50%" }}>
            {this.state.loading ? (
              <h3>Loading...</h3>
            ) : (
              <label
                className="Icon"
                for="file"
                style={{ float: "left" }}
                onChange={this.uploadImage}
              >
                <div className="box">
                  <img
                    src={this.state.image}
                    style={{
                      width: "150px",
                      borderRadius: "50%",
                      height: "150px",
                      cursor: "pointer"
                    }}
                    alt="img"
                  />

                </div>
              </label>
            )}
            <div style={{marginTop:'30px'}} >
              <Link to="/edit">
                <button style={{marginTop:'5%',  marginLeft:'50px'}} variant="primary">
                  Edit profile
                </button>
              </Link>
            </div>
          </div>
        </div>
        {(this.state.gets !== "" && this.state.post !== "") && <Username name={this.state.gets}  user_post={this.state.post}/>}
      </div>
    );
  }
}
export default Profile;
