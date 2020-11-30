import React, { useState } from "react";

// #firebase :

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #components :
import UpdateSkill from "./UpdateSkill";

// #hooks :

// #material-ui :
import clsx from "clsx";
import { skillCardMui } from "./muiSKillCard";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Menu,
  MenuItem,
  Modal,
  Fade,
  Backdrop,
  Box,
  CssBaseline,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LinkIcon from "@material-ui/icons/Link";
import StarsIcon from "@material-ui/icons/Stars";

const SkillCard = (props) => {
  const { classes, skill, deleteSkill } = props;
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleOpenModel = () => {
    setOpen(true);
  };
  const handleCloseModel = () => {
    setOpen(false);
    setMenuOpen(null);
  };
  return (
    <Card
      className={classes.ScuiSkillCard}
      style={{ backgroundImage: `url(${skill.skillCoverPhoto})` }}
    >
      <CssBaseline />

      <Grid container>
        <Grid item xs={12}>
          <CardActions className={classes.ScuiCardAction}>
            <Box>
              {currentUser && currentUser.admin === true ? (
                <IconButton>
                  <MoreVertIcon onClick={handleMenuOpen} />
                </IconButton>
              ) : (
                <IconButton></IconButton>
              )}
              {currentUser && currentUser.admin === true ? (
                <Menu
                  id="simple-menu"
                  anchorEl={menuOpen}
                  open={Boolean(menuOpen)}
                  onClose={handleMenuClose}
                  className={clsx(
                    classes.ScuiMenuSmall,
                    classes.ScuiMenuSmallPadding
                  )}
                >
                  <MenuItem onClick={handleOpenModel}>
                    <Typography variant="h5">Update</Typography>
                  </MenuItem>
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
                        <UpdateSkill
                          handleCloseModel={handleCloseModel}
                          skill={skill}
                        />
                      </div>
                    </Fade>
                  </Modal>
                  <MenuItem
                    onClick={() => {
                      deleteSkill(skill.skillID);
                    }}
                  >
                    <Typography variant="h5">Delete</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleMenuClose}>
                    <Typography variant="h5">Report</Typography>
                  </MenuItem>
                </Menu>
              ) : null}
            </Box>
          </CardActions>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.ScuiCardHeaderBox}>
            <CardHeader
              className={classes.ScuiCardHeader}
              title={
                <Typography variant="h3">
                  {skill.skillName}
                  <span className={classes.ScuiSpan} />
                  {skill.skillIsTop && (
                    <IconButton className={classes.ScuiButtonStatus}>
                      <FavoriteIcon className={classes.ScuiStatusIcon} />
                    </IconButton>
                  )}
                  {skill.skillIsFeatured && (
                    <IconButton className={classes.ScuiButtonStatus}>
                      <StarsIcon className={classes.ScuiStatusIcon} />
                    </IconButton>
                  )}

                  <IconButton className={classes.ScuiButtonStatus}>
                    <LinkIcon className={classes.ScuiStatusIcon} />
                  </IconButton>
                </Typography>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.CardHeaderXX}>
            <CardHeader
              className={classes.CardHeader}
              subheader={
                <>
                  <Typography variant="subtitle1" style={{ color: "#f9f7f7" }}>
                    {skill.skillPlatform} | {skill.skillExperiance}
                  </Typography>
                  <Typography variant="subtitle2" style={{ color: "#f9f7f7" }}>
                    {skill.skillDescription}
                  </Typography>
                </>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(
  (theme) => ({
    ...skillCardMui(theme),
    ...MuiDistributor(theme),
  }),
  { withTheme: true }
)(SkillCard);
