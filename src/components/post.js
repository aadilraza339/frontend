import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './post.css'
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


const styles =  theme => ({
  inlinebox:{
   
     float:"right",
    marginTop:"-16%",
     
    
    
    
  },
  root: {
    width: '100%',
    maxWidth: 160,
    backgroundColor: theme.palette.background.paper,
   
  },
 
});


  

 class FolderList extends Component {
   
   
    
  
render(){
  const {classes} = this.props;
  const {users, usernameses}=this.props
  console.log(usernameses)
  
   
  return (
<div className={classes.inlinebox}> 

 <AccountCircleIcon/> 

    { usernameses.map(postes=>(<span>{postes.username}</span>  
       ))}  
      
       {users.map(posts=>(<List className={classes.root}>
      <ListItem >
        
        <ListItemText primary={posts.username} />
        </ListItem>
      
    </List>
     
   
    ))}
    </div>
  );
      }
  
}
export default withStyles(styles)(FolderList)