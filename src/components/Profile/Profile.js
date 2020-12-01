import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//firebase
import app, { stroage } from "../../firebase";

//
import FeaturedSkillCard from "./FeaturedSkillCard";
import Contact from "../Contact/Contact";
import CreateConversation from "../DirectMessage/CreateConversation";
// contexts
import { useAuth } from "../../contexts/AuthContext";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { createProfileMui } from "./muiProfile";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Typography,
  Button,
  IconButton,
  CardActions,
  Box,
  Modal,
  Backdrop,
  Fade,
  Hidden,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import TelegramIcon from "@material-ui/icons/Telegram";
import InfoIcon from "@material-ui/icons/Info";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import { Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const Profile = (props) => {
  const { currentUser } = useAuth();
  const { classes, width } = props;
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [featuredSkills, setFeaturedSkills] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("found profile ");
    getProfile();
  }, []);

  function getProfile() {
    setLoading(true);
    const db = app.firestore();

    db.collection("users")
      .where("username", "==", "sizarcorpse")
      .limit(1)
      .get()
      .then((doc) => {
        doc.forEach((d) => {
          setProfile(d.data());
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log("getFeaturedSkill");
    getFeaturedSkill();
  }, []);

  function getFeaturedSkill() {
    setLoading(true);
    const db = app.firestore();
    db.collection("featuredSkills")
      .get()
      .then((doc) => {
        let items = [];
        doc.forEach((d) => {
          items.push(d.data());
        });
        setFeaturedSkills(items);
      })
      .finally(() => setLoading(false));
  }

  const [contactMeModelOpen, setContactMeModelOpen] = useState(false);
  const handleContactMeModelOpen = () => {
    setContactMeModelOpen(true);
  };
  const handleContactMeModelClose = () => {
    setContactMeModelOpen(false);
  };

  const [createConvModelOpen, setCreateConvModelOpen] = useState(false);
  const handleCreateConvModelOpen = () => {
    setCreateConvModelOpen(true);
  };
  const handleCreateConvModelClose = () => {
    setCreateConvModelOpen(false);
  };

  return (
    <Card
      className={clsx({
        [classes.card]: width === "xl" || width === "lg" || width === "md",
        [classes.cardX]: width === "sm" || width === "xs",
      })}
      elevation={width === "sm" || width === "xs" ? 0 : 1}
    >
      <Grid container spacing={0}>
        <Box
          className={clsx({
            [classes.newC]: width === "sm" || width === "xs",
          })}
        >
          <Grid item xs={12}>
            <CardHeader
              className={classes.CardHeaderProfilePhoto}
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.AvatarProfilePhoto}
                >
                  <img
                    src={profile.profilePhoto}
                    alt=""
                    className={classes.AvatarProfilePhotoImage}
                  />
                </Avatar>
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.GridProfileDetails}
            style={{ background: "transparent" }}
          >
            <CardHeader
              className={classes.CardHeaderProfileDetails}
              title={
                <Typography variant="h5" className={classes.TextHead}>
                  {profile.profileName}
                </Typography>
              }
              subheader={
                <>
                  <Typography variant="h5" className={classes.TextNeck}>
                    {profile.profileHeadline}
                  </Typography>
                  <Box className={classes.CardSubheaderProfileDetails}>
                    <LocationOnIcon className={classes.LocationIcon} />
                    <Typography
                      variant="h5"
                      className={classes.TextNeckLocation}
                    >
                      {profile.profileLocation}, {profile.profileCountry}
                    </Typography>
                  </Box>
                </>
              }
            />
          </Grid>
          <CardContent
            className={classes.CardContentCotact}
            style={{ background: "transparent" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<InfoIcon className={classes.ButtonIconColor} />}
                  onClick={handleContactMeModelOpen}
                >
                  <Typography variant="h5" className={classes.ButtonText}>
                    Lets Talk
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  disabled={!currentUser}
                  startIcon={
                    <TelegramIcon className={classes.ButtonIconColor} />
                  }
                  onClick={handleCreateConvModelOpen}
                >
                  <Typography variant="h5" className={classes.ButtonText}>
                    Message
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.GridProfileDetails}>
                {profile.facebook && (
                  <IconButton
                    onClick={() => (window.location.href = profile.facebook)}
                  >
                    <FacebookIcon className={classes.IconContact} />
                  </IconButton>
                )}
                {profile.github && (
                  <IconButton
                    onClick={() => (window.location.href = profile.github)}
                  >
                    <GitHubIcon className={classes.IconContact} />
                  </IconButton>
                )}
                {profile.twitter && (
                  <IconButton
                    onClick={() => (window.location.href = profile.twitter)}
                  >
                    <TwitterIcon className={classes.IconContact} />
                  </IconButton>
                )}
                {profile.linkedin && (
                  <IconButton
                    onClick={() => (window.location.href = profile.linkedin)}
                  >
                    <LinkedInIcon className={classes.IconContact} />
                  </IconButton>
                )}
                {profile.profileWebsite && (
                  <IconButton
                    onClick={() =>
                      (window.location.href = profile.profileWebsite)
                    }
                  >
                    <LanguageIcon className={classes.IconContact} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Modal
              className={classes.modal}
              open={contactMeModelOpen}
              onClose={handleContactMeModelClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={contactMeModelOpen}>
                <div className={classes.paper}>
                  <Contact
                    handleContactMeModelClose={handleContactMeModelClose}
                  />
                </div>
              </Fade>
            </Modal>

            <Modal
              className={classes.modal}
              open={createConvModelOpen}
              onClose={handleCreateConvModelClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={createConvModelOpen}>
                <div className={classes.paper}>
                  <CreateConversation
                    handleCreateConvModelClose={handleCreateConvModelClose}
                  />
                </div>
              </Fade>
            </Modal>
            <Divider className={classes.Divider20} />
          </CardContent>
        </Box>

        <Hidden smDown="true">
          <CardContent>
            {featuredSkills &&
              featuredSkills
                .slice(0, 1)
                .map((fsk, i) => <FeaturedSkillCard fsk={fsk} />)}
          </CardContent>

          <CardActions className={classes.ButtonExpand}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {featuredSkills &&
                featuredSkills
                  .slice(1)
                  .map((fsk, i) => <FeaturedSkillCard fsk={fsk} />)}
            </CardContent>
          </Collapse>

          <Grid container>
            <CardContent>
              <Grid item xs={12} className={classes.GridBio}>
                <Typography variant="h5" className={classes.TextNeckBio}>
                  About me
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.GridBio}>
                <Typography
                  variant="body1"
                  coponent="p"
                  className={classes.TextNeckBioDetails}
                >
                  {profile.profileAboutMe}
                </Typography>
              </Grid>
            </CardContent>
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export default withWidth()(withStyles(createProfileMui)(Profile));
