import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import app from "../../firebase";

import Messages from "./Messages";

import { conversationMui } from "./muiConversation";
import { FormControl, TextField, Box } from "@material-ui/core";

const Conversation = (props) => {
  const { currentUser } = useAuth();
  const { scID, classes } = props;

  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  // const dummy = useRef();
  useEffect(() => {
    console.log("colleced conversation");
    getConversation();
  }, []);

  const getConversation = async () => {
    const db = app.firestore();
    let conv = db
      .collection("conversations")
      .doc(`${scID.conversationID}`)
      .collection("messages")
      .orderBy("messageCreatedAt")
      .limitToLast(15);

    conv.onSnapshot((messages) => {
      let bo = [];
      messages.forEach((message) => {
        bo.push(message.data());
      });
      setMessages(bo);

      // dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  };
  //   console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    const db = app.firestore();

    const newText = {
      messageID: uuidv4(),
      messageCreatedAt: new Date().toISOString(),
      messageBody: textMessage,
      senderUID: currentUser.uid,
      senderDisplayname: currentUser.displayName,
      senderPhotoUrl: currentUser.photoURL,
    };

    await db
      .collection("conversations")
      .doc(`${scID.conversationID}`)
      .collection("messages")
      .doc(newText.messageID)
      .set(newText)
      .then(() => {
        setTextMessage("");
      });
  };

  return (
    <>
      <Box className={classes.container}>
        <Messages messages={messages} />
      </Box>

      <div className={classes.inputArea}>
        <form>
          <FormControl
            fullWidth
            style={{
              padding: "0px 30px 10px 30px",
              height: "30px",
              margin: 0,
            }}
          >
            <TextField
              placeholder="Type a message"
              type="text"
              margin="normal"
              required
              value={textMessage}
              autoFocus
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
              className={classes.rootx}
            />
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default withStyles(conversationMui)(Conversation);

//EOcaBSskqLeapjq59bSD3XXzi853
//9jpkGFX4qDhTq7OsPLavTAiyiuk2
