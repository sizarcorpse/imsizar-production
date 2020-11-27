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
import { gellaryMui } from "./muiCreateGallery";
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
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";

const CreateGallery = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateGalleryModelClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [blogPhotos, setBlogPhotos] = useState([]);
  const [previewBlogPhotos, setPreviewBlogPhoto] = useState([]);
  const [galleryPhotoCaption, setGalleryPhotoCaption] = useState("");
  const [loading, setLoading] = useState(false);
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
    <Grid container component="main" className={classes.main}>
      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />

      <Grid item xs={12} xl={6} lg={6} md={8} sm={10}>
        <Paper className={classes.PaperMianCotent}>
          <Card className={classes.CardMainCard}>
            <CardHeader
              title={
                <Typography variant="h5" className={classes.TextHead}>
                  Share your memories with us?
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

                  <Divider className={classes.Divider25} />
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
                      onChange={handlePhotoUpload}
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
                  className={classes.TextNotNow}
                  onClick={() => handleCreateGalleryModelClose(false)}
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
                  className={classes.ButtonSubmit}
                  disabled={blogPhotos.length === 0}
                  onClick={uploadGalleryPhotos}
                >
                  <Typography variant="h5" className={classes.TextButtonSubmit}>
                    Upload Photo
                  </Typography>
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />
    </Grid>
  );
};

export default withStyles(gellaryMui)(CreateGallery);
