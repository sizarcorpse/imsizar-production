import React, { useEffect, useState } from "react";

//firebase
import app, { stroage } from "../../firebase";

//components
import SkillCard from "./SkillCard";

// contexts
import { useAuth } from "../../contexts/AuthContext";

//mui
import { getGridListCols } from "../../customMui/gridCol";
import withWidth from "@material-ui/core/withWidth";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, GridList, GridListTile, Toolbar } from "@material-ui/core";
import { startOfToday } from "date-fns";

const useStyles = (theme) => ({});

function Skills(props) {
  const { currentUser } = useAuth();
  const { width } = props;
  const [allskill, setAllskill] = useState([]);
  const customGridCols = getGridListCols(width);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    console.log("run 1 time");
    getAllSkill();
    // eslint-disable-next-line
  }, []);

  function getAllSkill() {
    setLoading(true);
    const db = app.firestore();

    db.collection("skills").onSnapshot((querySnapshot) => {
      let items = [];

      querySnapshot.forEach(
        (doc) => {
          items.push(doc.data());
        },
        (error) => {
          console.log(error);
        }
      );
      setAllskill(items);
      setLoading(false);
    });
  }

  const deleteSkill = async (skillID) => {
    if (currentUser.admin === true) {
      const db = app.firestore();
      const skillRef = db.doc(`skills/${skillID}`);
      await skillRef
        .get()
        .then(async (doc) => {
          if (!doc.exists) {
            return console.log("skill do not exits");
          }
          if (doc.data().skillCreatorID !== currentUser.uid) {
            return console.log("you do not have permission ");
          } else {
            return await skillRef.delete();
          }
        })
        .then(() => {
          console.log("skill deleted successfully");
        });
    } else {
      return console.log("gte the fuck out");
    }
  };

  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Toolbar style={{ minHeight: 15 }}></Toolbar>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <GridList cellHeight={"auto"} spacing={0} cols={customGridCols}>
          {allskill.map((skill) => (
            <GridListTile cols={1} spacing={5}>
              <SkillCard
                skill={skill}
                key={skill.skillID}
                width={width}
                deleteSkill={deleteSkill}
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
}

export default withWidth()(withStyles(useStyles)(Skills));
