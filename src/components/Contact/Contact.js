import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app, { auth } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";
// #validations :
import { validationSchema } from "./ContactFormValidation";

// #material-ui :
import clsx from "clsx";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";

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
  TextareaAutosize,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Box,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import LanguageIcon from "@material-ui/icons/Language";
import CloseIcon from "@material-ui/icons/Close";
const Contact = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleContactMeModelClose, width } = props;

  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = useRef(null);
  const history = useHistory();
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    organization: "",
    contactMessage: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const {
      firstName,
      lastName,
      email,
      companyName,
      companyWebsite,
      organization,
      contactMessage,
    } = values;

    const db = app.firestore();

    const newContact = {
      contactID: uuidv4(),
      contactorFirstName: firstName,
      contactorLastName: lastName,
      contactorEmail: email,
      contactorCompanyName: companyName,
      contactorCompanyWebsite: companyWebsite,
      contactorOrganization: organization,
      contactorContactMessage: contactMessage,
      contactorContactCreatedAt: new Date().toISOString(),
    };

    await db
      .doc(`contacts/${newContact.contactID}`)
      .set(newContact)
      .then(() => {
        handleContactMeModelClose(false);
      })
      .catch(() => console.log("error error"));
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiModalBG)}
      spacing={1}
    >
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton onClick={() => handleContactMeModelClose(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        {/* // #action : */}
        {/* <Box className={clsx(classes.ScuiMiddle, classes.ScuiBoxFullHeight)}> */}
        <Box
          className={clsx({
            [classes.ScuiMiddle]: true,
            [classes.ScuiBoxFullHeight]: width === "xl",
            [classes.ScuiNone]: width === "lg",
          })}
        >
          <Paper className={classes.ScuiPaperSmall}>
            <Card className={classes.ScuiCardSmall}>
              <CardHeader
                title={<Typography variant="h2">Lets Talk</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Any question ? Please contact us.
                  </Typography>
                }
              />
              <Divider className={classes.ScuiDividerT24} />
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
                    <Form>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.firstName && Boolean(errors.firstName)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.firstName &&
                                    Boolean(errors.firstName) ? (
                                      <InputAdornment position="start">
                                        <PersonIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <PersonIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                label="First Name"
                                name="firstName"
                                id="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.lastName && Boolean(errors.lastName)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.lastName &&
                                    Boolean(errors.lastName) ? (
                                      <InputAdornment position="start">
                                        <PersonIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <PersonIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                label="Last Name"
                                name="lastName"
                                id="lastName"
                                value={values.lastName}
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
                                variant="outlined"
                                type="email"
                                label="Email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.companyName &&
                                Boolean(errors.companyName)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.companyName &&
                                    Boolean(errors.companyName) ? (
                                      <InputAdornment position="start">
                                        <BusinessIcon
                                          style={{ color: "red" }}
                                        />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <BusinessIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                type="companyName"
                                label="Company Name"
                                name="companyName"
                                id="companyName"
                                value={values.companyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.companyWebsite &&
                                Boolean(errors.companyWebsite)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.companyWebsite &&
                                    Boolean(errors.companyWebsite) ? (
                                      <InputAdornment position="start">
                                        <LanguageIcon
                                          style={{ color: "red" }}
                                        />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <LanguageIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                type="companyWebsite"
                                label="Company Website"
                                name="companyWebsite"
                                id="companyWebsite"
                                value={values.companyWebsite}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              variant="outlined"
                              className={classes.ScuiSelect}
                              fullWidth
                              required
                              error={
                                touched.organization &&
                                Boolean(errors.organization)
                              }
                            >
                              <InputLabel
                                ref={inputLabel}
                                className={classes.focused}
                                id="organization"
                              >
                                What type of organization do you work with?
                              </InputLabel>
                              <Select
                                native
                                labelId="organization"
                                id="organization"
                                value={values.organization}
                                onChange={handleChange}
                                labelWidth={labelWidth}
                                startAdornment={
                                  touched.skillName &&
                                  Boolean(errors.skillName) ? (
                                    <InputAdornment position="start">
                                      <BusinessCenterIcon
                                        style={{ color: "red" }}
                                      />
                                    </InputAdornment>
                                  ) : (
                                    <InputAdornment position="start">
                                      <BusinessCenterIcon />
                                    </InputAdornment>
                                  )
                                }
                                style={{ color: "#132743" }}
                              >
                                <option aria-label="None" value="" />
                                <option value={"Profile"}>Profile</option>
                                <option value={"Freelance"}>Freelance</option>
                                <option value={"Agency"}>Agency</option>
                                <option value={"Startup"}>Startup</option>
                                <option value={"Enterprise "}>
                                  Enterprise
                                </option>
                                <option value={"University"}>University</option>
                                <option value={"Other"}>Other</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.contactMessage &&
                                Boolean(errors.contactMessage)
                              }
                              fullWidth
                              required
                            >
                              <TextareaAutosize
                                required
                                className={classes.ScuiTextAreaSmall}
                                variant="outlined"
                                rowsMin={8}
                                placeholder="Share something about your ."
                                s
                                name="contactMessage"
                                id="contactMessage"
                                value={values.contactMessage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider className={classes.ScuiDividerTB8} />
                      <CardContent>
                        <Grid item xs={12} className={classes.ScuiGridFooter}>
                          <Typography
                            variant="h6"
                            onClick={() => handleContactMeModelClose(false)}
                          >
                            <Link
                              to={"/dashboard"}
                              className={classes.ScuiLinkUnderLineRemove}
                            >
                              Not Now
                            </Link>
                          </Typography>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            <Typography variant="h5">Send</Typography>
                          </Button>
                        </Grid>
                      </CardContent>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(Contact));
