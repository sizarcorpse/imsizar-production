import React, { useState } from "react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #material-ui :
import { withStyles } from "@material-ui/core/styles";
import { blogPostMui } from "./muiBlogPosts";
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
  Divider,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import EditIcon from "@material-ui/icons/Edit";

const BlogsCommentsCard = (props) => {
  const { classes, comment, deleteBlogComment } = props;
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
      className={classes.cardC}
      onMouseEnter={() => setShowOption(true)}
      onMouseLeave={() => setShowOption(false)}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.more}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatarC}>
                <img
                  src={comment.commenterPhotoUrl}
                  alt=""
                  style={{ height: 50 }}
                />
              </Avatar>
            }
            title={
              <Box className={classes.header}>
                <Typography variant="h5" className={classes.headTextC}>
                  {comment.commenter}
                </Typography>
                <Typography variant="h5" className={classes.neckTextC}>
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
                    className={classes.IconButton}
                    onClick={handleMenuOpen}
                  >
                    <MoreHorizIcon className={classes.IconDelete} />
                  </IconButton>
                )}
                <IconButton className={classes.IconButton}>
                  <FavoriteIcon className={classes.IconDelete} />
                </IconButton>
              </Box>
            }
          />
          <Menu
            anchorEl={menuOpen}
            open={Boolean(menuOpen)}
            onClose={handleMenuClose}
            className={classes.menuComment}
          >
            <IconButton>
              <ThumbUpAltIcon className={classes.IconDelete} />
            </IconButton>
            {currentUser && currentUser.uid === comment.commenterID ? (
              <>
                <IconButton>
                  <EditIcon className={classes.IconDelete} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteBlogComment(
                      comment.blogCommentID,
                      comment.commenterID
                    );
                  }}
                >
                  <DeleteIcon className={classes.IconDelete} />
                </IconButton>
              </>
            ) : null}
          </Menu>
        </Grid>
        <Grid item xs={12} className={classes.GridProfileDetails}>
          <CardContent className={classes.Content}>
            <Typography variant="h5" className={classes.neckTextP}>
              {comment.blogCommentBody}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(blogPostMui)(BlogsCommentsCard);
