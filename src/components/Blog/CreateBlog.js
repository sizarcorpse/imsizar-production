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
import { withStyles } from "@material-ui/core/styles";
import { ScmuiIconText } from "../../customMui/ScmuiIconText";
import { blogMui } from "./muiBlog";
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
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import BackupIcon from "@material-ui/icons/Backup";

const CreateBlog = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateBlogModelClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [blogPhotos, setBlogPhotos] = useState([]);
  const [blogPhotosURL, setBlogPhotosURL] = useState([]);
  const [previewBlogPhotos, setPreviewBlogPhoto] = useState([]);
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
          (snapshot) => {},
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
        .then(() =>
          enqueueSnackbar("Photos Uploaded successfully", {
            variant: "success",
          })
        )
        .catch((err) => {
          throw new Error("Something went worng");
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
      blogPhotosURL
        .forEach(async (photo) => {
          let oldImage = stroage.refFromURL(photo.blogPhoto);
          await oldImage.delete();
        })
        .then(() => {
          enqueueSnackbar("Blog cancel", {
            variant: "info",
          });
        });
      handleCreateBlogModelClose(false);
    } else {
      handleCreateBlogModelClose(false);
    }
  };

  return (
    <Grid container component="main" className={classes.main}>
      <Grid item xs={false} xl={3} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        <Paper className={classes.PaperMianCotent}>
          <Card className={classes.CardMainCard}>
            <CardHeader
              title={
                <Typography variant="h5" className={classes.TextHead}>
                  Whats in your Mind ?
                </Typography>
              }
              subheader={
                <Typography variant="h5" className={classes.TextNeck}>
                  Unleash your imaginations
                </Typography>
              }
            />
            <Divider className={classes.Divider25} />
            <CardContent className={classes.CardContentMain}>
              <form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl error fullWidth>
                      <ScmuiIconText
                        className={classes.margin}
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
                        className={classes.textArea}
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
                  {previewBlogPhotos.length > 0 && !loading === true ? (
                    <Grid item xs={12} className={classes.gridPreviewArea}>
                      <GridList cellHeight={120} spacing={0} cols={5}>
                        {previewBlogPhotos.map((pc) => (
                          <GridListTile cols={1} spacing={0}>
                            <Link>
                              <Card className={classes.cardPreviewPhoto}>
                                <CardMedia
                                  component="img"
                                  alt="Contemplative Reptile"
                                  image={pc}
                                  className={classes.cardMediaPhoto}
                                />
                              </Card>
                            </Link>
                          </GridListTile>
                        ))}
                        <AddIcon
                          disabled={isPhotoUp}
                          onClick={() => imp.current.click()}
                          className={classes.addIcon}
                        />
                      </GridList>
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classes.gridChoosePhoto}>
                      <Button
                        onClick={() => imp.current.click()}
                        className={classes.ButtonuploadImage}
                      >
                        <AddAPhotoIcon />
                        <Typography className={classes.textChooseFile}>
                          Choose Photos
                        </Typography>
                      </Button>
                    </Grid>
                  )}
                  {blogPhotos.length > 0 ? (
                    <Grid item xs={12} className={classes.gridChoosePhoto}>
                      <Button
                        /* onClick={() => imp.current.click()} */
                        className={classes.ButtonuploadImage}
                        disabled={blogPhotos.length === 0 && isPhotoUp}
                        onClick={uploadBlogPhotos}
                        /* disabled={isPhotoUp} */
                      >
                        <BackupIcon />
                        <Typography
                          className={classes.textChooseFile}
                          disabled={isPhotoUp}
                        >
                          Upload Photo
                        </Typography>
                      </Button>
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
                      className={classes.inputVisibility}
                      onChange={handlePhotoSelect}
                    />
                  </FormControl>
                </Grid>
              </form>
            </CardContent>
            <Divider className={classes.Divider10} />
            <CardContent>
              <Grid item xs={12} className={classes.gridFoot}>
                <Typography
                  variant="h5"
                  /* className={classes.neckText} */
                  className={classes.TextNotNow}
                  onClick={cancelBlogPost}
                >
                  <Link
                    to={"/dashboard"}
                    className={classes.LinkUnderlineRemove}
                  >
                    Not now
                  </Link>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  /* disabled={loading} */
                  className={classes.ButtonSubmit}
                  onClick={createBlogPost}
                  disabled={(blogPhotos.length > 0 && !isPhotoUp) || !blogBody}
                >
                  <Typography variant="h5" className={classes.TextButtonSubmit}>
                    Unleash
                  </Typography>
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={false} xl={3} md={2} sm={1} />
    </Grid>
  );
};

export default withStyles(blogMui)(CreateBlog);
