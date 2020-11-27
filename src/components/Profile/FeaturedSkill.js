import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//firebase
import app, { stroage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

// contexts
import { useAuth } from "../../contexts/AuthContext";

import { createFeaturedSkillMui } from "./muiFeaturedSkill";
import withWidth from "@material-ui/core/withWidth";
import withStyles from "@material-ui/core/styles/withStyles";
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
  Select,
  InputLabel,
  Paper,
  Checkbox,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CategoryIcon from "@material-ui/icons/Category";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FeaturedSkill = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateFeaturedSKillModelClose } = props;
  const [loading, setLoading] = useState(false);
  const [allskill, setAllskill] = useState([]);
  const [platform, setPlatform] = useState("");
  const [selectedPlatform, setSelectedPlatforms] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    console.log("getAllSkill");
    getAllSkill();
  }, []);

  function getAllSkill() {
    setLoading(true);
    const db = app.firestore();

    db.collection("skills").onSnapshot((querySnapshot) => {
      let items = [];

      querySnapshot.forEach(
        (doc) => {
          items.push({
            skillCoverPhoto: doc.data().skillCoverPhoto,
            skillID: doc.data().skillID,
            skillName: doc.data().skillName,
            skillPlatform: doc.data().skillPlatform,
          });
        },
        (error) => {
          console.log(error);
        }
      );
      setAllskill(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    setLabelWidthY(inputLabelY.current.offsetWidth);
  }, []);

  const [labelWidthY, setLabelWidthY] = React.useState(0);
  const inputLabelY = React.useRef(null);
  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handleSubmitFeaturedSkill = async (e) => {
    e.preventDefault();
    const db = app.firestore();

    const featureSkill = {
      featureSkillID: uuidv4(),
      featureSkillName: platform,
      featureSkillPatform: selectedPlatform,
      featureSkills: selectedSkills,
    };

    if (platform === "Web Development") {
      featureSkill.featureSkillSub = "Programing Language";
    }
    if (platform === "Cloud") {
      featureSkill.featureSkillSub = "Cloud Service provider";
    } else {
      featureSkill.featureSkillSub = "";
    }

    await db
      .doc(`featuredSkills/${featureSkill.featureSkillID}`)
      .set(featureSkill)
      .then(() => {
        console.log("feature Skill create success");
      })
      .finally(() => {
        handleCreateFeaturedSKillModelClose(false);
      });
  };

  return (
    <Grid container component="main" className={classes.main}>
      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />

      <Grid item xs={12} xl={6} lg={6} md={8} sm={10} style={{ padding: 80 }}>
        <Paper className={classes.PaperMianCotent}>
          <Card className={classes.CardMainCard}>
            <CardHeader
              title={
                <Typography variant="h5" className={classes.TextHead}>
                  Create Featured Skill
                </Typography>
              }
              subheader={
                <Typography variant="h5" className={classes.TextNeck}>
                  Acquire new skills ? Lets share.
                </Typography>
              }
            />
            <Divider className={classes.Divider25} />

            <form noValidate>
              <CardContent className={classes.CardContentMain}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
                      required
                    >
                      <InputLabel
                        ref={inputLabelY}
                        className={classes.focused}
                        id="skillPlatform"
                      >
                        Platform
                      </InputLabel>
                      <Select
                        native
                        labelId="skillPlatform"
                        id="skillPlatform"
                        value={platform}
                        onChange={handlePlatformChange}
                        labelWidth={labelWidthY}
                        startAdornment={
                          <InputAdornment position="start">
                            <CategoryIcon />
                          </InputAdornment>
                        }
                        style={{ color: "#132743" }}
                      >
                        <option aria-label="None" value="" />
                        <option value={"Web Development"}>
                          Web Development
                        </option>
                        <option value={"Database"}>Database</option>
                        <option value={"Cloud"}>Cloud</option>
                        <option value={"Web Framework"}>Web Framework</option>
                        <option value={"Tools"}>Tools</option>
                        <option value={"Graphic Design"}>Graphic Design</option>
                      </Select>
                    </FormControl>
                  </Grid>

                  {platform === "Web Development" || platform === "Cloud" ? (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className={classes.formControl}
                          multiple
                          size="small"
                          fullWidth
                          options={allskill}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.skillName}
                          renderOption={(option, { selected }) => (
                            <>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.skillName}
                            </>
                          )}
                          onChange={(event, newSelecedSkill) => {
                            setSelectedPlatforms([...newSelecedSkill]);
                          }}
                          renderInput={(params) => (
                            <TextField
                              className={classes.TextNeckxx}
                              {...params}
                              variant="outlined"
                              label={
                                platform === "Web Development"
                                  ? "Programing Language"
                                  : platform === "Cloud"
                                  ? "Cloud Service provider"
                                  : null
                              }
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  ) : null}

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        className={classes.formControl}
                        multiple
                        size="small"
                        fullWidth
                        options={allskill}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.skillName}
                        renderOption={(option, { selected }) => (
                          <>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.skillName}
                          </>
                        )}
                        onChange={(event, newSelecedSkill) => {
                          setSelectedSkills([...newSelecedSkill]);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.TextNeckxx}
                            {...params}
                            variant="outlined"
                            label="Select Skill"
                            placeholder="Favorites"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>

              <Divider className={classes.Divider10} />
              <CardContent>
                <Grid item xs={12} className={classes.gridFoot}>
                  <Typography
                    variant="h5"
                    className={classes.TextNotNow}
                    onClick={() => handleCreateFeaturedSKillModelClose(false)}
                  >
                    <Link
                      to={"/dashboard"}
                      className={classes.LinkUnderlineRemove}
                    >
                      Not Now
                    </Link>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.ButtonSubmit}
                    onClick={handleSubmitFeaturedSkill}
                  >
                    <Typography
                      variant="h5"
                      className={classes.TextButtonSubmit}
                    >
                      Create
                    </Typography>
                  </Button>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(createFeaturedSkillMui)(FeaturedSkill));
