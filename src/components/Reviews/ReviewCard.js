import React, { useState, useEffect, useMemo } from "react";

import { formatDistanceToNow } from "date-fns";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
import UpdateReview from "./UpdateReview";
import ProfileMiniCard from "../Profile/ProfileMiniCard";
import ReviewCommentsCard from "./ReviewCommentsCard";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./ReviewCommentFormValidations";

// #material-ui :
import clsx from "clsx";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";
import { withStyles } from "@material-ui/core/styles";

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Typography,
  IconButton,
  CardActions,
  Menu,
  MenuItem,
  Collapse,
  Modal,
  Fade,
  Backdrop,
  Grid,
  TextareaAutosize,
  FormControl,
  Box,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import CommentIcon from "@material-ui/icons/Comment";
const ReviewCard = (props) => {
  const { currentUser } = useAuth();
  const { classes, review, deleteReview } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [reviewComments, setReviewComments] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [open, setOpen] = useState(false);

  const [isText, setIsText] = useState(false);

  const [loading, setLoading] = useState(false);

  // #handlers : Menu
  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  // #handlers : collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // #handlers : modal
  const handleOpenModel = () => {
    setOpen(true);
  };
  const handleCloseModel = () => {
    setOpen(false);
    setMenuOpen(null);
  };

  // #handlers : menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // #handlers : get call comment
  useEffect(() => {
    getReviewComments();
    console.log("collected blogsComments");
  }, [expanded]);

  const getReviewComments = async () => {
    setLoading(true);
    let db = app.firestore();
    await db
      .collection("reviewComments")
      .where("reviewID", "==", `${review.reviewID}`)
      .onSnapshot(
        (querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setReviewComments(items);
          setLoading(false);
        },
        (error) => {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }
      );
  };

  // #handlers : post a comment

  const initialValues = {
    reviewCommentBody: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { reviewCommentBody } = values;
    setLoading(true);
    const db = app.firestore();
    const newReviewComment = {
      reviewCommentID: uuidv4(),
      reviewID: review.reviewID,
      commenter: currentUser.displayName,
      commenterID: currentUser.uid,
      commenterPhotoUrl: currentUser.photoURL,
      reviewCommentCreatedAt: new Date().toISOString(),
      reviewCommentModifiedAt: "",
      reviewCommentBody: reviewCommentBody,
      reviewCommenLikeCount: 0,
      //check if edited
      reviewCommenIsEdited: false,
    };

    try {
      await db
        .doc(`reviewComments/${newReviewComment.reviewCommentID}`)
        .set(newReviewComment)
        .then(() => {
          enqueueSnackbar("Comment created successfully", {
            variant: "success",
          });
          // handleCloseModel(false);
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          setLoading(false);
          resetForm({ values: "" });
        });
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  // #handlers : delete a comment

  const deleteReviewComment = async (commentID, commenterID) => {
    let db = app.firestore();

    try {
      if (currentUser.uid === commenterID) {
        let document = db.doc(`reviewComments/${commentID}`);
        await document
          .get()
          .then(async (doc) => {
            if (!doc.exists) {
              throw new Error("Document does not exists");
            }
            if (
              doc.data().commenterID !== currentUser.uid ||
              currentUser.admin === true
            ) {
              throw new Error("Insufficient Permissions");
            } else {
              return await document.delete();
            }
          })
          .then(() => {
            enqueueSnackbar("Comment deleted", {
              variant: "info",
            });
          });
      } else {
        throw new Error("Insufficient Permissions");
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <Card className={classes.ScuiContentCard}>
      <CardHeader
        avatar={
          <Avatar className={classes.ScuiAvaterMedium} onClick={handleClick}>
            <img
              src={review.reviewerPhotoUrl}
              alt=""
              className={classes.ScuiAvayerMediumImage}
            />
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            {currentUser ? (
              <Menu
                id="simple-menu"
                anchorEl={menuOpen}
                open={Boolean(menuOpen)}
                onClose={handleMenuClose}
                className={clsx(
                  classes.ScuiMenuSmall,
                  classes.ScuiMenuSmallPaddingReview
                )}
              >
                {review.reviewerID === currentUser.uid ||
                currentUser.admin === true ? (
                  <>
                    <MenuItem onClick={handleOpenModel}>
                      <Typography variant="h5">Update</Typography>
                    </MenuItem>
                    <Modal
                      className={classes.modal}
                      open={open}
                      onClose={handleCloseModel}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <UpdateReview
                            handleCloseModel={handleCloseModel}
                            review={review}
                          />
                        </div>
                      </Fade>
                    </Modal>
                    <MenuItem
                      onClick={() => {
                        deleteReview(review.reviewID, review.reviewerID);
                      }}
                    >
                      <Typography variant="h5">Delete</Typography>
                    </MenuItem>
                  </>
                ) : null}
                <MenuItem onClick={handleMenuClose}>
                  <Typography variant="h5">Report</Typography>
                </MenuItem>
              </Menu>
            ) : null}
          </>
        }
        title={
          <>
            <Link
              onClick={handleClick}
              className={classes.ScuiLinkUnderLineRemove}
            >
              <Typography variant="caption" color="primary">
                {review.reviewer}
              </Typography>
            </Link>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menuMini}
            >
              <ProfileMiniCard rid={review.reviewerID} trigger={anchorEl} />
            </Menu>
          </>
        }
        subheader={
          <>
            <Typography variant="h5">
              {formatDistanceToNow(new Date(review.reviewCreatedAt))}
            </Typography>
          </>
        }
      />
      <CardContent>
        {/* <Divider className={classes.ScuiDividerTB1} /> */}
        <Typography variant="body1" color="textPrimary">
          {review.reviewBody}
        </Typography>
        <Divider className={classes.ScuiDividerT24} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {currentUser ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={true}
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
                    {values.reviewCommentBody.length > 0
                      ? setIsText(true)
                      : setIsText(false)}
                    <Grid container spacing={2}>
                      <Grid item xs={isText ? 11 : 12}>
                        <FormControl error fullWidth>
                          <TextareaAutosize
                            className={classes.ScuiTextAreaSmall}
                            label="Comment"
                            variant="outlined"
                            id="reviewCommentBody"
                            rowsMin={3}
                            placeholder="Give a comment"
                            value={values.reviewCommentBody}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>
                      </Grid>
                      {isText === true && (
                        <Fade in={isText}>
                          <Grid item xs={isText ? 1 : 0}>
                            <IconButton
                              variant="contained"
                              type="submit"
                              color="primary"
                            >
                              <SendIcon />
                            </IconButton>
                          </Grid>
                        </Fade>
                      )}
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          ) : null}

          <Box mt={2}>
            {reviewComments &&
              reviewComments.map((comment, i) => (
                <ReviewCommentsCard
                  comment={comment}
                  deleteReviewComment={deleteReviewComment}
                />
              ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default withStyles(MuiDistributor)(ReviewCard);
