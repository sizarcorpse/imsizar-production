export const skillCardMui = (theme) => ({
  card: {
    maxWidth: 320,
    maxHeight: 300,
    margin: "auto auto 27px",
  },

  cardpreview: {
    width: 320,
    maxWidth: 320,
    maxHeight: 300,
    margin: "auto auto",
  },
  media: {
    height: 300,
    width: "100%",
    objectFit: "cover",
  },
  CardHeader: {
    position: "relative",
    bottom: 150,
  },
  ico: {
    position: "relative",
    bottom: 200,
  },
  headText: {
    fontSize: 30,
    letterSpacing: 0,
    wordSpacing: 4,
    fontWeight: 700,
    fontStyle: "normal",
    fontVariant: "normal",
    color: "#FFFFFF",
    display: "flex",
    marginBottom: 10,
  },
  neckText: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "flex-start",
  },
  neckText2: {
    fontSize: 13,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#FFFFFF",
    display: "flex",
    textAlign: "left",
  },
  span: {
    marginRight: 10,
  },
  StatusIcon: {
    fontSize: 20,
  },
  ButtonStatus: {
    height: 20,
    width: 20,
    margin: "auto 2px",
  },
  CardHeadOption: {
    position: "relative",
    bottom: 425,
  },
  IconLike: {
    fontSize: 25,
  },
  ButtonLike: {
    marginRight: "auto",
  },

  menu: {
    "&.MuiPopover-root": {
      // under the menu :: paper
      // background: "rgba(255,255,255,.3)",
    },
    "& .MuiMenuItem-root": {
      minWidth: 300,
    },

    "& .MuiPopover-paper": {
      marginTop: 40,
      boxShadow: "1px 1px 10px -3px rgba(11,11,11,0.2)",
    },
    "& .MuiMenu-paper ": {
      //background color of menu
      //menu background
    },
  },

  neckText3: {
    fontSize: 13,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    textAlign: "left",
  },
});
