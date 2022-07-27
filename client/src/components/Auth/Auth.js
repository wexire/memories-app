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
import { useFormik } from "formik";
import * as Yup from "yup";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (isSignUp) {
        dispatch(signup(values, history));
      } else {
        dispatch(signin(values, history));
      }
    },
    validationSchema: Yup.object({
      firstName:
        isSignUp &&
        Yup.string()
          .required("First name is required.")
          .max(15, "First name should be shorter than 16 character.")
          .min(2, "First name should be at least 2 charaters long.")
          .matches(
            /^([^0-9]*)$/,
            "No numbers should be present in first name."
          ),
      lastName:
        isSignUp &&
        Yup.string()
          .required("Second name is required.")
          .max(30, "Second name should be shorter than 31 character.")
          .min(2, "Second name should be at least 2 charaters long.")
          .matches(
            /^([^0-9]*)$/,
            "No numbers should be present in second name."
          ),
      email: Yup.string()
        .required("Email is required.")
        .email("Not a valid email."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password should be at least 8 characters long."),
      confirmPassword:
        isSignUp &&
        Yup.string()
          .required("Confirm password is required.")
          .equals([Yup.ref("password")], "Passwords must match"),
    }),
  });

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

  const switchMode = () => {
    setSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
    setShowConfirmPassword(false);
    formik.setErrors({});
    formik.setTouched({});
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
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  half
                ></Input>
                <Input
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  half
                ></Input>
                {formik.touched.firstName && formik.errors.firstName && (
                  <Typography variant="body1" className={classes.error}>
                    {formik.errors.firstName}
                  </Typography>
                )}
                {formik.touched.lastName && formik.errors.lastName && (
                  <Typography variant="body1" className={classes.error}>
                    {formik.errors.lastName}
                  </Typography>
                )}
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              value={formik.values.email}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
            ></Input>
            {formik.touched.email && formik.errors.email && (
              <Typography variant="body1" className={classes.error}>
                {formik.errors.email}
              </Typography>
            )}
            <Input
              name="password"
              label="Password"
              value={formik.values.password}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              handleShowPassword={() => setShowPassword(!showPassword)}
            ></Input>
            {formik.touched.password && formik.errors.password && (
              <Typography variant="body1" className={classes.error}>
                {formik.errors.password}
              </Typography>
            )}
            {isSignUp && (
              <>
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formik.values.confirmPassword}
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showConfirmPassword ? "text" : "password"}
                  handleShowPassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                ></Input>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <Typography variant="body1" className={classes.error}>
                      {formik.errors.confirmPassword}
                    </Typography>
                  )}
              </>
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
