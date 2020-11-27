import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./AccountSettingFormValidation";

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
  Input,
  CardMedia,
  CssBaseline,
  Paper,
  Box,
  TextField,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FaceIcon from "@material-ui/icons/Face";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const AccountSetting = (props) => {
  const { classes, width } = props;
  const {
    currentUser,
    updateEmail,
    updatePassword,
    updateDisplayName,
    updateProfilePhoto,
  } = useAuth();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [previewProfilePhoto, setPreviewProfilePhoto] = useState(null);

  const imp = useRef();

  // #handlers : update account setting

  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setPreviewProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const { displayName, email, password } = values;

    const promises = [];
    setLoading(true);

    if (email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }
    if (displayName) {
      promises.push(updateDisplayName(displayName));
    }
    if (profilePhoto) {
      const db = app.firestore();

      if (currentUser.photoURL) {
        let oldImage = stroage.refFromURL(currentUser.photoURL);
        oldImage.delete();
      }

      const uploadTask = stroage
        .ref(`profilePhoto/${profilePhoto.name}`)
        .put(profilePhoto);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          enqueueSnackbar("Something went wrong while uploading photo", {
            variant: "error",
          });
        },
        () => {
          stroage
            .ref("profilePhoto")
            .child(profilePhoto.name)
            .getDownloadURL()
            .then((url) => {
              if (url) {
                promises.push(updateProfilePhoto(url));
              } else {
                enqueueSnackbar("Something went wrong while updating photo", {
                  variant: "error",
                });
              }
            });
        }
      );
    }

    Promise.all(promises)
      .then(() => {
        enqueueSnackbar("Account updated successfully", {
          variant: "success",
        });
        history.push("/dashboard");
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong : Loging again then try", {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // #handlers : modal close

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiBackground)}
    >
      <CssBaseline />
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
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
                title={<Typography variant="h2">Account Settings</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Want to update profile settings ?
                    <Link
                      to={"/profilesettings"}
                      className={classes.ScuiLinkUnderLineRemove}
                    >
                      Profile Settings
                    </Link>
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
                      <CardContent className={classes.ScuiCardLargeMainArea}>
                        <Grid container spacing={2}>
                          {previewProfilePhoto ? (
                            <Grid item xs={12}>
                              <Link>
                                <Card className={classes.ScuiAvaterLargeCard}>
                                  <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={previewProfilePhoto}
                                    onClick={() => imp.current.click()}
                                    className={classes.ScuiAvaterLarge}
                                  />
                                </Card>
                              </Link>
                            </Grid>
                          ) : (
                            <Grid item xs={12}>
                              <Button
                                variant="outlined"
                                onClick={() => imp.current.click()}
                                className={classes.ScuiAvaterLargeButton}
                              >
                                <AddPhotoAlternateIcon />
                                <Typography
                                  style={{
                                    marginLeft: "3px",
                                    marginRight: "5px",
                                  }}
                                >
                                  Choose
                                </Typography>
                              </Button>
                            </Grid>
                          )}

                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.displayName &&
                                Boolean(errors.displayName)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.displayName &&
                                    Boolean(errors.displayName) ? (
                                      <InputAdornment position="start">
                                        <FaceIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <FaceIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="displayName"
                                name="displayName"
                                variant="outlined"
                                fullWidth
                                id="displayName"
                                label="displayName"
                                defaultValue={currentUser.displayName}
                                /* value={values.displayName} */
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
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                defaultValue={currentUser.email}
                                /* value={values.email} */
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
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Input
                                inputProps={{
                                  className: classes.UpInput,
                                  ref: imp,
                                }}
                                name="profilePhoto"
                                label="profilePhoto"
                                type="file"
                                id="profilePhoto"
                                style={{ visibility: "hidden" }}
                                onChange={handlePhotoUpload}
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
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(AccountSetting));
