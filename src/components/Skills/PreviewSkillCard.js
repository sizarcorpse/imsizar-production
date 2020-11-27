import React from "react";
// import clsx from "clsx";

//component

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
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LinkIcon from "@material-ui/icons/Link";
import StarsIcon from "@material-ui/icons/Stars";
const PreviewSkillCard = (props) => {
  const { classes, photo, previewSKillCard, status } = props;

  return (
    <>
      <Card className={classes.cardpreview}>
        <CardMedia className={classes.media} image={photo} />

        <CardHeader
          className={classes.CardHeader}
          title={
            <Typography variant="h5" className={classes.headText}>
              {previewSKillCard.skillName}
              <span className={classes.span} />
              {status.skillIsTop && (
                <IconButton className={classes.ButtonStatus}>
                  <FavoriteIcon className={classes.StatusIcon} />
                </IconButton>
              )}
              {status.skillIsFeatured && (
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
                {previewSKillCard.skillPlatform} |{" "}
                {previewSKillCard.skillExperiance}
              </Typography>
              <Typography variant="p" className={classes.neckText2} wrap>
                {previewSKillCard.skillDescription}
              </Typography>
            </>
          }
        />
      </Card>
    </>
  );
};

export default withStyles(skillCardMui)(PreviewSkillCard);
