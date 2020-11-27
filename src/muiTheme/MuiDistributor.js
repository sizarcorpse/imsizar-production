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
    padding: theme.spacing(6),
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
