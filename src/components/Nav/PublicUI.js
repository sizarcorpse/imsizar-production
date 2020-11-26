import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { navMui } from "./muiNav";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Box, Grid, Button } from "@material-ui/core";

const PublicUI = (props) => {
  const { classes } = props;

  // const history = useHistory();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Public
        </Typography>
        <Box style={{ marginRight: 20, display: "flex" }}>
          <Link to={"/login"} className={classes.LinkUnderlineRemove}>
            <Button color="primary">
              <Typography variant="h5" className={classes.ButtonText}>
                Sign In
              </Typography>
            </Button>
          </Link>
          <Link to={"/signup"} className={classes.LinkUnderlineRemove}>
            <Button color="primary">
              <Typography variant="h5" className={classes.ButtonText}>
                Sign Up
              </Typography>
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </>
  );
};

export default withStyles(navMui)(PublicUI);
