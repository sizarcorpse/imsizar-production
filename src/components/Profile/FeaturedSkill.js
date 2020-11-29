import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #hooks :
import { useSnackbar } from "notistack";

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
  Select,
  InputLabel,
  Paper,
  Checkbox,
  Box,
  Toolbar,
  IconButton,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CategoryIcon from "@material-ui/icons/Category";
import CloseIcon from "@material-ui/icons/Close";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FeaturedSkill = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateFeaturedSKillModelClose, width } = props;
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
  const inputLabelY = useRef(null);
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
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiModalBG)}
    >
      <CssBaseline />
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton
              onClick={() => handleCreateFeaturedSKillModelClose(false)}
            >
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
                title={
                  <Typography variant="h2">Create Featured Skill</Typography>
                }
                subheader={
                  <Typography variant="h4" color="secondary">
                    Acquire new skills ? Lets share.
                  </Typography>
                }
              />
              <Divider className={classes.ScuiDividerT24} />
              {/* // #action : */}
              <form noValidate>
                <CardContent className={classes.ScuiCardLargeMainArea}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.ScuiSelect}
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
                          <option value={"Graphic Design"}>
                            Graphic Design
                          </option>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* // #action : */}
                    {platform === "Web Development" || platform === "Cloud" ? (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <Autocomplete
                            className={classes.ScuiSelect}
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

                    {/* // #action : */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className={classes.ScuiSelect}
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

                <Divider className={classes.ScuiDividerT24} />
                {/* // #action : */}
                <CardContent>
                  <Grid item xs={12} className={classes.ScuiGridFooter}>
                    <Typography
                      variant="h6"
                      onClick={() => handleCreateFeaturedSKillModelClose(false)}
                    >
                      <Link
                        to={"/dashboard"}
                        className={classes.ScuiLinkUnderLineRemove}
                      >
                        Not Now
                      </Link>
                    </Typography>
                    <Button
                      /* type="submit" */
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={handleSubmitFeaturedSkill}
                    >
                      <Typography variant="h5">Create</Typography>
                    </Button>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(FeaturedSkill));
