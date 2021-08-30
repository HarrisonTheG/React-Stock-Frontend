import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { loginStyles } from "../../stylings/LoginStyle.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import{useHistory} from 'react-router-dom';
import UserService from '../../services/UserService';
import SessionService from '../../session/SessionService'
import WatchlistService from "../../services/WatchlistService.js";
import SessionDataService from "../../services/SessionDataService.js";
import GoogleLogin from 'react-google-login';

const Login = () => {
  const history=useHistory();
  //Styles
  const classes = loginStyles();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const loadWatchlist = async (loginUser) => {
        const req = await WatchlistService.getStockWatchlist(loginUser);
        const data = req.data;
        console.log(data);
        SessionDataService.setUserWatchlist(data);
        //console.log(SessionDataService.getUserWatchlist());
  }

  const loginSuccessOrFail=(response)=>{
    if(response.status===200){
      SessionService.setSessionStorage('username', userName);
      //console.log(userName);
      loadWatchlist(userName);
      console.log("login success here!")
      history.push("/search/:ticker");
    }
    else{
      console.log(response.status);
      setIsSuccess(false);
    }
    return response;
  };

  function handleSubmit(event) {
    event.preventDefault();
    validateForm();
    const loginuser={username:userName,password:password}
    UserService.authenticateUser(loginuser).then(res=>(loginSuccessOrFail(res)));
  }

  const responseGoogle= (response)=>{
    //console.log(response);
    //console.log(response.profileObj);
    //console.log(response.profileObj.email)
    //console.log(response.profileObj.googleId)
    //setuserName(response.profileObj.name);

    //try to login, if 400, isSuccess is false
    const loginuser={username:response.profileObj.email,password:response.profileObj.googleId}
    UserService.authenticateUser(loginuser).then(res=>(loginSuccessOrFail(res))).then(res=>{
      if(res.status===400){
        const newuser={username:response.profileObj.email,password:response.profileObj.googleId,email:response.profileObj.email,role:1}
        UserService.addUser(newuser);
        console.log("new user registered!")
        history.push('/search/:ticker');
      }
    });

    //if IsSuccess is false, i will add user, 
    

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
        <Box height="32px"></Box>
        <Box style={{display: 'flex', flexDirection: 'row'}}>
          <Box style={{flex: 3, marginRight: 8, height: 60}}>
        <Button style={{height: '75%'}} type="submit" color="primary" variant="contained" fullWidth>
          login
        </Button></Box>
        
        <Box style={{flex: 1}}>
        
          <GoogleLogin
          clientId="232283893398-krtnuc64b34f9a0mkcts6su5gsim8ik4.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          />
        
        </Box>
        </Box>
        </form>
       
        <Typography className={classes.registerStyle}>
          Don't have any account yet? &nbsp;
          <Link style={{cursor: 'pointer'}} onClick={redirect} underline="hover">
            Register here
          </Link>
        </Typography>
        {isSuccess ? <div/> : <Box style={{marginTop: 16}}>
          <Typography color='error' variant='body2'>Information above is incorrect. Please try again!
          </Typography></Box>}
        
      </Paper>
    </Grid>
  );
};

export default Login;
