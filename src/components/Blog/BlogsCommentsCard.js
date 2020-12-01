import React, { useState } from "react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #material-ui :
import clsx from "clsx";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";
import { withStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  Card,
  CardHeader,
  Grid,
  CardContent,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import EditIcon from "@material-ui/icons/Edit";

const BlogsCommentsCard = (props) => {
  const { classes, comment, deleteBlogComment, width } = props;
  const { currentUser } = useAuth();
  const [showOption, setShowOption] = useState(false);

  // #handlers : Menu
  const [menuOpen, setMenuOpen] = useState(null);
  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };
  return (
    <Card
      className={classes.ScuiCommentCard}
      onMouseEnter={() => setShowOption(true)}
      onMouseLeave={() => setShowOption(false)}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CardHeader
            avatar={
              <Avatar className={classes.ScuiAvaterSmall}>
                <img
                  src={comment.commenterPhotoUrl}
                  alt=""
                  className={classes.ScuiAvayerSmallImage}
                />
              </Avatar>
            }
            title={
              <Box
                className={clsx({
                  [classes.ScuiCommentHead]: width !== "xs",
                  [classes.ScuiCommentHeadXs]: width === "xs",
                })}
              >
                <Typography variant="subtitle1">{comment.commenter}</Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ margin: "auto 10px" }}
                >
                  {formatDistanceToNowStrict(
                    new Date(comment.blogCommentCreatedAt),
                    { addSuffix: true }
                  )}
                </Typography>
              </Box>
            }
            action={
              <Box>
                {showOption && (
                  <IconButton
                    className={classes.ScuiCommentIconButton}
                    onClick={handleMenuOpen}
                  >
                    <MoreHorizIcon className={classes.ScuiCommentIconSize} />
                  </IconButton>
                )}
                <IconButton className={classes.ScuiCommentIconButton}>
                  <FavoriteBorderIcon className={classes.ScuiCommentIconSize} />
                </IconButton>
              </Box>
            }
          />
          <Menu
            anchorEl={menuOpen}
            open={Boolean(menuOpen)}
            onClose={handleMenuClose}
            className={classes.ScuiMenuComment}
          >
            <IconButton>
              <ThumbUpAltIcon className={classes.ScuiCommentIconSize} />
            </IconButton>
            {currentUser && currentUser.uid === comment.commenterID ? (
              <>
                <IconButton>
                  <EditIcon className={classes.ScuiCommentIconSize} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteBlogComment(
                      comment.blogCommentID,
                      comment.commenterID
                    );
                  }}
                >
                  <DeleteIcon className={classes.ScuiCommentIconSize} />
                </IconButton>
              </>
            ) : null}
          </Menu>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.ScuiCommentBodyBox}>
            <CardContent className={classes.ScuiCommentBodyContent}>
              <Typography variant="subtitle2">
                {comment.blogCommentBody}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(MuiDistributor)(BlogsCommentsCard);
