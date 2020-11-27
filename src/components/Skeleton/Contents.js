import React from "react";
import PropTypes from "prop-types";

//components
import Skills from "../Skills/Skills";
import Reviews from "../Reviews/Reviews";
import Contact from "../Contact/Contact";
import BlogPosts from "../Blog/BlogPosts";
import PhotoGallery from "../Gallery/Gallery";
//contexts

//hooks

//mui
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTab-root": {
      minWidth: 90,
    },
  },
  neckText2: {
    fontSize: 15,
    fontWeight: 700,
    fontStyle: "normal",
    color: "#132743",
    textDecoration: "none",
    textTransform: "none",
  },
}));

export default function Contents() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
        className={classes.root}
      >
        <Tab
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Skills
            </Typography>
          }
          {...a11yProps(0)}
        />
        <Tab
          style={{ minWidth: 90 }}
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Reviews
            </Typography>
          }
          {...a11yProps(1)}
        />
        <Tab
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Blog
            </Typography>
          }
          {...a11yProps(2)}
        />
        <Tab
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Gallery
            </Typography>
          }
          {...a11yProps(3)}
        />
        <Tab
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Events
            </Typography>
          }
          {...a11yProps(4)}
        />
        <Tab
          label={
            <Typography variant="h5" className={classes.neckText2}>
              Contact
            </Typography>
          }
          {...a11yProps(5)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Skills />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Reviews />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BlogPosts />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PhotoGallery />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Events
      </TabPanel>
      <TabPanel value={value} index={5}>
        Contact
      </TabPanel>
    </div>
  );
}
