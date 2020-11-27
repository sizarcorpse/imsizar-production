import bg from "../assets/background.svg";

export const MuiDistributor = (theme) => ({
  // #action :
  //  background
  //  backdrop modal
  ScuiBackground: {
    background: `url(${bg})  no-repeat center center fixed`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  ScuiModalBG: {
    background: "#f9f7f7",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  // #action :
  //  Grid Conteiner
  //  Main Paper
  //  Main Card
  //  Grid Card Footer
  ScuiMainContainer: {
    height: "100vh",
    overflow: "auto",
  },
  ScuiMiddle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ScuiBoxFullHeight: {
    height: "100vh",
  },
  ScuiNone: {},

  ScuiPaperSmall: {
    maxWidth: 500,
  },

  ScuiCardSmall: {
    maxWidth: 500,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },

    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(6),
    },
  },

  ScuiPaperLarge: {
    maxWidth: 900,
    maxHeight: 900,
    height: 900,
    width: 900,
    marginBottom: theme.spacing(2),
  },

  ScuiCardLarge: {
    maxWidth: 900,
    maxHeight: 900,
    height: 900,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },

    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(6),
    },
  },

  ScuiCardLargeMainArea: {
    height: 600,
    maxHeight: 600,
    overflow: "auto",
  },
  ScuiCardLargeMainArea500: {
    height: 550,
    maxHeight: 550,
    overflow: "auto",
  },

  ScuiGridFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },

  // #action :
  //  Toolbar

  ScuiModalClose: {
    height: 30,
    maxHeight: 30,
    justifyContent: "flex-end",
  },

  // #action :
  // Link

  ScuiLinkUnderLineRemove: {
    textDecoration: "none",
    textTransform: "none",
  },

  // #action :
  //Divider
  ScuiDividerT24: {
    marginTop: theme.spacing(3),
  },
  ScuiDividerTB24: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  ScuiDividerTB8: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  // #action :
  // Select Component

  ScuiSelect: {
    minWidth: "100%",
    "& .MuiInputBase-root": {
      height: 42,
      color: "#3f72af",
    },
    "& .MuiInputBase-input": {
      height: 19,
      color: "#3f72af",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c1c1c1",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: 0,
      fontSize: 15,
    },
    "& label": {
      marginRight: 120,
      top: 0,
      color: "#14274e",
    },
    "& .MuiInputLabel-outlined": {
      marginRight: 20,
    },
  },

  // Text Area
  ScuiTextAreaSmall: {
    maxWidth: "100%",
    width: "100%",
    maxHeight: 145,
    fontSize: 15,
    border: "1px solid #c1c1c1",
    borderRadius: 5,
  },
  ScuiTextAreaMedium: {
    maxWidth: "100%",
    width: "100%",
    maxHeight: 500,
    fontSize: 15,
    border: "1px solid #c1c1c1",
    borderRadius: 5,
  },
  ScuiTextAreaLarge: {
    maxHeight: 400,
    fontSize: 15,
    border: "1px solid #c1c1c1",
    borderRadius: 5,
  },

  UpInput: {
    magrin: 0,
    padding: 0,
    height: 0,
    width: 0,
  },

  // #action :
  //avater
  ScuiAvaterLargeButton: {
    border: "1px solid #c1c1c1",
    borderRadius: "200px 200px 200px 200px",
    marginTop: "15px",
    height: 150,
    width: 150,
    display: "flex",
    margin: "0 auto",
  },

  ScuiAvaterLargeCard: {
    borderRadius: "200px 200px 200px 200px",
    height: 150,
    width: 150,
    display: "flex",
    margin: "0 auto",
  },

  ScuiAvaterLarge: {
    maxHeight: 150,
    minHeight: 150,
    maxWidth: 150,
    display: "flex",
    margin: "0 auto",
    borderRadius: "200px 200px 200px 200px",
  },

  //
  CardContentMain: {
    height: 550,
    maxHeight: 550,
  },
});
