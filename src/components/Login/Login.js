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

const Login = () => {
  //Styles
  const classes = loginStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
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
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        ></TextField>
        <Box height="10px"></Box>
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          fullWidth
          required
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
        <Typography className={classes.registerStyle}>
          Don't have any account yet? &nbsp;
          <Link href="#" underline="hover">
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
