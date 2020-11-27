export const navMui = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      // "-webkit-box-shadow": "inset 0 0 6px #1b262c",
      backgroundColor: "#ffffff",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#ffffff",
      outline: "1px solid #ffffff",
    },
  },
  appBar: {
    height: 50,
    maxHeight: 50,
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "center",
  },
  toolbar: {
    flexWrap: "wrap",
    // justifyContent: "center",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(0, 0),
    color: "",
    textDecoration: "none",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    color: "#132743",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  menu: {
    "& .MuiMenuItem-root": {
      minWidth: 300,
    },

    "& .MuiPopover-paper": {
      marginTop: 40,
    },
  },
  avatar: {
    paddingLeft: 0,
    height: 40,
    width: 40,
  },
  avatar2: {
    paddingLeft: 0,
    height: 30,
    width: 30,
  },
  neckText: {
    fontSize: 16,
    fontWeight: 700,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    justifyContent: "flex-start",
  },
  neckText2: {
    fontSize: 13,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    textAlign: "left",
  },
  neckText3: {
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    textAlign: "left",
  },
  // submitButtonText: {
  //   fontSize: 14,
  //   fontWeight: 400,
  //   fontStyle: "normal",
  //   textTransform: "none",
  //   color: "#132743",
  // },
  navLink: {
    marginRight: 10,
    color: "",
    textDecoration: "none",
  },
  MenuBox: {
    width: 300,
    maxWidth: 300,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  MenuPaper: {
    margin: 5,
    borderRadius: 100,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1.5,
    textTransform: "none",
  },
  CreateIcon: {
    height: 30,
    width: 30,
    color: "#132743",
  },
  submitButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },

  //public
  ButtonText: {
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "normal",
    lineHeight: 1.5,
    color: "#132743",
    textTransform: "none",
  },
  LinkUnderlineRemove: {
    textTransform: "none",
    textDecoration: "none",
  },
});
