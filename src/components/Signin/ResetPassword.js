import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";

// #firebase :
// import app, { auth } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :

// #hooks :
import { useSnackbar } from "notistack";
// #validations :
import { validationSchema } from "./resetPasswordValidation";

// #material-ui :
import clsx from "clsx";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  Paper,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Box,
  TextField,
} from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

const ResetPassword = (props) => {
  const { classes } = props;
  const { resetPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      setLoading(true);
      await resetPassword(email);
      enqueueSnackbar(
        "A reset email has been sent successfully. It may take several minutes",
        {
          variant: "success",
        }
      );
    } catch {
      enqueueSnackbar("Something went wrong🤪❌❌❗. Please try again😇👻.", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiBackground)}
    >
      <Grid item xs={false} xl={4} lg={3} md={2} sm={1} />
      <Grid item xs={12} xl={4} lg={6} md={8} sm={10}>
        {/* // #action : */}
        <Box className={clsx(classes.ScuiMiddle, classes.ScuiBoxFullHeight)}>
          <Paper className={classes.ScuiPaperSmall}>
            <Card className={classes.ScuiCardSmall}>
              <Box className={classes.ScuiMiddle}>
                <CardHeader
                  title={<Typography variant="h1">Reset Password</Typography>}
                  subheader={
                    <Typography variant="h4" color="secondary">
                      Don't have an Account?
                      <Link
                        to={"/signup"}
                        className={classes.ScuiLinkUnderLineRemove}
                      >
                        Sign up
                      </Link>
                    </Typography>
                  }
                />
              </Box>
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
                      <Divider className={classes.ScuiDividerTB24} />
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormControl
                              error={touched.email && Boolean(errors.email)}
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  style: { backgroundColor: "none" },
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
                            <TextField
                              InputProps={{
                                style: { backgroundColor: "none" },
                                startAdornment:
                                  touched.email && Boolean(errors.email) ? (
                                    <InputAdornment position="start">
                                      <PhoneAndroidIcon
                                        style={{ color: "red" }}
                                      />
                                    </InputAdornment>
                                  ) : (
                                    <InputAdornment position="start">
                                      <PhoneAndroidIcon />
                                    </InputAdornment>
                                  ),
                              }}
                              required
                              autoComplete=""
                              name=""
                              variant="outlined"
                              fullWidth
                              id=""
                              label="Phone Number"
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider className={classes.ScuiDividerTB24} />
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disabled={loading}
                          >
                            <Typography variant="h5" color="primary">
                              Reset Password
                            </Typography>
                          </Button>
                        </Grid>
                        <Divider className={classes.ScuiDividerTB24} />
                        <Grid container>
                          <Grid item xs>
                            <Typography variant="h5">
                              <Link
                                to={"/Login"}
                                className={classes.ScuiLinkUnderLineRemove}
                              >
                                Already have an account?
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="h5">
                              <Link
                                to={"/signup"}
                                className={classes.ScuiLinkUnderLineRemove}
                              >
                                Sign Up
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
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

export default withStyles(MuiDistributor)(ResetPassword);
