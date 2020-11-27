import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory, Redirect } from "react-router-dom";

// import UserUI from "./UserUI";
// import AdminUI from "./AdminUI/AdminUI";
import PublicUI from "./PublicUI";

import { navMui } from "./muiNav";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, CssBaseline } from "@material-ui/core";

const Nav = (props) => {
  const { classes } = props;
  const { currentUser } = useAuth();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <PublicUI />
        {/* {currentUser && currentUser.admin === undefined ? (
          <UserUI />
        ) : currentUser && currentUser.admin === true ? (
          <AdminUI />
        ) : (
          <PublicUI />
        )} */}
      </AppBar>
    </>
  );
};

export default withStyles(navMui)(Nav);
