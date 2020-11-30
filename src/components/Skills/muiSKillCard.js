export const skillCardMui = (theme) => ({
  ScuiSkillCard: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    background: "#353535",
    fontSize: "3rem",
    color: "#fff",
    boxShadow:
      "rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem",
    height: "100%",
    width: " 100%",
    bordeRadius: 5,
    transition: "all 500ms",
    overflow: "hidden",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  ScuiCardAction: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },

  ScuiCardHeaderBox: {
    alignContent: "flex-start",
    marginRight: "auto",
    marginTop: "auto",
  },

  ScuiCardHeader: {
    padding: "4px 16px",
  },

  ScuiSpan: {
    marginRight: theme.spacing(1),
  },

  ScuiStatusIcon: {
    fontSize: 20,
  },

  ScuiButtonStatus: {
    height: 20,
    width: 20,
    margin: "auto 2px",
  },
});
