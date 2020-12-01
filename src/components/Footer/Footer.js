import React from "react";

import withWidth from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, Typography, IconButton, Box } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
const useStyles = makeStyles((theme) => ({
  ScuiIcon: {
    fontSize: 22,
    margin: "auto 16px",
    color: "#132743",
  },
  ScuiIconSingle: {
    fontSize: 20,
  },
  neckText: {
    fontSize: 13,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#132743",
    margin: theme.spacing(1),
  },
}));

const Footer = ({ width }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display="flex"
        style={{ marginTop: 24, marginBottom: 40 }}
      >
        <Divider style={{ marginTop: 24, marginBottom: 24 }} />

        <Box
          display="flex"
          mx={width !== "xs" ? 10 : 1}
          flexDirection={width !== "xs" ? "row" : "column"}
        >
          <Box display="flex" flexDirection="row" flexGrow={1} margin="auto">
            <Typography className={classes.neckText}>
              {" "}
              💀 2020, SizarCorpse
            </Typography>
            <Typography className={classes.neckText}> License</Typography>
            <Typography className={classes.neckText}> Terms</Typography>
            <Typography className={classes.neckText}> Privacy</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            mx={width !== "xs" ? 0 : "auto"}
          >
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default withWidth()(Footer);
