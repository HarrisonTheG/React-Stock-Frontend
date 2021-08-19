
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Paper} from "@material-ui/core";
import { loginStyles } from "../../stylings/LoginStyle.js";
import {useState} from 'react'
import UserService from '../../services/UserService';
import{useHistory} from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import Select from '@material-ui/core/Select';


export default function SignUp() {
  const [userName,setuserName]=useState('')
  const [password,setpassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [email,setEmail]=useState('')
  //const [role,setrole]=useState('')   
  const history=useHistory();
  const [register,setregister]=useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const classes = loginStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const newuser={username:userName,password:password,email:email,role:1}
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
          <Avatar className={classes.avatarRegisterStyle}>
            <MenuBookIcon/>
          </Avatar>
          <h2>Register</h2>
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
          label="Email"
          type="text"
          placeholder="Enter email"
          fullWidth
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          label="Confirm Password"
          type="password"
          placeholder="Enter password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        ></TextField>
       
        
        {/* <Box height="10px"></Box>
              <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e)=>setrole(e.target.value)
          }
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>

        </Select> */}
           
        <Box height="32px"></Box>
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Register
        </Button>
        </form>
        <Typography className={classes.registerStyle}>
          Have an Account? &nbsp;
          <Link style={{cursor: 'pointer'}} onClick={()=>{history.push("/login")}} underline="hover">
            Login here
          </Link>
        </Typography>
        <Box style={{height: 16}} />
        {errorMsg === '' && <div/>}
        {errorMsg === 'emailError' && <Box style={{marginBottom: 8}}>
          <Typography color='error' variant='body2'>Please provide the correct email and try again!
          </Typography></Box>}
        {errorMsg === 'usernameError' && <Box style={{marginBottom: 8}}>
          <Typography color='error' variant='body2'>Username exists. Please create new username!
          </Typography></Box>}
        {errorMsg === 'passwordError' && <Box style={{marginBottom: 8}}>
          <Typography color='error' variant='body2'>Passwords do not match. Please edit!
          </Typography></Box>}
      </Paper>
    </Grid>
  );
}