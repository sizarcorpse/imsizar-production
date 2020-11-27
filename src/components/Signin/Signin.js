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
import { validationSchema } from "./logInFormValidation";

// #material-ui :
import clsx from "clsx";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";

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
  Box,
} from "@material-ui/core";

import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const Signin = (props) => {
  const { classes } = props;
  const history = useHistory();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      setLoading(true);
      await login(email, password);
      setTimeout(() => {
        history.push("/dashboard");
      }, 10);
    } catch {
      enqueueSnackbar("Something went wrong🤪❌❌❗. Please try again😇👻.", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.ScuiMainContainer}>
      {/* {loading && "Loading "} */}
      <CssBaseline />
      <Grid item xs={false} xl={4} lg={3} md={2} sm={1} />
      <Grid item xs={12} xl={4} lg={6} md={8} sm={10}>
        {/* // #action : */}
        <Box className={clsx(classes.ScuiMiddle, classes.ScuiBoxFullHeight)}>
          <Paper className={classes.ScuiPaperSingle}>
            <Card className={classes.ScuiCardSingle}>
              <Box className={classes.ScuiMiddle}>
                <CardHeader
                  title={<Typography variant="h1">Welcome</Typography>}
                  subheader={
                    <Typography variant="h4" color="secondary">
                      Don't have an Account?{" "}
                      <Link
                        to={"/signup"}
                        className={classes.ScuiLinkUnderLineRemove}
                      >
                        Sign up{" "}
                      </Link>
                    </Typography>
                  }
                />
              </Box>
              {/* // #action : */}
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<AlternateEmailIcon color="secondary" />}
                >
                  <Typography variant="h5" color="primary">
                    Sign in with google
                  </Typography>
                </Button>
                <Divider className={classes.ScuiDividerT24} />
              </CardContent>
              {/* // #action : */}
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
                          <Grid item xs={12}>
                            <FormControl
                              error={touched.email && Boolean(errors.email)}
                              fullWidth
                            >
                              <TextField
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
                          {/* // #action : */}
                          <Grid item xs={12}>
                            <Divider className={classes.ScuiDividerTB24} />
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
                                  Keep me logged in
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
                        >
                          <Typography variant="h5" color="primary">
                            Log in
                          </Typography>
                        </Button>
                      </Form>
                      <Divider className={classes.ScuiDividerTB24} />
                      <Typography variant="h5">
                        <Link
                          to={"/resetpassword"}
                          className={classes.ScuiLinkUnderLineRemove}
                        >
                          Forgot your username or password?
                        </Link>
                      </Typography>
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

export default withStyles(MuiDistributor)(Signin);
