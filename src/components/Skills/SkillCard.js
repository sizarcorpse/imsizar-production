import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
//component
import UpdateSkill from "./UpdateSkill";
//firebase

//hook

//mui
import { skillCardMui } from "./muiSKillCard";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  CardActions,
  Menu,
  MenuItem,
  Collapse,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LinkIcon from "@material-ui/icons/Link";
import StarsIcon from "@material-ui/icons/Stars";
const SkillCard = (props) => {
  const { classes, skill, width, deleteSkill } = props;
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
    <>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={skill.skillCoverPhoto} />

        <CardHeader
          className={classes.CardHeader}
          title={
            <Typography variant="h5" className={classes.headText}>
              {skill.skillName}
              <span className={classes.span} />
              {skill.skillIsTop && (
                <IconButton className={classes.ButtonStatus}>
                  <FavoriteIcon className={classes.StatusIcon} />
                </IconButton>
              )}
              {skill.skillIsFeatured && (
                <IconButton className={classes.ButtonStatus}>
                  <StarsIcon className={classes.StatusIcon} />
                </IconButton>
              )}

              <IconButton className={classes.ButtonStatus}>
                <LinkIcon className={classes.StatusIcon} />
              </IconButton>
            </Typography>
          }
          subheader={
            <>
              <Typography variant="h5" className={classes.neckText}>
                {skill.skillPlatform} | {skill.skillExperiance}
              </Typography>
              <Typography variant="p" className={classes.neckText2}>
                {skill.skillDescription}
              </Typography>
            </>
          }
        />
        <CardActions className={classes.CardHeadOption}>
          <IconButton className={classes.ButtonLike}>
            {/* <ThumbUpIcon className={classes.IconLike} /> */}
          </IconButton>
          {currentUser && currentUser.admin === true ? (
            <IconButton>
              <MoreVertIcon onClick={handleMenuOpen} />
            </IconButton>
          ) : null}
          {currentUser && currentUser.admin === true ? (
            <Menu
              id="simple-menu"
              anchorEl={menuOpen}
              open={Boolean(menuOpen)}
              onClose={handleMenuClose}
              className={classes.menu}
            >
              <MenuItem onClick={handleOpenModel}>
                <Typography variant="p" className={classes.neckText3}>
                  Update
                </Typography>
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
                <Typography variant="p" className={classes.neckText3}>
                  Delete
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <Typography variant="p" className={classes.neckText3}>
                  Report
                </Typography>
              </MenuItem>
            </Menu>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

export default withStyles(skillCardMui)(SkillCard);
