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
  ScuiCenter: {
    display: "flex",
    justifyContent: "center",
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
  ScuiDividerTB1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

  // #action :
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
    width: "100%",
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

  ScuiAvaterMedium: {
    height: 60,
    width: 60,
  },
  ScuiAvayerMediumImage: {
    height: 60,
    width: "100%",
    objectFit: "cover",
  },

  ScuiAvaterSmall: {
    height: 35,
    width: 35,
  },
  ScuiAvayerSmallImage: {
    height: 35,
    width: "100%",
    objectFit: "cover",
  },

  //
  // CardContentMain: {
  //   height: 550,
  //   maxHeight: 550,
  // },

  //
  cardpreview: {
    width: 320,
    maxWidth: 320,
    maxHeight: 300,
    margin: "auto auto",
  },

  //blog
  ScuiChoosePhotoGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ScuiChoosePhotoGridAreaSmall: {
    height: 90,
    maxHeight: 90,
  },
  ScuiChoosePhotoGridAreaMedium: {
    height: 200,
    maxHeight: 200,
  },
  ScuiChoosePhotoGridAreaLarge: {
    height: 450,
    maxHeight: 450,
  },

  ScuiPreviewArea: {
    overflow: "auto",
    maxHeight: 140,
  },
  ScuiPreviewAreaLarge: {
    overflow: "auto",
    maxHeight: 450,
  },

  ScuiCardPreviewPhoto: {
    maxHeight: 120,
    minHeight: 120,
    maxWidth: 120,
    margin: theme.spacing(1),
    padding: 0,
    background:
      "linear-gradient(90deg, rgba(246,246,246,1) 7%, rgba(240,242,244,1) 26%, rgba(247,247,247,1) 66%, rgba(249,248,245,1) 100%)",
  },

  ScuiPreviewPhoto: {
    maxHeight: 120,
    maxWidth: 120,
    height: 120,
    width: "100%",
    objectFit: "cover",
  },

  ScuiAddIcon: {
    cursor: "pointer",
    color: "rgb(227,227,227)",
  },

  // #action : menu

  ScuiMenuSmall: {
    "& .MuiMenuItem-root": {
      minWidth: 100,
    },
    "& .MuiPopover-paper": {
      marginTop: 40,
      boxShadow: "1px 1px 10px -3px rgba(11,11,11,0.2)",
    },
  },
  ScuiMenuSmallPadding: {
    marginLeft: -56,
  },
  ScuiMenuSmallPaddingReview: {
    marginLeft: -21,
  },

  ScuiMenuComment: {
    "& .MuiMenuItem-root": {
      minWidth: 100,
      padding: "8px 0px",
    },
    "& .MuiList-root": {
      margin: "8px 0px",
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

  //POST
  ScuiContentCard: {
    maxWidth: 800,
    padding: theme.spacing(3),
    margin: "0px auto 24px",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.complex,
    }),
  },
  expandOpen: {
    transform: "rotate(360deg)",
  },

  // #action :  comment

  ScuiCommentCard: {
    "& .MuiCardHeader-root": {
      "& .MuiCardHeader-content": {
        marginBottom: "auto",
      },
    },
    borderRadius: 0,
    // borderBottom: ".5px solid #c1c1c1",
  },
  ScuiCommentHead: {
    display: "flex",
    justifyContent: "flex-start",
  },
  ScuiCommentHeadXs: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },

  ScuiCommentIconButton: {
    height: 35,
    width: 35,
    "&.MuiIconButton-root": {
      margin: "auto 5px",
      padding: "0px 0px",
    },
  },
  ScuiCommentIconSize: {
    fontSize: 20,
  },

  ScuiCommentBodyContent: {
    "&.MuiCardContent-root": {
      marginLeft: 57,
      padding: "0px 8px 15px 8px",
    },
  },

  ScuiCommentBodyBox: {
    padding: "0px 10px",
  },
});
