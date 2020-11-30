import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory, Redirect } from "react-router-dom";

import CreateReview from "../Reviews/CreateReview";

import { navMui } from "./muiNav";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  CardHeader,
  Divider,
  Button,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Box,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import TelegramIcon from "@material-ui/icons/Telegram";

const UserUI = (props) => {
  const { classes } = props;
  const { currentUser, logout, currentUserProfile } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);

  async function handleLogout(e) {
    setError("");
    try {
      await logout().then(() => {
        history.push("/login");
      });
    } catch {
      setError("Something went worng");
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModel = () => {
    setOpen(true);
  };
  const handleCloseModel = () => {
    setOpen(false);
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Link variant="button" to={"/dashboard"} className={classes.toolbarTitle}>
        <Badge aria-label="delete">
          <HomeIcon style={{ color: "#132743" }} />
        </Badge>
      </Link>

      <Box style={{ marginRight: 20 }}>
        {currentUser ? (
          <>
            <Button
              color="primary"
              startIcon={<TelegramIcon />}
              style={{ marginRight: 20 }}
              onClick={handleOpenModel}
            >
              <Typography variant="h5" className={classes.submitButtonText}>
                Create a Review
              </Typography>
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleCloseModel}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <CreateReview handleCloseModel={handleCloseModel} />
                </div>
              </Fade>
            </Modal>

            <Link variant="button" to={"/inbox"} className={classes.navLink}>
              <Badge color="secondary" badgeContent={12}>
                <MailIcon style={{ color: "#132743" }} />
              </Badge>
            </Link>
          </>
        ) : null}
      </Box>

      <Box>
        {currentUser ? (
          <Avatar
            aria-label="recipe"
            onMouseOver={handleClick}
            onClose={handleClose}
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>
          <CardHeader
            style={{ paddingLeft: 0 }}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img
                  src={currentUser.photoURL}
                  alt=""
                  style={{ height: 40, width: "100%", objectFit: "cover" }}
                />
              </Avatar>
            }
            title={
              <Typography variant="h5" className={classes.neckText}>
                {currentUser.displayName}
              </Typography>
            }
            subheader={
              <Typography variant="p" className={classes.neckText2}>
                {currentUser.email}
              </Typography>
            }
          />
        </MenuItem>
        <Divider
          style={{
            marginTop: "0px",
            marginBottom: "20px",
          }}
        />
        <Link
          variant="button"
          className={classes.link}
          to={`/u/${currentUserProfile && currentUserProfile.username}`}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="p" className={classes.neckText2}>
              Profile
            </Typography>
          </MenuItem>
        </Link>
        <Link variant="button" className={classes.link} to={"/accountsettings"}>
          <MenuItem onClick={handleClose}>
            <Typography variant="p" className={classes.neckText2}>
              Account Setting
            </Typography>
          </MenuItem>
        </Link>
        <Link variant="button" className={classes.link} to={"/profilesettings"}>
          <MenuItem onClick={handleClose}>
            <Typography variant="p" className={classes.neckText2}>
              Profile Setting
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Typography variant="p" className={classes.neckText2}>
            Help
          </Typography>
        </MenuItem>
        <Divider
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />

        <MenuItem onClick={handleLogout}>
          <Typography variant="p" className={classes.neckText2}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default withStyles(navMui)(UserUI);
