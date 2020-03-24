import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { IconButton, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios'
class Home extends Component {
  state = {
    fileInput: '',
    open: true,
    close: false,
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })

  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };


  handlChange(e) {
    // this.setState({ modal: true });
    console.log(e.target.files, '@@@@@@@@@@@@@@@')
    this.setState({
      fileInput: e.target.files[0]
    })
    axios.post('http://localhost:8000/image', { headers: { 'file': e.target.files[0].name } })
      .then((res) => {
        console.log(res, 'rrrrrrrrrrrrrrrrrrr')
      }).catch((err) => {
        console.log(err)
      })
  }
  handlesubmit(e) {
    e.preventDefault();
    console.log(e.target.value, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
    axios.post('http://localhost:8000/image', { headers: { 'text': e.target.value } })
      .then((res) => { console.log(res, 'rupa') })
  }

  render() {
    console.log(this.state.open)
    return (
      <div>
        <div>
          <Navbar expand="lg" variant="light" style={{ backgroundColor: '#3578E5' }}>
            <IconButton
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
            <span>Home</span>
            <div className="container" style={{ width: '10px' }}>
              <IconButton color="inherit">
                <FavoriteBorderIcon />
              </IconButton>
              <Button color="primary" onClick={this.handleClickOpen}>
                <AddIcon />
              </Button>
              <IconButton color="inherit">
                <Link to="/profile" > <AccountCircleIcon /></Link>
              </IconButton>
            </div>
          </Navbar>
        </div>

        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create post</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter your text"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <label for="file">
                <span className='fa fa-edit edit-icon'>
                </span>Photo/Videos</label>
              <input type="file"
                multiple='true'
                id="file" style={{ display: 'none' }} name='file' onChange={(e) => { this.handlChange(e) }} />
              <Button onClick={this.handleClose} color="primary">
                Cancel
          </Button>
          
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default Home


