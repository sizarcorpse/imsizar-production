export const createConversationMui = (theme) => ({
  //glo
  main: {
    height: "100vh",
    background: "rgba(255,255,255,.8)",
  },

  PaperMianCotent: {
    marginTop: "10vh",
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
    border: "1px solid #132743",
    borderRadius: 5,
  },
});
