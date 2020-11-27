import React, { useEffect, useRef, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { uuid } from "uuidv4";
import { useAuth } from "../../contexts/AuthContext";
import app from "../../firebase";

import Conversation from "./Conversation";
import UserDetails from "./UserDetails";

//---tab
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { conversationMui } from "./muiConversation";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  Paper,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

//---end tab

const DirectMessage = (props) => {
  const { currentUser } = useAuth();
  const { classes } = props;
  const [conversations, setConversations] = useState([]);
  //-tab
  const [value, setValue] = useState(parseInt(0));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("colleced conversation");
    getConversation();
  }, []);

  const getConversation = async () => {
    const db = app.firestore();

    let conversationRef = db
      .collection("conversations")
      .where("participants", "array-contains", `${currentUser.uid}`);

    conversationRef.onSnapshot(async (querySnapshot) => {
      let listOfConversations = [];
      querySnapshot.forEach(
        (conv) => {
          listOfConversations.push(conv.data());
        },
        (error) => {
          console.log(error);
        }
      );
      setConversations(listOfConversations);
    });
  };

  return (
    <>
      <Grid container component="main" className={classes.main}>
        <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
        <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
          <Paper className={classes.PaperMianCotent}>
            <Card className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {conversations &&
                  conversations.map((singleConversation, index) => (
                    <Tab
                      key={index}
                      label={
                        <UserDetails party={singleConversation.participants} />
                      }
                      {...a11yProps(parseInt(index))}
                    />
                  ))}
              </Tabs>
              {conversations &&
                conversations.map((singleConversation, index) => (
                  <TabPanel value={value} index={parseInt(index)} key={index}>
                    <Conversation scID={singleConversation} />
                  </TabPanel>
                ))}
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      </Grid>
    </>
  );
};

export default withStyles(conversationMui)(DirectMessage);
