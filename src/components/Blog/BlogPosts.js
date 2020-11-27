import React, { useState, useEffect } from "react";

// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
import Sort from "./Sort";
import BlogPostCard from "./BlogPostCard";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :

// #material-ui :
import { withStyles } from "@material-ui/core/styles";
import { blogPostMui } from "./muiBlogPosts";
import {
  GridListTile,
  Grid,
  GridList,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const BlogPosts = (props) => {
  const { currentUser } = useAuth();
  // const { classes } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [blogPosts, setBlogPosts] = useState([]);
  const [sortValue, setSortValue] = useState("blogPostCreatedAt");
  const [desc, setDesc] = useState("desc");
  const [loading, setLoading] = useState(false);

  // #handlers : Get all blogPosts

  useEffect(() => {
    getblogPosts();
    console.log("collected blogPosts");
  }, [desc, sortValue]);

  const getblogPosts = async () => {
    setLoading(true);
    let db = app.firestore();
    db.collection("blogs")
      .orderBy(sortValue, desc)
      .onSnapshot(
        (querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setBlogPosts(items);
          setLoading(false);
        },
        (error) => {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }
      );
  };

  // #handlers : Delete singole post with if photos

  const deleteBlogPost = async (blogPostID, blogCreatorID) => {
    let db = app.firestore();

    try {
      if (currentUser.uid === blogCreatorID) {
        const document = db.doc(`blogs/${blogPostID}`);
        await document
          .get()
          .then(async (doc) => {
            if (!doc.exists) {
              throw new Error("document not found");
            }
            if (doc.data().blogCreatorID !== currentUser.uid) {
              throw new Error("Insufficient Permissions");
            } else {
              let deletedFromStroage = [];
              let deleteFromDB = [];

              doc.data().blogPhotos.forEach((photo) => {
                deletedFromStroage.push(photo.blogPhoto);
                deleteFromDB.push(photo.blogPhotoID);
              });
              await document.delete();

              return { deletedFromStroage, deleteFromDB };
            }
          })
          .then((wds) => {
            wds.deletedFromStroage.forEach(async (photo) => {
              let getImage = stroage.refFromURL(photo);
              await getImage.delete();
            });

            return wds.deleteFromDB;
          })
          .then((wd) => {
            wd.forEach(async (file) => {
              await db.doc(`blogPhotos/${file}`).delete();
            });
          })
          .finally(() => {
            enqueueSnackbar("Blog Post Deleted", {
              variant: "info",
            });
          });
      } else {
        throw new Error("Insufficient Permissions");
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  // #handlers : Sorts

  const descAsc = () => {
    if (desc === "desc") {
      setDesc("asc");
    } else {
      setDesc("desc");
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
          <IconButton style={{ right: 29 }} onClick={descAsc}>
            <ImportExportIcon style={{ fontSize: 20, color: "#1d2d50" }} />
          </IconButton>
        </Toolbar>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <GridList cellHeight={"auto"} spacing={0} cols={1}>
          {blogPosts &&
            blogPosts.map((blogPost) => (
              <GridListTile
                cols={1}
                spacing={5}
                style={{ padding: "5px" }}
                key={blogPost.blogPostID}
              >
                <BlogPostCard
                  blogPost={blogPost}
                  deleteBlogPost={deleteBlogPost}
                />
              </GridListTile>
            ))}
        </GridList>
      </Grid>
    </Grid>
  );
};
export default withStyles(blogPostMui)(BlogPosts);
