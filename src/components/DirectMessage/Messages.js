import React, { useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";
import Message from "./Message";
import { Box } from "@material-ui/core";

const Messages = ({ messages, dummy }) => {
  return (
    <>
      <ScrollToBottom className="messages">
        {messages.map((message, i) => (
          <Box key={i}>
            <Message message={message} />
          </Box>
        ))}
      </ScrollToBottom>
    </>
  );
};

export default Messages;
