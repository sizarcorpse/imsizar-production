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
// import addlogo from "../../assets/add.jpg";
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
import CloseIcon from "@material-ui/icons/Close";
const CreateGallery = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateGalleryModelClose, width } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [blogPhotos, setBlogPhotos] = useState([]);
  const [previewBlogPhotos, setPreviewBlogPhoto] = useState([]);
  const [galleryPhotoCaption, setGalleryPhotoCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const imp = useRef();

  // #handlers : Hangle images selected

  const handlePhotoUpload = (e) => {
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

  // #handlers : Uploading image to stroage and create a 'ref dcoument' for every image

  const uploadGalleryPhotos = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const promises = [];
      blogPhotos.map((file) => {
        const db = app.firestore();
        const uploadTask = stroage
          .ref(
            `galleryPhoto/${Math.floor(Math.random() * 1000000000) + file.name}`
          )
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress
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
                galleryPhotoID: uuidv4(),
                galleryPhotoCreatorID: currentUser.uid,
                galleryPhoto: downloadURL,
                galleryPhotoHeight: height,
                galleryPhotoWidth: width,
                galleryPhotoCaption: galleryPhotoCaption,
                //need for sort data
                galleryPhotoCreatedAt: new Date().toISOString(),
                galleryPhotoLikeCount: 0,
                galleryPhotoCommentCount: 0,
              };
              await db
                .doc(`galleries/${newPhoto.galleryPhotoID}`)
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
          enqueueSnackbar("Photos Uploaded successfully", {
            variant: "success",
          });
        })
        .catch((err) => {
          throw new Error("Something went wrong");
        })
        .finally(() => {
          setPhotoUploading(false);
          handleCreateGalleryModelClose(false);
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar(error.message, {
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
      <CssBaseline />
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton onClick={() => handleCreateGalleryModelClose(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Grid>

      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />

      <Grid item xs={12} xl={6} lg={6} md={8} sm={10}>
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
                title={<Typography variant="h2">Memories</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Share your memories with us?
                  </Typography>
                }
              />
              <Divider className={classes.ScuiDividerT24} />

              <CardContent className={classes.ScuiCardLargeMainArea}>
                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl error fullWidth>
                        <TextField
                          className={classes.margin}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TitleIcon />
                              </InputAdornment>
                            ),
                          }}
                          label="Caption"
                          variant="outlined"
                          id="galleryPhotoCaption"
                          name="galleryPhotoCaption"
                          onChange={(e) => {
                            setGalleryPhotoCaption(e.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    {previewBlogPhotos.length > 0 && !loading === true ? (
                      <Grid
                        item
                        xs={12}
                        className={classes.ScuiPreviewAreaLarge}
                      >
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
                          <AddIcon
                            onClick={() => imp.current.click()}
                            className={classes.ScuiAddIcon}
                          />
                        </GridList>
                      </Grid>
                    ) : photoUploading === true ? (
                      <Grid item xs={12}>
                        <Box
                          className={clsx(
                            classes.ScuiChoosePhotoGridAreaLarge,
                            classes.ScuiChoosePhotoGrid
                          )}
                        >
                          <CircularProgress />
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Box
                          className={clsx(
                            classes.ScuiChoosePhotoGridAreaLarge,
                            classes.ScuiChoosePhotoGrid
                          )}
                        >
                          <Button
                            onClick={() => imp.current.click()}
                            startIcon={<AddAPhotoIcon />}
                          >
                            <Typography variant="h4" color="primary">
                              Choose Photos
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    )}
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
                        onChange={handlePhotoUpload}
                      />
                    </FormControl>
                  </Grid>
                </form>
              </CardContent>

              <Divider className={classes.ScuiDividerTB8} />
              <CardContent>
                <Grid item xs={12} className={classes.ScuiGridFooter}>
                  <Typography
                    variant="h6"
                    onClick={() => handleCreateGalleryModelClose(false)}
                  >
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
                    disabled={blogPhotos.length === 0}
                    onClick={uploadGalleryPhotos}
                  >
                    <Typography variant="h5">Upload Photo</Typography>
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(CreateGallery));
