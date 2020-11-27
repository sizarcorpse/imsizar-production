import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
import Sort from "./Sort";
import ReviewCard from "./ReviewCard";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :

// #material-ui :
import { reviewsMui } from "./muiReviews";
import {
  GridListTile,
  Grid,
  GridList,
  Toolbar,
  IconButton,
  Paper,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const Reviews = (props) => {
  const { currentUser } = useAuth();
  // const { classes } = props;
  const [reviews, setReviews] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [sortValue, setSortValue] = useState("reviewCreatedAt");
  const [desc, setDesc] = useState("desc");
  const [loading, setLoading] = useState(false);

  // #handlers : Fatch all rewviews

  useEffect(() => {
    getReviews();
    console.log("collected reviews");
  }, [desc, sortValue]);

  const getReviews = async () => {
    setLoading(true);
    let db = app.firestore();
    await db
      .collection("reviews")
      .orderBy(sortValue, desc)
      .onSnapshot(
        (querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setReviews(items);
          setLoading(false);
        },
        (error) => {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }
      );
  };

  // #handlers : Delete single rewviews

  const deleteReview = async (reviewID, reviewerID) => {
    let db = app.firestore();

    try {
      if (currentUser.uid === reviewerID) {
        let document = db.doc(`reviews/${reviewID}`);
        await document
          .get()
          .then(async (doc) => {
            if (!doc.exists) {
              throw new Error("Document does not exists");
            }
            if (
              doc.data().reviewerID !== currentUser.uid ||
              currentUser.admin === true
            ) {
              throw new Error("Insufficient Permissions");
            } else {
              return await document.delete();
            }
          })
          .then(() => {
            enqueueSnackbar("Review deleted", {
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

  // #handlers : Sort review

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
          {reviews &&
            reviews.map((review) => (
              <GridListTile
                cols={1}
                spacing={5}
                style={{ padding: "5px" }}
                key={review.reviewID}
              >
                <ReviewCard review={review} deleteReview={deleteReview} />
              </GridListTile>
            ))}
        </GridList>
      </Grid>
    </Grid>
  );
};
export default withStyles(reviewsMui)(Reviews);
