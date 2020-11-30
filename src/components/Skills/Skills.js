import React, { useEffect, useState } from "react";

// #firebase :
import app, { stroage } from "../../firebase";

// #components :
import SkillCard from "./SkillCard";
import Sort from "./Sort";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #material-ui :

import withWidth from "@material-ui/core/withWidth";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Toolbar, Box, IconButton, CssBaseline } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
const useStyles = (theme) => ({
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gridAutoRows: 260,
  },
});

function Skills(props) {
  const { currentUser } = useAuth();
  const { classes, width } = props;
  const [allskill, setAllskill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("desc");
  const [sortValue, setSortValue] = useState("skillExperiance");

  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    console.log("run 1 time");
    getAllSkill();
    // eslint-disable-next-line
  }, [desc, sortValue]);

  function getAllSkill() {
    setLoading(true);
    const db = app.firestore();

    db.collection("skills")
      .orderBy(sortValue, desc)
      .onSnapshot((querySnapshot) => {
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

  const descAsc = () => {
    if (desc === "desc") {
      setDesc("asc");
    } else {
      setDesc("desc");
    }
  };

  return (
    <Grid container component="main">
      <CssBaseline />
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
        <Box className={classes.grid}>
          {allskill.map((skill, i) => (
            <SkillCard
              skill={skill}
              key={skill.skillID}
              width={width}
              deleteSkill={deleteSkill}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default withWidth()(withStyles(useStyles)(Skills));
