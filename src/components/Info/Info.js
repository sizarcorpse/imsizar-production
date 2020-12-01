import React, { useState, useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  Avatar,
  Typography,
  IconButton,
  Box,
  Toolbar,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
const useStyles = makeStyles((theme) => ({
  ScuiInfoCard: {
    maxWidth: 800,
    maxHeight: 400,
    padding: theme.spacing(3),
    margin: "0px auto 24px",
  },

  ScuiBox: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "canter",
  },

  ScuiAvater: {
    borderRadius: 0,
    height: 250,
    width: 250,
    margin: "auto",
  },

  ScuiAvaterImage: {
    height: 250,
    width: "100%",
    objectFit: "cover",
  },

  ScuiIcon: {
    fontSize: 22,
    margin: "auto 16px",
    color: "#132743",
  },
  ScuiIconSingle: {
    fontSize: 20,
  },

  headText: {
    fontSize: 40,
    letterSpacing: -1.4,
    wordSpacing: 4,
    fontWeight: 700,
    fontStyle: "normal",
    fontVariant: "small-caps",
    color: "#132743",
  },
  neckText: {
    fontSize: 40,
    fontWeight: 700,
    fontStyle: "normal",
    lineHeight: 1.5,
    color: "#132743",
  },
  neckText2: {
    fontSize: 17,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#132743",
  },
}));

const Info = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Toolbar style={{ minHeight: 50, paddingRight: 0 }}></Toolbar>
        </Box>
      </Grid>

      <Grid item xs={12}>
        {" "}
        <Card className={classes.ScuiInfoCard}>
          <Grid container>
            <Grid item xs={8}>
              <Box alignItems="canter">
                <Box className={classes.ScuiBox}>
                  <Typography className={classes.neckText}>
                    {" "}
                    Contact Me{" "}
                  </Typography>
                </Box>

                <Box display="flex" mt={1}>
                  <EmailIcon className={classes.ScuiIcon} />
                  <Typography className={classes.neckText2}>
                    ramizimransizar@gmail.com
                  </Typography>
                </Box>
                <Box display="flex" mt={1}>
                  <PhoneIcon className={classes.ScuiIcon} />
                  <Typography className={classes.neckText2}>
                    +880 1927 366 856
                  </Typography>
                </Box>
                <Box display="flex" mt={1}>
                  <LocationOnIcon className={classes.ScuiIcon} />
                  <Typography className={classes.neckText2}>
                    Jessore, Bangladesh
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box bgcolor="orange">
                <Avatar className={classes.ScuiAvater}>
                  <img
                    className={classes.ScuiAvaterImage}
                    src="https://avatarfiles.alphacoders.com/183/183381.jpg"
                    alt=""
                  />
                </Avatar>
              </Box>
              <Box ml={1} mt={2} display="flex" justifyContent="center">
                <IconButton>
                  <FacebookIcon className={classes.ScuiIconSingle} />
                </IconButton>

                <IconButton>
                  <GitHubIcon className={classes.ScuiIconSingle} />
                </IconButton>

                <IconButton>
                  <TwitterIcon className={classes.ScuiIconSingle} />
                </IconButton>

                <IconButton>
                  <LinkedInIcon className={classes.ScuiIconSingle} />
                </IconButton>

                <IconButton>
                  <LanguageIcon className={classes.ScuiIconSingle} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Info;
