import React from "react";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 755,
    marginTop: 20,
    // marginLeft: 490
  },

  avatar: {
    color: blue[50],
    textTransform: "capitalize"
  },
  media: {
    width: 455,
    height:400
   
  },
  roots:{
    display:"grid",
    gridTemplateColumns:"22.5% 22.5% 22.5%",
    justifyContent:"center",
     marginTop:"10%",
     paddingLeft: 49
    

   },
  // rootse:{
  //   didplay:"grid",
  //   marginLeft:40
  // }
}));
function Username(props) {
  const classes = useStyles();
  const { name, user_post } = props;
  console.log(name);
  return (
    <div style={{}}>
      {name.map(get => (
        <Typography
          style={{
            color: "green",
            fontSize: "25px",
            marginTop: "-4%",
            marginLeft: "50%"
          }}
        >
          {get.username}
        </Typography>
      ))}
       
      <div class={classes.roots}>
      {user_post.map(captions => (
       
       
       <Card className={classes.root} >
          <CardContent  >
            <img 
              src={captions.post_url}
              className={classes.media}
              alt="twinkle"
             
            />
          </CardContent>
          </Card>
          
       
      
      ))}
      </div>
      
    </div>
  );
}

export default Username;
