import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./CreateConversationFormValidation";

// #material-ui :
import { withStyles } from "@material-ui/core/styles";
import { createConversationMui } from "./muiCreateConversation";
import {
  FormControl,
  InputAdornment,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Button,
  TextareaAutosize,
  Paper,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";

const CreateConversation = (props) => {
  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { classes, handleCreateConvModelClose } = props;
  const [loading, setLoading] = useState(false);

  const initialValues = {
    messageBody: "",
  };

  // #handlers : Create review

  const onSubmit = async (values, { resetForm }) => {
    const { messageBody } = values;
    setLoading(true);
    const db = app.firestore();

    try {
      const me = db.collection("users").where("onlyChat", "==", true).limit(1);
      await me
        .get()
        .then((doc) => {
          let who;
          doc.forEach((d) => {
            who = d.id;
          });

          return who;
        })
        .then(async (who) => {
          const sender = db.doc(`conversations/${currentUser.uid}`);
          await sender.get().then(async (doc) => {
            if (!doc.exists) {
              const newConv = {
                conversationID: currentUser.uid,
                conversationCreatedAt: new Date().toISOString(),
                participants: [currentUser.uid, who],
              };
              return await db
                .doc(`conversations/${newConv.conversationID}`)
                .set(newConv)
                .then(() => {
                  sendMessage();
                });
            }
            if (doc.exists) {
              sendMessage();
            }

            async function sendMessage() {
              const newText = {
                messageID: uuidv4(),
                messageCreatedAt: new Date().toISOString(),
                messageBody: messageBody,
                senderUID: currentUser.uid,
                senderDisplayname: currentUser.displayName,
                senderPhotoUrl: currentUser.photoURL,
              };

              await db
                .collection("conversations")
                .doc(`${currentUser.uid}`)
                .collection("messages")
                .doc(newText.messageID)
                .set(newText)
                .then(() => {
                  handleCreateConvModelClose(false);
                });
            }
          });
        });
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <Grid container component="main" className={classes.main}>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        <Paper className={classes.PaperMianCotent}>
          <Card className={classes.CardMainCard}>
            <CardHeader
              title={
                <Typography variant="h5" className={classes.TextHead}>
                  Create a Review
                </Typography>
              }
            />
            <Divider className={classes.Divider25} />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={true}
              validateOnBlur={false}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                } = props;
                return (
                  <Form>
                    <CardContent className={classes.CardContentMain}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl
                            error={touched.textArea && Boolean(errors.textArea)}
                            fullWidth
                          >
                            <TextareaAutosize
                              className={classes.textArea}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <TitleIcon />
                                  </InputAdornment>
                                ),
                              }}
                              label="review Body"
                              variant="outlined"
                              id="messageBody"
                              rowsMin={26}
                              aria-label="maximum height"
                              placeholder="Give me a nice cool review. (max 500 words)"
                              name="messageBody"
                              variant="outlined"
                              fullWidth
                              id="messageBody"
                              value={values.messageBody}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider className={classes.Divider10} />
                    <CardContent>
                      <Grid item xs={12} className={classes.gridFoot}>
                        <Typography
                          variant="h5"
                          className={classes.TextNotNow}
                          onClick={() => handleCreateConvModelClose(false)}
                        >
                          <Link
                            to={"/dashboard"}
                            className={classes.LinkUnderlineRemove}
                          >
                            Not Now
                          </Link>
                        </Typography>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          className={classes.ButtonSubmit}
                          disabled={loading}
                        >
                          <Typography
                            variant="h5"
                            className={classes.TextButtonSubmit}
                          >
                            Review Now
                          </Typography>
                        </Button>
                      </Grid>
                    </CardContent>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
    </Grid>
  );
};

export default withStyles(createConversationMui)(CreateConversation);
