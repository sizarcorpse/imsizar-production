import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

import AccountPopupMenu from "./AccountPopupMenu";
import CreateContentPopupMenu from "./CreateContentPopupMenu";

import { navMui } from "../muiNav";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Box,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import AppsIcon from "@material-ui/icons/Apps";

const AdminUI = (props) => {
  const { classes } = props;
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
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Admin
        </Typography>

        <Box style={{ marginRight: 20 }}>
          {currentUser.admin ? (
            <>
              <Button
                color="primary"
                startIcon={<AppsIcon />}
                style={{ marginRight: 20, cursor: "pointer" }}
                onMouseOver={handleContentMenuOpen}
                onClose={handleContentMenuClose}
              >
                <Typography variant="h5" className={classes.submitButtonText}>
                  Explore Imagination
                </Typography>
              </Button>

              <Link variant="button" to={"/admin"} className={classes.link}>
                <Badge aria-label="delete">
                  <DashboardIcon
                    style={{ color: "#132743", marginRight: 10 }}
                  />
                </Badge>
              </Link>
              <Link
                variant="button"
                to={"/dashboard"}
                className={classes.navLink}
              >
                <Badge aria-label="delete">
                  <HomeIcon style={{ color: "#132743" }} />
                </Badge>
              </Link>
              <Link variant="button" to={"/inbox"} className={classes.navLink}>
                <Badge color="secondary" badgeContent={12}>
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

export default withStyles(navMui)(AdminUI);
