import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
// #firebase :
import app, { auth } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";
// #validations :
import { validationSchema } from "./ProfileSettingFormValidation";

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
  CssBaseline,
  Paper,
  TextareaAutosize,
  TextField,
  Box,
  CircularProgress,
} from "@material-ui/core";

import BusinessIcon from "@material-ui/icons/Business";
import HttpIcon from "@material-ui/icons/Http";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PublicIcon from "@material-ui/icons/Public";

const ProfileSetting = (props) => {
  const { classes, width } = props;
  const { currentUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    console.log("profile collected");

    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    setLoading(true);
    const db = app.firestore();

    const profileRef = db.doc(`users/${currentUser.uid}`);

    profileRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return console.log("sorry no user");
        } else {
          setProfile(doc.data());
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const initialValues = {
    profileHeadline: profile.profileHeadline,
    profileOrganization: profile.profileOrganization,
    profileOrganizationUrl: profile.profileOrganizationUrl,
    facebook: profile.facebook,
    github: profile.github,
    twitter: profile.twitter,
    profileWebsite: profile.profileWebsite,
    linkedin: profile.linkedin,
    profileLocation: profile.profileLocation,
    profileCountry: profile.profileCountry,
    profileAboutMe: profile.profileAboutMe,
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const {
      profileHeadline,
      profileOrganization,
      profileOrganizationUrl,
      facebook,
      github,
      twitter,
      profileWebsite,
      linkedin,
      profileLocation,
      profileCountry,
      profileAboutMe,
    } = values;
    const db = app.firestore();

    const newProfile = {
      profileHeadline,
      profileOrganization,
      profileOrganizationUrl,
      facebook,
      github,
      twitter,
      profileWebsite,
      linkedin,
      profileLocation,
      profileCountry,
      profileAboutMe,
    };

    await db
      .doc(`users/${currentUser.uid}`)
      .update(newProfile)
      .then(() => {
        console.log("profile update successfully");
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log("width", width);
  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiBackground)}
    >
      <CssBaseline />
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      {!loading ? (
        <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
          {/* // #action : */}
          <Box
            className={clsx({
              [classes.ScuiMiddle]: true,
              [classes.ScuiBoxFullHeight]: width === "xl",
              [classes.ScuiNone]: width === "lg",
            })}
          >
            <Paper className={classes.ScuiPaperLarge}>
              <Card className={classes.ScuiCardLarge}>
                <CardHeader
                  title={<Typography variant="h2">Profile Settings</Typography>}
                  subheader={
                    <>
                      <Typography variant="h4" color="secondary">
                        Want to update account settings ?
                        <Link
                          to={"/accountsettings"}
                          className={classes.ScuiLinkUnderLineRemove}
                        >
                          Account Settings
                        </Link>
                      </Typography>
                    </>
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
                        <CardContent className={classes.ScuiCardLargeMainArea}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileHeadline &&
                                  Boolean(errors.profileHeadline)
                                }
                                fullWidth
                                color="primary"
                              >
                                <TextareaAutosize
                                  variant="outlined"
                                  className={classes.ScuiTextAreaSmall}
                                  rowsMin={4}
                                  aria-label="maximum height"
                                  placeholder="Tell me about yourself. max 99 words"
                                  name="profileHeadline"
                                  id="profileHeadline"
                                  defaultValue={profile.profileHeadline}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileOrganization &&
                                  Boolean(errors.profileOrganization)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.profileOrganization &&
                                      Boolean(errors.profileOrganization) ? (
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
                                  name="profileOrganization"
                                  variant="outlined"
                                  fullWidth
                                  id="profileOrganization"
                                  label="Organization Name"
                                  defaultValue={profile.profileOrganization}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileOrganizationUrl &&
                                  Boolean(errors.profileOrganizationUrl)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.profileOrganizationUrl &&
                                      Boolean(errors.profileOrganizationUrl) ? (
                                        <InputAdornment position="start">
                                          <HttpIcon style={{ color: "red" }} />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <HttpIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="profileOrganizationUrl"
                                  label="Oraganization Website"
                                  id="profileOrganizationUrl"
                                  defaultValue={profile.profileOrganizationUrl}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileLocation &&
                                  Boolean(errors.profileLocation)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.profileLocation &&
                                      Boolean(errors.profileLocation) ? (
                                        <InputAdornment position="start">
                                          <LocationOnIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <LocationOnIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="profileLocation"
                                  label="Location"
                                  id="profileLocation"
                                  defaultValue={profile.profileLocation}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileCountry &&
                                  Boolean(errors.profileCountry)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.profileCountry &&
                                      Boolean(errors.profileCountry) ? (
                                        <InputAdornment position="start">
                                          <PublicIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <PublicIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="profileCountry"
                                  label="Country"
                                  id="profileCountry"
                                  defaultValue={profile.profileCountry}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.facebook && Boolean(errors.facebook)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.facebook &&
                                      Boolean(errors.facebook) ? (
                                        <InputAdornment position="start">
                                          <FacebookIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <FacebookIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="facebook"
                                  label="facebook"
                                  id="facebook"
                                  defaultValue={profile.facebook}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={touched.github && Boolean(errors.github)}
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.github &&
                                      Boolean(errors.github) ? (
                                        <InputAdornment position="start">
                                          <GitHubIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <GitHubIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="github"
                                  label="Github"
                                  id="github"
                                  defaultValue={profile.github}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.twitter && Boolean(errors.twitter)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.twitter &&
                                      Boolean(errors.twitter) ? (
                                        <InputAdornment position="start">
                                          <TwitterIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <TwitterIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="twitter"
                                  label="Twitter"
                                  id="twitter"
                                  defaultValue={profile.twitter}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.linkedin && Boolean(errors.linkedin)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.linkedin &&
                                      Boolean(errors.linkedin) ? (
                                        <InputAdornment position="start">
                                          <LinkedInIcon
                                            style={{ color: "red" }}
                                          />
                                        </InputAdornment>
                                      ) : (
                                        <InputAdornment position="start">
                                          <LinkedInIcon />
                                        </InputAdornment>
                                      ),
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  name="linkedin"
                                  label="Linkedin"
                                  id="linkedin"
                                  defaultValue={profile.linkedin}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileWebsite &&
                                  Boolean(errors.profileWebsite)
                                }
                                fullWidth
                              >
                                <TextField
                                  InputProps={{
                                    startAdornment:
                                      touched.profileWebsite &&
                                      Boolean(errors.profileWebsite) ? (
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
                                  variant="outlined"
                                  fullWidth
                                  name="profileWebsite"
                                  label="Website"
                                  id="profileWebsite"
                                  defaultValue={profile.profileWebsite}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={
                                  touched.profileAboutMe &&
                                  Boolean(errors.profileAboutMe)
                                }
                                fullWidth
                                color="primary"
                              >
                                <TextareaAutosize
                                  variant="outlined"
                                  className={classes.ScuiTextAreaMedium}
                                  rowsMin={12}
                                  aria-label="maximum height"
                                  placeholder="Tell me about yourself. max 99 words"
                                  name="profileAboutMe"
                                  id="profileAboutMe"
                                  defaultValue={profile.profileAboutMe}
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
                            <Typography variant="h6">
                              <Link
                                to={"/dashboard"}
                                className={classes.ScuiLinkUnderLineRemove}
                              >
                                Not now
                              </Link>
                            </Typography>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              <Typography variant="h5">Update Now</Typography>
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
      ) : (
        <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
          {" "}
          <Box
            className={clsx({
              [classes.ScuiMiddle]: true,
              [classes.ScuiBoxFullHeight]: true,
            })}
          >
            <CircularProgress color="secondary" />
          </Box>
        </Grid>
      )}
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(ProfileSetting));
