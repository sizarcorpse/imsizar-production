import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import app from "../../firebase";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
  },
  neckText: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1,
    color: "#132743",
    textTransform: "none",
  },
}));

const UserDetails = (props) => {
  const { party } = props;
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [other, setOther] = useState({});

  useEffect(() => {
    console.log("finging user");
    findUser();
  }, []);

  const findUser = async () => {
    const db = app.firestore();
    party.map(async (people) => {
      if (people !== currentUser.uid) {
        await db
          .doc(`users/${people}`)
          .get()
          .then((doc) => {
            setOther({
              profileName: doc.data().profileName,
              profilePhoto: doc.data().profilePhoto,
            });
          });
      }
    });
  };

  return (
    <Button
      color="primary"
      size="large"
      className={classes.button}
      startIcon={<Avatar alt="Remy Sharp" src={other.profilePhoto} />}
    >
      <Typography className={classes.neckText}>{other.profileName}</Typography>
    </Button>
  );
};

export default UserDetails;
