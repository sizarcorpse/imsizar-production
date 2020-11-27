import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

// #firebase :
import app from "../../firebase";

import { useAuth } from "../../contexts/AuthContext";

import { profileMiniMui } from "./muiMiniCard";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
const ProfileMiniCard = (props) => {
  const { classes, rid, trigger } = props;
  const { currentUser, currentUserProfile } = useAuth();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("trigger");
    getMiniPro();
  }, [trigger]);

  const getMiniPro = async () => {
    setLoading(true);
    let db = app.firestore();
    const document = db.doc(`users/${rid}`);
    await document
      .get()
      .then((doc) => {
        setProfile(doc.data());
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Card className={classes.card}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={profile.profilePhoto} alt="" style={{ height: 50 }} />
              </Avatar>
            }
            title={
              <Typography variant="h5" className={classes.headText}>
                {profile.profileName}
              </Typography>
            }
            subheader={
              <>
                <Typography variant="h5" className={classes.neckText}>
                  {profile.profileOrganization}
                </Typography>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.GridProfileDetails}>
          <CardContent>
            <Divider
              style={{
                marginTop: "1px",
                marginBottom: "1px",
              }}
            />
            <Typography variant="h5" className={classes.neckText}>
              {profile.profileHeadline}
            </Typography>
          </CardContent>
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
            <IconButton onClick={() => (window.location.href = profile.github)}>
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
              onClick={() => (window.location.href = profile.profileWebsite)}
            >
              <LanguageIcon className={classes.IconContact} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(profileMiniMui)(ProfileMiniCard);
