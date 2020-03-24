// import React from 'react';
// // import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// // import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
// import { Navbar } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// import HomeIcon from '@material-ui/icons/Home';
// import { IconButton } from '@material-ui/core';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// function CreatePost() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Navbar expand="lg" variant="light" style={{ backgroundColor: '#3578E5' }}>
//         <IconButton
//           color="inherit"
//         >
//           <HomeIcon />
//         </IconButton>
//         <span>Home</span>
//         <div className="container" style={{ width: '10px' }}>
//           <IconButton color="inherit">
//             <FavoriteBorderIcon />
//           </IconButton>
//           {/* <IconButton color="inherit">
//             <Link to="/home" ><AddIcon /> </Link>
//           </IconButton> */}
//           <IconButton color="inherit">
//             <Link to="/profile" > <AccountCircleIcon /></Link>
//           </IconButton>
//         </div>
//       </Navbar>

//       <div>
//         {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//           <AddIcon />
//         </Button> */}
//         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//           <DialogTitle id="form-dialog-title">Create post</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Enter your text"
//               type="text"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <label for="file">
//               <span className='fa fa-edit edit-icon'>
//               </span>Photo/Videos</label>
//             <input type="file"
//               multiple='true'
//               id="file" style={{ display: 'none' }} name='file' onChange={(e) => { this.handlChange(e) }}/>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </div>
//   );
// }


// export default CreatePost;


