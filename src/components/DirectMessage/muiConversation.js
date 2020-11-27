export const conversationMui = (theme) => ({
  //
  rootx: {
    "& .MuiInput-root": {
      bottom: 3,
      overflow: "auto",
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      overflow: "auto",
      display: "block",
    },
    "& .MuiInput-underline::before": {
      content: "none",
      left: 100,
    },
    "& .MuiInput-underline::after": {
      border: "none",
    },
  },

  //
  main: {
    height: "94vh",
    background: "rgba(255,255,255,.8)",
    // background: "blue",
  },
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 800,
    width: 800,
    margin: "auto auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 240,
    backgroundColor: "#f9f7f7",
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "start",
    },
  },
  //glo
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    // heigth: "100%",
    width: "100%",
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "8px",
    height: "70vh",
    // width: "100%",
    // maxWidth: "100%",
    // minWidth: "100%",
    width: 512,
    maxWidth: 512,
    minWidth: 512,
    padding: "0px 20px",
  },
  inputArea: {
    backgroundColor: "#f7fbfc",
    margin: 0,
    paddingLeft: "20x",
    borderRadius: "40px",
    height: "57px",
    border: "1px solid #c1c1c1",
  },
  PaperMianCotent: {
    marginTop: "5vh",
    height: 800,
    maxWidth: 800,
  },
  CardMainCard: {
    maxWidth: 800,
    maxHeight: 800,
    height: 800,
    padding: 20,
    paddingBottom: 100,
    background:
      "url(https://firebasestorage.googleapis.com/v0/b/messier87-development.appspot.com/o/wave.svg?alt=media&token=dead2046-9e45-4d55-a0ea-effb9435d89b)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
  },

  TextHead: {
    fontSize: 25,
    letterSpacing: -1.4,
    wordSpacing: 4,
    fontWeight: 700,
    fontStyle: "normal",
    fontVariant: "small-caps",
    color: "#132743",
  },

  Divider25: { marginTop: 25, marginBottom: 25 },
  ButtonSubmit: {
    height: 40,
    background:
      "linear-gradient(54deg, rgba(88,203,255,1) 0%, rgba(55,182,255,1) 38%, rgba(80,161,251,1) 66%, rgba(81,198,249,1) 100%)",
  },
  TextButtonSubmit: {
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.5,
    textTransform: "none",
  },
  TextNotNow: {
    marginRight: 50,
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 2.7,
    color: "#132743",
  },

  CardContentMain: {
    height: 550,
    maxHeight: 550,
  },

  //in
  gridFoot: {
    display: "flex",
    justifyContent: "flex-end",
  },

  //--
  LinkUnderlineRemove: {
    textTransform: "none",
    textDecoration: "none",
  },
  textArea: {
    maxWidth: 728,
    maxHeight: 400,
    background:
      "linear-gradient(90deg, rgba(246,246,246,1) 7%, rgba(240,242,244,1) 26%, rgba(247,247,247,1) 66%, rgba(249,248,245,1) 100%)",
    fontSize: 15,
    borderRadius: 5,
    border: "1px solid #efefef",
  },
});
