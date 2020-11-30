import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

import AccountPopupMenu from "./AccountPopupMenu";
import CreateContentPopupMenu from "./CreateContentPopupMenu";

import clsx from "clsx";
import { navMui } from "../muiNav";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Box,
  Hidden,
} from "@material-ui/core";

import RemoveFromQueueIcon from "@material-ui/icons/RemoveFromQueue";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import AppsIcon from "@material-ui/icons/Apps";

const AdminUI = (props) => {
  const { classes, width } = props;
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Something went worng");
    }
  }
  const [profileMenuOpen, setProfileMenuOpen] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setProfileMenuOpen(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuOpen(null);
  };

  const [contentMenuOpen, setContentMenuOpen] = useState(null);
  const handleContentMenuOpen = (event) => {
    setContentMenuOpen(event.currentTarget);
  };
  const handleContentMenuClose = () => {
    setContentMenuOpen(null);
  };

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link
          variant="button"
          to={"/dashboard"}
          className={classes.toolbarTitle}
        >
          <Badge>
            <HomeIcon style={{ color: "#132743" }} />
          </Badge>
        </Link>

        <Box className={classes.navBarAppBox}>
          {currentUser.admin ? (
            <>
              <Button
                color="primary"
                startIcon={<AppsIcon />}
                style={{ cursor: "pointer" }}
                onMouseOver={handleContentMenuOpen}
                onClose={handleContentMenuClose}
                className={classes.navBarApp}
              >
                <Hidden only="xs">
                  <Typography variant="h4">Explore Imagination</Typography>
                </Hidden>
              </Button>

              <Link
                variant="button"
                to={"/admin"}
                className={classes.navBarApp}
              >
                <Badge aria-label="delete">
                  <RemoveFromQueueIcon style={{ color: "#132743" }} />
                </Badge>
              </Link>

              <Link
                variant="button"
                to={"/inbox"}
                className={classes.navBarApp}
              >
                <Badge color="secondary">
                  <MailIcon style={{ color: "#132743" }} />
                </Badge>
              </Link>
            </>
          ) : null}
        </Box>

        {/* ------- */}
        <Box>
          {currentUser.admin ? (
            <Avatar
              onMouseOver={handleProfileMenuOpen}
              onClose={handleProfileMenuClose}
              className={classes.avatar2}
            >
              <img
                src={currentUser.photoURL}
                alt=""
                style={{ height: 30, width: "100%", objectFit: "cover" }}
              />
            </Avatar>
          ) : null}
        </Box>

        <AccountPopupMenu
          profileMenuOpen={profileMenuOpen}
          handleProfileMenuClose={handleProfileMenuClose}
          handleLogout={handleLogout}
        />

        <CreateContentPopupMenu
          contentMenuOpen={contentMenuOpen}
          handleContentMenuClose={handleContentMenuClose}
        />
      </Toolbar>
    </>
  );
};

export default withWidth()(withStyles(navMui)(AdminUI));
