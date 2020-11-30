import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app, { stroage } from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
// import PreviewSkillCard from "./PreviewSkillCard";

// #validations :
import { validationSchema } from "./CreateSkillFormValidation";

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
  Input,
  TextareaAutosize,
  Select,
  InputLabel,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Hidden,
  Box,
  Toolbar,
  IconButton,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import CategoryIcon from "@material-ui/icons/Category";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import CloseIcon from "@material-ui/icons/Close";
const CreateSkill = (props) => {
  const { currentUser } = useAuth();
  const { classes, handleCreateSkillModelClose, width } = props;
  const [loading, setLoading] = useState(false);
  const [skillCoverPhoto, setSkillCoverPhoto] = useState(null);
  const [previewCoverPhoto, setPreviewCoverPhoto] = useState(null);
  const imp = useRef();
  const [previewSKillCard, setPreviewSKillCard] = useState({});
  const [status, setStatus] = React.useState({
    skillIsTop: false,
    skillIsFeatured: false,
  });

  const initialValues = {
    skillName: "",
    skillDescription: "",
    skillWebsite: "",
    skillExperiance: "",
    skillPlatform: "",
  };

  const [labelWidthX, setLabelWidthX] = useState(0);
  const inputLabelX = useRef(null);
  useEffect(() => {
    setLabelWidthX(inputLabelX.current.offsetWidth);
    setLabelWidthY(inputLabelY.current.offsetWidth);
  }, []);

  const [labelWidthY, setLabelWidthY] = useState(0);
  const inputLabelY = useRef(null);

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setSkillCoverPhoto(e.target.files[0]);
      setPreviewCoverPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleStatusChange = (event) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };

  console.log("status", status);
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const {
      skillName,
      skillDescription,
      skillWebsite,
      skillExperiance,
      skillPlatform,
    } = values;

    const db = app.firestore();

    const uploadTask = stroage
      .ref(`skillCover/${skillCoverPhoto.name}`)
      .put(skillCoverPhoto);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("you do not", error);
      },
      () => {
        stroage
          .ref("skillCover")
          .child(skillCoverPhoto.name)
          .getDownloadURL()
          .then((url) => {
            if (url) {
              console.log("got url");
              console.log(url);
              const newSkill = {
                skillID: uuidv4(),
                skillCreatedAt: new Date().toISOString(),
                skillCreatorID: currentUser.uid,
                skillName,
                skillDescription,
                skillWebsite,
                skillExperiance,
                skillPlatform,
                skillCoverPhoto: url,
                skillIsTop: status.skillIsTop,
                skillIsFeatured: status.skillIsFeatured,
                skillLikeCount: 0,
              };

              db.doc(`skills/${newSkill.skillID}`)
                .set(newSkill)
                .then(() => {
                  console.log("Document successfully written!");
                  setLoading(false);
                  handleCreateSkillModelClose(false);
                })
                .catch(() => console.log("error error"));
            } else {
              console.log("no url");
            }
          });
      }
    );
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
            <IconButton onClick={() => handleCreateSkillModelClose(false)}>
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
                title={<Typography variant="h2">Create Skill</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Acquire new skills ? Lets share.
                  </Typography>
                }
              />
              {/* // #action : */}
              <Divider className={classes.ScuiDividerT24} />

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                  } = props;
                  return (
                    <Form noValidate>
                      <CardContent className={classes.ScuiCardLargeMainArea}>
                        {setPreviewSKillCard(values)}

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              onClick={() => imp.current.click()}
                              fullWidth
                              className={classes.uploadImageButton}
                            >
                              {previewCoverPhoto ? (
                                <>
                                  <img
                                    src={previewCoverPhoto}
                                    alt=""
                                    style={{ height: 40 }}
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  <AddPhotoAlternateIcon />
                                  <Typography
                                    style={{
                                      marginLeft: "3px",
                                      marginRight: "5px",
                                    }}
                                  ></Typography>
                                </>
                              )}
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.skillName && Boolean(errors.skillName)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.skillName &&
                                    Boolean(errors.skillName) ? (
                                      <InputAdornment position="start">
                                        <AddBoxIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <AddBoxIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                label="Skill Name"
                                name="skillName"
                                id="skillName"
                                value={values.skillName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          {/* // #action : */}
                          <Grid item xs={12}>
                            <FormControl
                              variant="outlined"
                              className={classes.ScuiSelect}
                              error={
                                touched.skillExperiance &&
                                Boolean(errors.skillExperiance)
                              }
                              fullWidth
                              required
                            >
                              <InputLabel
                                ref={inputLabelX}
                                className={classes.focused}
                                id="skillExperiance"
                              >
                                Experiance
                              </InputLabel>
                              <Select
                                native
                                labelId="skillExperiance"
                                id="skillExperiance"
                                value={values.skillExperiance}
                                onChange={handleChange}
                                /* onChange={handleExperianceChange} */
                                labelWidth={labelWidthX}
                                startAdornment={
                                  touched.skillName &&
                                  Boolean(errors.skillName) ? (
                                    <InputAdornment position="start">
                                      <BusinessCenterIcon
                                        style={{ color: "red" }}
                                      />
                                    </InputAdornment>
                                  ) : (
                                    <InputAdornment position="start">
                                      <BusinessCenterIcon />
                                    </InputAdornment>
                                  )
                                }
                                style={{ color: "#132743" }}
                              >
                                <option aria-label="None" value="" />
                                <option value={"Hands On"}>Hands On</option>
                                <option value={"Beginner"}>Beginner</option>
                                <option value={"Intermediate"}>
                                  Intermediate
                                </option>
                                <option value={"Professional"}>
                                  Professional
                                </option>
                                <option value={"Expert"}>Expert</option>
                                <option value={"Specialist"}>Specialist</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              variant="outlined"
                              className={classes.ScuiSelect}
                              fullWidth
                              error={
                                touched.skillPlatform &&
                                Boolean(errors.skillPlatform)
                              }
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
                                value={values.skillPlatform}
                                onChange={handleChange}
                                /* onChange={handlePlatformChange} */
                                labelWidth={labelWidthY}
                                startAdornment={
                                  touched.skillName &&
                                  Boolean(errors.skillName) ? (
                                    <InputAdornment position="start">
                                      <CategoryIcon style={{ color: "red" }} />
                                    </InputAdornment>
                                  ) : (
                                    <InputAdornment position="start">
                                      <CategoryIcon />
                                    </InputAdornment>
                                  )
                                }
                                style={{ color: "#132743" }}
                              >
                                <option aria-label="None" value="" />
                                <option value={"Web Development"}>
                                  Web Development
                                </option>
                                <option value={"Web Application"}>
                                  Web Application
                                </option>
                                <option value={"Web Design"}>Web Design</option>
                                <option value={"Database"}>Database</option>
                                <option value={"Cloud"}>Cloud</option>
                                <option value={"Web Framework"}>
                                  Web Framework
                                </option>
                                <option value={"Tools"}>Tools</option>
                                <option value={"Programming Language"}>
                                  Programming Language
                                </option>
                                <option value={"Query Language"}>
                                  Query Language
                                </option>
                                <option value={"Graphic Design"}>
                                  Graphic Design
                                </option>
                              </Select>
                            </FormControl>
                          </Grid>
                          {/* // #action : */}
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.skillWebsite &&
                                Boolean(errors.skillWebsite)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.skillWebsite &&
                                    Boolean(errors.skillWebsite) ? (
                                      <InputAdornment position="start">
                                        <WebAssetIcon
                                          style={{ color: "red" }}
                                        />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <WebAssetIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                required
                                variant="outlined"
                                label="Website"
                                name="skillWebsite"
                                id="skillWebsite"
                                value={values.skillWebsite}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.skillDescription &&
                                Boolean(errors.skillDescription)
                              }
                              fullWidth
                              color="primary"
                            >
                              <TextareaAutosize
                                variant="outlined"
                                className={classes.ScuiTextAreaSmall}
                                rowsMin={8}
                                aria-label="maximum height"
                                placeholder="Share something about your skill."
                                defaultValue=""
                                name="skillDescription"
                                id="skillDescription"
                                value={values.skillDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>

                          {/* // #action : */}
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                              <FormGroup row className={classes.FromGroupCheck}>
                                {" "}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      icon={
                                        <FavoriteBorder
                                          style={{ color: "#c1c1c1" }}
                                        />
                                      }
                                      checkedIcon={
                                        <Favorite
                                          style={{ color: "#d44fff" }}
                                        />
                                      }
                                      name="skillIsTop"
                                      checked={status.skillIsTop}
                                      onChange={handleStatusChange}
                                    />
                                  }
                                  label={
                                    <Typography variant="h4" color="secondary">
                                      is Featured ?
                                    </Typography>
                                  }
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      icon={
                                        <StarBorderIcon
                                          style={{ color: "#c1c1c1" }}
                                        />
                                      }
                                      checkedIcon={
                                        <StarIcon
                                          style={{ color: "#FFD700" }}
                                        />
                                      }
                                      name="skillIsFeatured"
                                      checked={status.skillIsFeatured}
                                      onChange={handleStatusChange}
                                    />
                                  }
                                  label={
                                    <Typography variant="h4" color="secondary">
                                      Make this Top
                                    </Typography>
                                  }
                                />
                              </FormGroup>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Input
                                inputProps={{
                                  className: classes.UpInput,
                                  ref: imp,
                                }}
                                required
                                name="skillCoverPhoto"
                                label="skillCoverPhoto"
                                type="file"
                                id="skillCoverPhoto"
                                style={{ visibility: "hidden" }}
                                onChange={handlePhotoUpload}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider className={classes.ScuiDividerTB8} />
                      <CardContent>
                        <Grid item xs={12} className={classes.ScuiGridFooter}>
                          <Typography
                            variant="h6"
                            onClick={() => handleCreateSkillModelClose(false)}
                          >
                            <Link
                              to={"/dashboard"}
                              className={classes.ScuiLinkUnderLineRemove}
                            >
                              Not Now
                            </Link>
                          </Typography>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                          >
                            <Typography variant="h5">Create</Typography>
                          </Button>
                        </Grid>
                      </CardContent>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
            {/* <Hidden xsDown>
              <PreviewSkillCard
                photo={previewCoverPhoto}
                status={status}
                previewSKillCard={previewSKillCard}
              />
            </Hidden> */}
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={3} md={2} sm={1} />
    </Grid>
  );
};
export default withWidth()(withStyles(MuiDistributor)(CreateSkill));
