import React, { useEffect, useState } from "react";
import clsx from "clsx";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { createProfileMui } from "./muiProfile";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

import CodeIcon from "@material-ui/icons/Code";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const FeaturedSkillCard = (props) => {
  const { classes, fsk } = props;

  return (
    <Card className={classes.CardFeaturedSkill}>
      <CardHeader
        title={
          <Box className={classes.CardSubheaderCardFeaturedSkill}>
            <CodeIcon className={classes.IconFeaturedSkill} />
            <Typography
              variant="h5"
              className={classes.TextNeckCardFeaturedSkill}
            >
              {fsk.featureSkillName}
            </Typography>
          </Box>
        }
      />
      <CardContent className={classes.CardFeaturedSkillPlatform}>
        <Typography
          variant="body2"
          className={classes.TextNeckFeaturedSkillPlatformName}
        >
          {fsk.featureSkillSub}
        </Typography>
        <Grid
          container
          spacing={1}
          className={classes.GridFeaturedSkillPlatform}
        >
          <Grid
            item
            xs={12}
            className={classes.GridFeaturedSkillPlatformImageitem}
          >
            {fsk.featureSkillPatform.map((fksi) => (
              <img
                src={fksi.skillCoverPhoto}
                alt=""
                title={fksi.skillName}
                className={classes.ImageFeaturedSkillPlatform}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent className={classes.CardFeaturedSkillPlatform}>
        <Typography
          variant="body2"
          className={classes.TextNeckFeaturedSkillPlatformName}
        >
          Top Skills
        </Typography>
        <Grid
          container
          spacing={1}
          className={classes.GridFeaturedSkillPlatform}
        >
          <Grid
            item
            xs={12}
            className={classes.GridFeaturedSkillPlatformImageitem}
          >
            {fsk.featureSkills.map((fksi) => (
              <img
                src={fksi.skillCoverPhoto}
                alt=""
                title={fksi.skillName}
                className={classes.ImageFeaturedSkillPlatform}
              />
            ))}
          </Grid>
          <Grid item xs={12} className={classes.GridFeaturedSkillPlatformFoot}>
            <Button
              className={classes.ButtonMore}
              endIcon={<ArrowForwardIcon style={{ fontSize: 15 }} />}
            >
              <Typography variant="body2" className={classes.TextNeckMore}>
                Learn More
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withWidth()(withStyles(createProfileMui)(FeaturedSkillCard));
