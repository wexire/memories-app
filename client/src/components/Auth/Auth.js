import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { gapi } from "gapi-script";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const GOOGLE_CLIENT_ID =
    "730094389483-evt51f50tcska78av7krhq65vjil68tn.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  autoFocus
                  label="First Name"
                  handleChange={handleChange}
                  half
                ></Input>
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            ></Input>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            ></Input>
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              ></Input>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                onClick={renderProps.onClick}
                fullWidth
                disabled={renderProps.disabled}
                variant="contained"
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          ></GoogleLogin>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode} size="small">
                {isSignUp
                  ? "Already have an account ? Sign in"
                  : "Don't have an account ? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
