import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
import BlogsCommentsCard from "./BlogsCommentsCard";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./BlogCommentFormValidations";

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
  Box,
  TextareaAutosize,
  Grid,
  FormControl,
  Fade,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";

const BlogPostCard = (props) => {
  const { currentUser } = useAuth();
  const { classes, blogPost, deleteBlogPost } = props;

  const [blogsComments, setBlogsComments] = useState([]);

  const [expanded, setExpanded] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [isText, setIsText] = useState(false);

  // #handlers : menu
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

  // const handleOpenModel = () => {
  //   setOpen(true);
  // };
  // const handleCloseModel = () => {
  //   setOpen(false);
  //   setMenuOpen(null);
  // };

  // #handlers : Image Carousel Gallery
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // #handlers : formatting incoming image for "react-photo-gallery"
  const photosz = [];
  if (blogPost.blogPhotos) {
    blogPost.blogPhotos.map(async (photo) => {
      let cons = {
        src: photo.blogPhoto,
        width: photo.blogPhotoWidth,
        height: photo.blogPhotoHeight,
      };

      photosz.push(cons);
    });
  }

  // #handlers : get call comment
  useEffect(() => {
    getBlogComments();
    console.log("collected blogsComments");
  }, [expanded]);

  const getBlogComments = async () => {
    setLoading(true);
    let db = app.firestore();
    await db
      .collection("blogsComments")
      .where("blogPostID", "==", `${blogPost.blogPostID}`)
      .onSnapshot(
        (querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setBlogsComments(items);
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
    blogCommentBody: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { blogCommentBody } = values;
    setLoading(true);
    const db = app.firestore();
    const newBlogComment = {
      blogCommentID: uuidv4(),
      blogPostID: blogPost.blogPostID,
      commenter: currentUser.displayName,
      commenterID: currentUser.uid,
      commenterPhotoUrl: currentUser.photoURL,
      blogCommentCreatedAt: new Date().toISOString(),
      blogCommentModifiedAt: "",
      blogCommentBody: blogCommentBody,
      blogCommenLikeCount: 0,
      //check if edited
      blogCommenIsEdited: false,
    };

    try {
      await db
        .doc(`blogsComments/${newBlogComment.blogCommentID}`)
        .set(newBlogComment)
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

  const deleteBlogComment = async (commentID, commenterID) => {
    let db = app.firestore();

    try {
      if (currentUser.uid === commenterID) {
        let document = db.doc(`blogsComments/${commentID}`);
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
          <Avatar className={classes.ScuiAvaterMedium}>
            <img
              src={blogPost.blogCreatorPhotoUrl}
              alt=""
              className={classes.ScuiAvayerMediumImage}
            />
          </Avatar>
        }
        action={
          <Box>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            {currentUser && (
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
                {blogPost.blogCreatorID === currentUser.uid ||
                currentUser.admin === true ? (
                  <>
                    {/* <MenuItem onClick={handleOpenModel}>
                    <Typography variant="p" className={classes.neckText2}>
                      Update
                    </Typography>
                  </MenuItem>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
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
                  </Modal> */}
                    <MenuItem
                      onClick={() => {
                        deleteBlogPost(
                          blogPost.blogPostID,
                          blogPost.blogCreatorID
                        );
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
            )}
          </Box>
        }
        title={
          <Typography variant="caption" color="primary">
            {blogPost.blogCreatorDisplayName}
          </Typography>
        }
        subheader={
          <>
            {/* <Typography variant="h5" className={classes.neckText}>
              {review.reviewID}
            </Typography> */}
            <Typography variant="h5">
              {formatDistanceToNow(new Date(blogPost.blogPostCreatedAt))}
            </Typography>
          </>
        }
      />

      <CardContent>
        <Box mb={2}>
          <Typography variant="body1" color="textPrimary">
            {blogPost.blogBody}
          </Typography>
        </Box>
        {photosz ? (
          <Box className={classes.modelx}>
            <Gallery
              photos={photosz}
              onClick={openLightbox}
              className={classes.modely}
              style={{ objectFit: "cover" }}
            />
            <ModalGateway
              className={classes.modelx}
              style={{ objectFit: "cover" }}
            >
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox} className={classes.model}>
                  <Carousel
                    className={classes.model}
                    allowFullscreen="true"
                    isFullscreen="true"
                    autoSize={true}
                    preventScroll="true"
                    currentIndex={currentImage}
                    views={photosz.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: "",
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </Box>
        ) : (
          <p>no photo</p>
        )}
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
          aria-label="show more"
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
                    {values.blogCommentBody.length > 0
                      ? setIsText(true)
                      : setIsText(false)}
                    <Grid container spacing={2}>
                      <Grid item xs={isText ? 11 : 12}>
                        <FormControl error fullWidth>
                          <TextareaAutosize
                            className={classes.ScuiTextAreaSmall}
                            label="Comment"
                            variant="outlined"
                            id="blogCommentBody"
                            rowsMin={3}
                            placeholder="Give a comment"
                            value={values.blogCommentBody}
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
            {blogsComments &&
              blogsComments.map((comment) => (
                <BlogsCommentsCard
                  comment={comment}
                  deleteBlogComment={deleteBlogComment}
                />
              ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default withStyles(MuiDistributor)(BlogPostCard);
