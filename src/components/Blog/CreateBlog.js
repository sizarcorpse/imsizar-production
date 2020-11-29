import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :

// #hooks :
import { useSnackbar } from "notistack";

// #validations :

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
  TextareaAutosize,
  Paper,
  GridList,
  GridListTile,
  CardMedia,
  Box,
  Toolbar,
  IconButton,
  TextField,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import BackupIcon from "@material-ui/icons/Backup";
import CloseIcon from "@material-ui/icons/Close";
const CreateBlog = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateBlogModelClose, width } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [blogPhotos, setBlogPhotos] = useState([]);
  const [blogPhotosURL, setBlogPhotosURL] = useState([]);
  const [previewBlogPhotos, setPreviewBlogPhoto] = useState([]);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [isPhotoUp, setIsPhotoUp] = useState(false);
  const [blogBody, setBlogBody] = useState("");
  const [loading, setLoading] = useState(false);
  const imp = useRef();

  // #handlers : Photo Select
  const handlePhotoSelect = (e) => {
    setLoading(true);
    if (e.target.files) {
      let file = e.target.files;
      let preview = [];
      for (let i = 0; i < file.length; i++) {
        preview.push(URL.createObjectURL(file[i]));
        setBlogPhotos((cv) => [...cv, file[i]]);
      }
      setPreviewBlogPhoto((cv) => [...cv, preview]);
    }
    setLoading(false);
  };

  // #handlers : 1. Upload Photo To Storage and 2.Create New ref for every photo.

  const uploadBlogPhotos = (e) => {
    e.preventDefault();
    setLoading(true);
    const db = app.firestore();
    try {
      const promises = [];
      blogPhotos.map((file) => {
        const uploadTask = stroage
          .ref(`blogs/${Math.floor(Math.random() * 1000000000) + file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setPhotoUploading(true);
          },
          (error) => {
            throw new Error("Something went wrong while uplaoding photo");
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            const img = new Image();
            img.onload = async () => {
              const height = img.height;
              const width = img.width;
              const newPhoto = {
                blogPhotoID: uuidv4(),
                blogPhotoCreatedAt: new Date().toISOString(),
                blogPhoto: downloadURL,
                blogPhotoHeight: height,
                blogPhotoWidth: width,
              };

              setBlogPhotosURL((cv) => [...cv, newPhoto]);
              await db
                .doc(`blogPhotos/${newPhoto.blogPhotoID}`)
                .set(newPhoto)
                .catch(() => {
                  throw new Error("Some of photos maybe not uploading");
                });
            };
            img.src = downloadURL;
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          setPhotoUploading(false);
          enqueueSnackbar("Photos Uploaded successfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          // throw new Error("Something went worng");
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        })
        .finally(() => {
          setIsPhotoUp(true);
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  // #handlers : Create Blog with uploaded photos

  const createBlogPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const db = app.firestore();

    try {
      const blogPost = {
        blogPostID: uuidv4(),
        blogCreatorID: currentUser.uid,
        blogCreatorDisplayName: currentUser.displayName,
        blogCreatorPhotoUrl: currentUser.photoURL,
        blogBody: blogBody,
        blogPhotos: blogPhotosURL,
        //sort
        blogPostCreatedAt: new Date().toISOString(),
        blogPostLikeCount: 0,
        blogPostCommentCount: 0,
      };

      await db
        .doc(`blogs/${blogPost.blogPostID}`)
        .set(blogPost)
        .then(() => {
          enqueueSnackbar("New Blod posted", {
            variant: "success",
          });
        })
        .catch(() => console.log("error error"))
        .finally(() => {
          setLoading(false);
          handleCreateBlogModelClose(false);
        });
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  // #handlers : Cancel blog post
  const cancelBlogPost = async () => {
    if (blogPhotosURL.length > 0) {
      blogPhotosURL.forEach(async (photo) => {
        let oldImage = stroage.refFromURL(photo.blogPhoto);
        await oldImage.delete();
      });
      handleCreateBlogModelClose(false);
    } else {
      handleCreateBlogModelClose(false);
    }
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiModalBG)}
    >
      <CssBaseline />
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton onClick={() => handleCreateBlogModelClose(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        <Box
          className={clsx({
            [classes.ScuiMiddle]: true,
            [classes.ScuiBoxFullHeight]: width === "xl",
            [classes.ScuiCenter]: width === "lg",
          })}
        >
          <Paper className={classes.ScuiPaperLarge}>
            <Card className={classes.ScuiCardLarge}>
              <CardHeader
                title={
                  <Typography variant="h2">Whats in your Mind ?</Typography>
                }
                subheader={
                  <Typography variant="h4" color="secondary">
                    Unleash your imaginations
                  </Typography>
                }
              />
              <Divider className={classes.ScuiDividerT24} />
              {/* // #action : */}
              <CardContent className={classes.ScuiCardLargeMainArea}>
                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl error fullWidth>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TitleIcon />
                              </InputAdornment>
                            ),
                          }}
                          label="Title"
                          variant="outlined"
                          id="custom-css-outlined-input"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl error fullWidth>
                        <TextareaAutosize
                          className={classes.ScuiTextAreaLarge}
                          label="Blog Body"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          rowsMin={13}
                          aria-label="maximum height"
                          placeholder="Give me a nice cool review"
                          defaultValue=""
                          onChange={(e) => {
                            setBlogBody(e.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* // #action : */}

                    {previewBlogPhotos.length > 0 && !loading === true ? (
                      <Grid item xs={12} className={classes.ScuiPreviewArea}>
                        <GridList
                          cellHeight={120}
                          spacing={0}
                          cols={width === "xs" ? 1 : 5}
                        >
                          {previewBlogPhotos.map((pc) => (
                            <GridListTile cols={1} spacing={0}>
                              <Link>
                                <Card className={classes.ScuiCardPreviewPhoto}>
                                  <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={pc}
                                    className={classes.ScuiPreviewPhoto}
                                  />
                                </Card>
                              </Link>
                            </GridListTile>
                          ))}

                          {!isPhotoUp && (
                            <AddIcon
                              onClick={() => imp.current.click()}
                              className={classes.ScuiAddIcon}
                            />
                          )}
                        </GridList>
                      </Grid>
                    ) : !loading === true ? (
                      <Grid item xs={12}>
                        <Box
                          className={clsx(
                            classes.ScuiChoosePhotoGridAreaMedium,
                            classes.ScuiChoosePhotoGrid
                          )}
                        >
                          <Button
                            onClick={() => imp.current.click()}
                            startIcon={<AddAPhotoIcon />}
                          >
                            <Typography variant="h4" color="secondary">
                              Choose Photos
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    ) : null}

                    {/* // #action : */}

                    {blogPhotos.length > 0 &&
                    !isPhotoUp === true &&
                    photoUploading === false ? (
                      <Grid item xs={12}>
                        <Box
                          className={clsx(
                            classes.ScuiChoosePhotoGrid,
                            classes.ScuiChoosePhotoGridAreaSmall
                          )}
                        >
                          <Button
                            disabled={blogPhotos.length === 0 && isPhotoUp}
                            onClick={uploadBlogPhotos}
                            startIcon={<BackupIcon />}
                          >
                            <Typography variant="h4" color="secondary">
                              Upload Photo
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    ) : photoUploading === true ? (
                      <Grid item xs={12}>
                        <Box
                          className={clsx(
                            classes.ScuiChoosePhotoGrid,
                            classes.ScuiChoosePhotoGridAreaSmall
                          )}
                        >
                          <CircularProgress />
                        </Box>
                      </Grid>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Input
                        inputProps={{
                          className: classes.UpInput,
                          ref: imp,
                          multiple: true,
                        }}
                        required
                        name="blogPhotos"
                        label="blogPhotos"
                        type="file"
                        id="blogPhotos"
                        style={{ visibility: "hidden" }}
                        onChange={handlePhotoSelect}
                      />
                    </FormControl>
                  </Grid>
                </form>
              </CardContent>
              <Divider className={classes.ScuiDividerTB8} />
              {/* // #action : */}
              <CardContent>
                <Grid item xs={12} className={classes.ScuiGridFooter}>
                  <Typography variant="h6" onClick={cancelBlogPost}>
                    <Link
                      to={"/dashboard"}
                      className={classes.ScuiLinkUnderLineRemove}
                    >
                      Not now
                    </Link>
                  </Typography>

                  <Button
                    /* type="submit" */
                    variant="contained"
                    color="primary"
                    onClick={createBlogPost}
                    disabled={
                      (blogPhotos.length > 0 && !isPhotoUp) || !blogBody
                    }
                  >
                    <Typography variant="h5">Unleash</Typography>
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(CreateBlog));
