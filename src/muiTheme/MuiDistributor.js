import bg from "../assets/background.svg";

export const MuiDistributor = (theme) => ({
  //signup
  ScuiMainContainer: {
    height: "100vh",
    background: `url(${bg})  no-repeat center center fixed`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  ScuiBoxFullHeight: {
    height: "100vh",
  },

  ScuiPaperSingle: {
    maxWidth: 500,
  },

  ScuiCardSingle: {
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

  ScuiMiddle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ScuiLinkUnderLineRemove: {
    textDecoration: "none",
    textTransform: "none",
  },

  //divider
  ScuiDividerT24: {
    marginTop: theme.spacing(3),
  },
  ScuiDividerTB24: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});
