import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  mc: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "3px",
    margin: 0,
  },
  mb: {
    borderRadius: "20px",
    padding: "5px",
    color: "black",
    display: "flex",
    maxWidth: "80%",
    background: " #efefef",
  },
  mt: {
    width: "100%",
    letterSpacing: 0,
    fontSize: 14,
    wordWrap: "break-word",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    marginRight: "20px",
    whiteSpace: "pre-line",
  },
  mc2: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "3px",
    margin: 0,
  },
  mc3: {
    display: "flex",
    justifyContent: "flex-center",
    padding: "3px",
    margin: 0,
  },
}));

const Message = ({
  message: {
    messageID,
    messageCreatedAt,
    messageBody,
    senderUID,
    senderDisplayname,
    senderPhotoUrl,
  },
}) => {
  const { currentUser } = useAuth();
  const classes = useStyles();
  return (
    <>
      {currentUser.uid === senderUID ? (
        <Box className={classes.mc}>
          <Box className={classes.mb}>
            <Typography className={classes.mt}>{messageBody}</Typography>
            {senderPhotoUrl && (
              <Avatar
                style={{ justifyContent: "center" }}
                alt="Remy Sharp"
                src={senderPhotoUrl}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box className={classes.mc2}>
          <Box className={classes.mb}>
            {senderPhotoUrl && (
              <Avatar
                style={{ justifyContent: "center" }}
                alt="Remy Sharp"
                src={senderPhotoUrl}
              />
            )}
            <Typography className={classes.mt}>{messageBody}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Message;
