import React, { useState, useEffect, useCallback } from "react";

import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";
// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :

// #components :
import Sort from "./Sort";

// #hooks :
import { useAuth } from "../../contexts/AuthContext";

// #validations :

// #material-ui :
import { withStyles } from "@material-ui/core/styles";
import { gellaryMui } from "./muiCreateGallery";
import { Grid, Toolbar, IconButton, Box } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const PhotoGallery = (props) => {
  const { currentUser } = useAuth();
  const { classes } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [GalleryPhotos, setGalleryPhotos] = useState([]);
  const [sortValue, setSortValue] = useState("galleryPhotoCreatedAt");
  const [desc, setDesc] = useState("desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("colleced gallery");
    getGalleryPhotos();
  }, [desc, sortValue]);

  const getGalleryPhotos = () => {
    setLoading(true);
    let db = app.firestore();
    db.collection("galleries")
      .orderBy(sortValue, desc)
      .onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setGalleryPhotos(items);
        setLoading(false);
      });
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const descAsc = () => {
    if (desc === "desc") {
      setDesc("asc");
    } else {
      setDesc("desc");
    }
  };

  const photosz = [];
  if (GalleryPhotos) {
    GalleryPhotos.map(async (photo) => {
      let cons = {
        src: photo.galleryPhoto,
        width: photo.galleryPhotoWidth,
        height: photo.galleryPhotoHeight,
        galleryPhotoID: photo.galleryPhotoID,
        galleryPhotoCreatorID: photo.galleryPhotoCreatorID,
      };

      photosz.push(cons);
    });
  }

  const deletePhoto = async (
    galleryPhotoID,
    galleryPhotoCreatorID,
    galleryPhoto
  ) => {
    try {
      const db = app.firestore();

      if (currentUser.uid === galleryPhotoCreatorID) {
        const document = db.doc(`galleries/${galleryPhotoID}`);
        await document
          .get()
          .then(async (doc) => {
            if (!doc.exists) {
              return console.log("document not found");
            }
            if (doc.data().galleryPhotoCreatorID !== currentUser.uid) {
              return console.log("you dont have permisson");
            } else {
              return await document.delete();
            }
          })
          .then(async () => {
            const file = stroage.refFromURL(galleryPhoto);
            if (!file) {
              return console.log("document not found");
            } else {
              return await file.delete();
            }
          })
          .then(() => {
            console.log("document delted successfully");
          });
      } else {
        console.log("you dont have permisson");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Toolbar style={{ minHeight: 15, paddingRight: 0 }}>
          <Sort setSortValue={setSortValue} />
          <IconButton
            style={{ right: 29 }}
            onClick={descAsc}
            title={desc === "desc" ? "desc" : "asc"}
          >
            <ImportExportIcon style={{ fontSize: 20, color: "#1d2d50" }} />
          </IconButton>
        </Toolbar>
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                      caption: (
                        <>
                          {currentUser.admin === true ? (
                            <IconButton
                              onClick={() => {
                                deletePhoto(
                                  x.galleryPhotoID,
                                  x.galleryPhotoCreatorID,
                                  x.src
                                );
                              }}
                            >
                              <DeleteForeverIcon style={{ color: "white" }} />
                            </IconButton>
                          ) : null}
                        </>
                      ),
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </Box>
        ) : (
          <p>no photo</p>
        )}
      </Grid>
    </Grid>
  );
};
export default withStyles(gellaryMui)(PhotoGallery);
