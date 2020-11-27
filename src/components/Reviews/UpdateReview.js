import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./CreateReviewFormValidation";

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
  Box,
  Toolbar,
  IconButton,
  TextField,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import CloseIcon from "@material-ui/icons/Close";
const UpdateReview = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCloseModel, review, width } = props;
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    reviewTitle: review.reviewTitle,
    reviewBody: review.reviewBody,
  };

  // #handlers : Update review

  const onSubmit = async (values, { resetForm }) => {
    const { reviewTitle, reviewBody } = values;
    setLoading(true);
    const db = app.firestore();

    const newReview = {
      reviewTitle: reviewTitle,
      reviewBody: reviewBody,
      reviewIsEdited: true,
      reviewModifiedAt: new Date().toISOString(),
    };

    try {
      const getReview = await db.doc(`reviews/${review.reviewID}`);

      getReview
        .get()
        .then(async (doc) => {
          if (!doc.exists) {
            throw new Error("Document does not exists");
          }
          if (doc.data().reviewerID !== currentUser.uid) {
            throw new Error("Insufficient Permissions");
          } else {
            await getReview.update(newReview);
          }
        })
        .then(() => {
          enqueueSnackbar("Review updated successfully", {
            variant: "info",
          });
          handleCloseModel(false);
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiModalBG)}
    >
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton onClick={() => handleCloseModel(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Grid>

      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        {/* // #action : */}
        <Box className={classes.ScuiMiddle}>
          <Paper className={classes.ScuiPaperLarge}>
            <Card className={classes.ScuiCardLarge}>
              <CardHeader
                title={<Typography variant="h2">Update Review</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Anything in your mind?
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
                    /* values, */
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                  } = props;
                  return (
                    <Form>
                      <CardContent className={classes.ScuiCardLargeMainArea500}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.reviewTitle &&
                                Boolean(errors.reviewTitle)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.reviewTitle &&
                                    Boolean(errors.reviewTitle) ? (
                                      <InputAdornment position="start">
                                        <TitleIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <TitleIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="reviewTitle"
                                name="reviewTitle"
                                variant="outlined"
                                fullWidth
                                id="reviewTitle"
                                label="Title"
                                /* value={values.reviewTitle} */
                                defaultValue={review.reviewTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.reviewTitle &&
                                Boolean(errors.reviewTitle)
                              }
                              fullWidth
                            >
                              <TextareaAutosize
                                className={classes.ScuiTextAreaLarge}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <TitleIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                label="review Body"
                                variant="outlined"
                                rowsMin={26}
                                aria-label="maximum height"
                                placeholder="Give me a nice cool review"
                                name="reviewBody"
                                fullWidth
                                id="reviewBody"
                                /* value={values.reviewBody} */
                                defaultValue={review.reviewBody}
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
                            onClick={() => handleCloseModel(false)}
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
                            disabled={loading}
                          >
                            <Typography variant="h5">Yeah I'm Done</Typography>
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

export default withWidth()(withStyles(MuiDistributor)(UpdateReview));
