import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";

// #firebase :
import app, { auth } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./signupFromValidation";

// #material-ui :
import { MuiDistributor } from "../../muiTheme/MuiDistributor";

import { signUpMui } from "./muiSignup";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputAdornment,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CssBaseline,
  Paper,
  TextField,
  Toolbar,
  Box,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FaceIcon from "@material-ui/icons/Face";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const Signup = (props) => {
  const { classes } = props;
  const { signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleChecked = () => {
    setChecked(!checked);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email, password, firstName, lastName, username } = values;
    const db = app.firestore();
    try {
      setLoading(true);
      db.collection("users")
        .where("username", "==", username)
        .limit(1)
        .get()
        .then((data) => {
          data.forEach(async (doc) => {
            if (doc.data().username === username) {
              setLoading(false);
              return enqueueSnackbar("username already exists", {
                variant: "error",
              });
            } else {
              await signup(email, password, firstName, lastName, username);
              history.push("/dashboard");
            }
          });
        });
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" className={classes.image}>
      <CssBaseline />
      <Grid item xs={false} xl={4} lg={3} md={2} sm={1} />
      <Grid item xs={12} xl={4} lg={6} md={8} sm={10}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Paper className={classes.PaperSingle}>
            <Card className={classes.CardSingle}>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                title={<Typography variant="h1">Create Account</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Already have an account?
                    <Link to={"/login"} className={classes.LinkUnderlineRemove}>
                      Sign in{" "}
                    </Link>
                  </Typography>
                }
              />
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<AlternateEmailIcon />}
                  className={classes.submitButton}
                >
                  <Typography variant="h5" color="primary">
                    Sign up with google
                  </Typography>
                </Button>
                <Divider
                  style={{
                    marginTop: "25px",
                  }}
                />
              </CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                  } = props;
                  return (
                    <CardContent>
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <FormControl
                              error={
                                touched.firstName && Boolean(errors.firstName)
                              }
                              fullWidth
                            >
                              <TextField
                                className={classes.margin}
                                InputProps={{
                                  startAdornment:
                                    touched.firstName &&
                                    Boolean(errors.firstName) ? (
                                      <InputAdornment position="start">
                                        <FaceIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <FaceIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                id="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={6}>
                            <FormControl
                              error={
                                touched.lastName && Boolean(errors.lastName)
                              }
                              fullWidth
                            >
                              <TextField
                                className={classes.margin}
                                InputProps={{
                                  startAdornment:
                                    touched.lastName &&
                                    Boolean(errors.lastName) ? (
                                      <InputAdornment position="start">
                                        <FaceIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <FaceIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="lastName"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Divider />
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.username && Boolean(errors.username)
                              }
                              fullWidth
                            >
                              <TextField
                                className={classes.margin}
                                InputProps={{
                                  startAdornment:
                                    touched.username &&
                                    Boolean(errors.username) ? (
                                      <InputAdornment position="start">
                                        <PersonIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <PersonIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={touched.email && Boolean(errors.email)}
                              fullWidth
                            >
                              <TextField
                                className={classes.margin}
                                InputProps={{
                                  startAdornment:
                                    touched.email && Boolean(errors.email) ? (
                                      <InputAdornment position="start">
                                        <EmailIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <EmailIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.password && Boolean(errors.password)
                              }
                              fullWidth
                            >
                              <TextField
                                className={classes.margin}
                                InputProps={{
                                  startAdornment:
                                    touched.password &&
                                    Boolean(errors.password) ? (
                                      <InputAdornment position="start">
                                        <LockIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <LockIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <Divider
                              style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                              }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={handleChecked}
                                  name="checkedB"
                                  style={{
                                    color: "#a1eafb",
                                  }}
                                  size="small"
                                />
                              }
                              label={
                                <Typography variant="h4" color="secondary">
                                  I agree to the{" "}
                                  <Link className={classes.LinkUnderlineRemove}>
                                    Terms of Service
                                  </Link>{" "}
                                  and{" "}
                                  <Link className={classes.LinkUnderlineRemove}>
                                    Privacy Policy
                                  </Link>
                                </Typography>
                              }
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          style={{ marginTop: 25 }}
                          disabled={loading}
                        >
                          <Typography variant="h5" color="primary">
                            Create Now
                          </Typography>
                        </Button>
                      </Form>
                    </CardContent>
                  );
                }}
              </Formik>
            </Card>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={4} lg={3} md={2} sm={1} />
    </Grid>
  );
};

export default withStyles(MuiDistributor)(Signup);
