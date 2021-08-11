import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { loginStyles } from "../../stylings/LoginStyle.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import{useHistory,useParams} from 'react-router-dom';
import UserService from '../../services/UserService';

const Login = () => {
  const history=useHistory();
  //Styles
  const classes = loginStyles();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const loginSuccessOrFail=(response)=>{
    if(response.status===200){
      history.push("/watchlist");
    }
    else{
      console.log(response.status);
      
    }
    return;
  };

  function handleSubmit(event) {
    event.preventDefault();
    validateForm();
    const loginuser={username:userName,password:password}
    UserService.authenticateUser(loginuser).then(res=>(loginSuccessOrFail(res)));
  }
  
  const redirect=()=>{
    history.push("/register")
  }

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Box height="32px"></Box>
        <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          value={userName}
          onChange={(e)=>setuserName(e.target.value)}
        ></TextField>
        <Box height="10px"></Box>
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          fullWidth
          required
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        ></TextField>
        <Box height="10px"></Box>
        <FormControlLabel
          control={<Checkbox name="checked" color="primary" />}
          label="Remember me"
          marginRight="0"
        />
        <Box height="24px"></Box>
        <Button type="submit" color="primary" variant="contained" fullWidth>
          login
        </Button>
        </form>
        <Typography className={classes.registerStyle}>
          Don't have any account yet? &nbsp;
          <Link onClick={redirect} underline="hover">
            Register here
          </Link>
        </Typography>
      </Paper>
    </Grid>
   

    //   <div className="Login">
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group size="lg" controlId="email">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control
    //           autoFocus
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group size="lg" controlId="password">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button block size="lg" type="submit" disabled={!validateForm()}>
    //         Login
    //       </Button>
    //     </Form>
    //   </div>
  );
};

export default Login;
