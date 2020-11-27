export const reviewsMui = (theme) => ({
  card: {
    maxWidth: 800,
    padding: 20,
    margin: "0px auto 20px",
    border: "0.5px solid rgba(229,229,229,0.36)",
  },
  headText: {
    letterSpacing: -0.5,
    fontSize: 20,
    wordSpacing: 1,
    fontWeight: 600,
    textDecoration: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    textTransform: "none",
    fontFamily: "Arial",
    display: "flex",
    lineHeight: 1.5,
  },
  neckText: {
    fontSize: 15,
    fontWeight: 600,
    fontStyle: "normal",
    lineHeight: 1,
    color: "#132743",
    display: "flex",
  },
  neckText2: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1,
    color: "#9d9d9d",
    display: "flex",
  },
  avatar: {
    height: 60,
    width: 60,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  menu: {
    "&.MuiPopover-root": {
      // under the menu :: paper
      // background: "rgba(255,255,255,.3)",
    },
    "& .MuiMenuItem-root": {
      minWidth: 100,
      padding: "7px 0px",
    },

    "& .MuiPopover-paper": {
      width: 100,
      marginTop: 40,
      marginLeft: -23,
      boxShadow: "1px 1px 10px -3px rgba(11,11,11,0.2)",
    },
    "& .MuiMenu-paper ": {
      //background color of menu
      //menu background
    },
    "& .MuiTypography-root": {
      margin: "0px auto",
    },
  },

  menuComment: {
    "& .MuiMenuItem-root": {
      minWidth: 100,
      padding: "7px 0px",
    },

    "& .MuiList-root": {
      margin: "5px 0px",
      padding: 0,
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },

    "& .MuiPopover-paper": {
      marginTop: 40,
      marginLeft: -63,
      padding: "0px 5px",
      boxShadow: "1px 1px 10px -3px rgba(11,11,11,0.2)",
    },
    "& .MuiPaper-root": {
      width: 141,
    },
  },

  neckText2: {
    fontSize: 13,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    textAlign: "left",
  },

  //menu
  //menu

  menuMini: {
    "& .MuiMenuItem-root": {
      maxWidth: 350,
    },

    "& .MuiPopover-paper": {
      marginTop: 30,
    },
    "& .MuiList-padding": {
      padding: 0,
    },
  },

  LinkUnderlineRemove: {
    textTransform: "none",
    textDecoration: "none",
  },

  textAreax: {
    border: "1px solid rgba(164,164,164,0.50)",
    marginBottom: 20,
    maxHeight: 100,
    overflow: "auto",
  },

  // comment
  IconDelete: {
    fontSize: 20,
  },
  IconButton: {
    height: 35,
    width: 35,
    "&.MuiIconButton-root": {
      margin: "auto 5px",
      padding: "0px 0px",
    },
  },

  cardC: {
    borderBottom: "1px solid rgba(164,164,164,0.15)",
    borderRadius: 0,
  },
  avatarC: {
    height: 35,
    width: 35,
  },
  headTextC: {
    fontSize: 17,
    letterSpacing: -0.5,
    wordSpacing: 1,
    fontWeight: 500,
    textDecoration: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    textTransform: "none",
    margin: "auto 10px auto 0px",
  },
  neckTextC: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    margin: "auto 5px",
  },
  neckTextP: {
    fontSize: 13,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    margin: "auto 5px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
  },
  more: {
    "& .MuiCardHeader-action": {
      marginTop: "auto",
    },
    "& .MuiCardHeader-root": {
      padding: "16px 16px 5px",
    },
  },
  CardHeaderProfileDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 0,
  },

  Content: {
    "&.MuiCardContent-root": {
      marginLeft: 57,
      padding: "0px 8px 15px 8px",
    },
  },
});
