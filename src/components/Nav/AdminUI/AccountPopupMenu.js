import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { navMui } from "../muiNav";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  CardHeader,
  Divider,
  Typography,
  Avatar,
} from "@material-ui/core";

function AccountPopupMenu(props) {
  const { currentUser } = useAuth();
  const {
    classes,
    profileMenuOpen,
    handleProfileMenuClose,
    handleLogout,
  } = props;

  return (
    <Menu
      anchorEl={profileMenuOpen}
      open={Boolean(profileMenuOpen)}
      onClose={handleProfileMenuClose}
      onMouseLeave={handleProfileMenuClose}
      className={classes.menu}
    >
      <MenuItem onClick={handleProfileMenuClose}>
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
      <MenuItem onClick={handleProfileMenuClose}>
        <Typography variant="p" className={classes.neckText2}>
          Profile
        </Typography>
      </MenuItem>
      <Link
        variant="button"
        to={"#"}
        className={classes.link}
        to={"/profilesettings"}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Typography variant="p" className={classes.neckText2}>
            Profile Setting
          </Typography>
        </MenuItem>
      </Link>
      <Link
        variant="button"
        to={"#"}
        className={classes.link}
        to={"/accountsettings"}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Typography variant="p" className={classes.neckText2}>
            Account Setting
          </Typography>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuClose}>
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
  );
}
export default withStyles(navMui)(AccountPopupMenu);
