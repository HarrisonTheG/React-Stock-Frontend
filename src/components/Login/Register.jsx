import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";
import { loginStyles } from "../../stylings/LoginStyle.js";
import {useState} from 'react'
import UserService from '../../services/UserService';
import{useHistory,useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { LockOpenOutlined, LockOpenRounded, LockOpenSharp, LockOpenTwoTone } from '@material-ui/icons';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [userName,setuserName]=useState('')
  const [password,setpassword]=useState('')
  const [email,setEmail]=useState('')
  const [role,setrole]=useState('')   
  const history=useHistory();
  const [register,setregister]=useState(false);
  const classes = loginStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const newuser={username:userName,password:password,email:email,role:role}
    console.log(JSON.stringify(newuser));

    //UserService.addUser(newuser).then(res=>(res.status===200)?history.push("/watchlist"):console.log(res.status)).then(setregister(true));
    UserService.addUser(newuser).then(res=>(registerSuccessOrFail(res)))   
  };

      
  const registerSuccessOrFail=(response)=>{
    if(response.status===200){
      setregister(true);
      history.push("/watchlist");
    }
    else{
      console.log(response.status);
      
    }
    return;
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockTwoToneIcon/>
          </Avatar>
          <h2>Register Account</h2>
        </Grid>
        <Box height="5px"></Box>
        <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          value={userName}
          onChange={(e)=>setuserName(e.target.value)}
        ></TextField>
        <Box height="5px"></Box>
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          fullWidth
          required
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        ></TextField>
        <Box height="5px"></Box>
        <TextField
          label="Email"
          type="text"
          placeholder="Enter email"
          fullWidth
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        ></TextField>
        <Box height="10px"></Box>
              <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e)=>setrole(e.target.value)
          }
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>

        </Select>
           
        <Box height="24px"></Box>
        <Button type="submit" color="primary" variant="contained" fullWidth>
          login
        </Button>
        </form>
        <Typography className={classes.registerStyle}>
          Have an Account? &nbsp;
          <Link onClick={()=>{history.push("/login")}} underline="hover">
            Login here
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}