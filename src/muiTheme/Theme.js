import { createMuiTheme } from "@material-ui/core/styles";

const baal = "#3f72af";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#112d4e",
      main: "#112d4e",
      dark: "#112d4e",
    },
    secondary: {
      // light: " #f9f7f7",
      // main: "#f9f7f7",
      // dark: "#f9f7f7",
      light: " #3f72af",
      main: "#3f72af",
      dark: "#303f9f",
    },
    text: {
      primary: "#112d4e",
      secondary: "#3f72af",
    },
  },

  //
  typography: {
    fontFamily: '"Roboto"',
    h1: {
      // signin signup
      fontSize: 40,
      letterSpacing: -1,
      wordSpacing: -3,
      lineHeight: 1.1,
      fontWeight: 700,
      fontStyle: "normal",
      fontVariant: "small-caps",
      color: "#112d4e",
    },
    h2: {
      // craete
      fontSize: 25,
      letterSpacing: -1,
      wordSpacing: -3,
      fontWeight: 700,
      lineHeight: 1.2,
      fontStyle: "normal",
      fontVariant: "small-caps",
      color: "#112d4e",
    },
    h3: {
      //skill head
      fontSize: 30,
      letterSpacing: 0,
      wordSpacing: 4,
      fontWeight: 700,
      fontStyle: "normal",
      fontVariant: "normal",
    },
    h4: {
      // mian text
      fontSize: 15,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 1.5,
      color: "#112d4e",
    },
    h5: {
      // button text
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 1.5,
    },
    h6: {
      // not now text
      marginRight: 50,
      fontSize: 15,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 2.7,
      color: "#132743",
      marginTop: 8,
      marginRight: 48,
    },

    subtitle1: {
      fontSize: 17,
      fontWeight: 600,
      fontStyle: "normal",
    },

    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
      fontStyle: "normal",
      whiteSpace: "pre-line",
    },

    caption: {
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

    body1: {
      fontSize: 16,
      lineHeight: 1.5,
      whiteSpace: "pre-line",
    },
    body2: {
      fontSize: 12,
      fontWeight: 500,
    },
    overline: {
      fontSize: 15,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 1.5,
      color: "#112d4e",
    },
  },
});

theme.overrides = {
  // #action : Text field && input field
  MuiInputLabel: {
    root: {
      top: 0,
      color: "#112d4e",
      fontSize: 14,
      "&$focused": {
        color: "#3f72af",
      },
    },
  },
  MuiInputBase: {
    input: {
      height: 5,
      fontSize: "14px",
      color: "#3f72af",
    },
  },
  MuiOutlinedInput: {
    root: {
      "& fieldset": {
        borderColor: "#c1c1c1",
      },
      "&:hover": {
        "& fieldset.MuiOutlinedInput": {
          borderColor: "blue",
        },
      },
      "&$focused": {
        "& fieldset.MuiOutlinedInput-notchedOutline": {
          borderColor: "#7579e7",
        },
      },
      "&$active": {
        "& fieldset.MuiOutlinedInput-notchedOutline": {
          borderColor: "purple",
        },
      },
    },
  },

  // #action : Button

  MuiButton: {
    root: {
      borderRadius: 0,
      textTransform: "none",
    },
    containedPrimary: {
      height: 40,
      marginTop: theme.spacing(1),
      marginBotton: theme.spacing(1),
      backgroundColor: baal,
      "&:hover": {
        backgroundColor: "#396dab",
      },
    },
    containedSecondary: {
      height: 40,
      marginTop: theme.spacing(2),
      marginBotton: theme.spacing(2),
      backgroundColor: baal,
      "&:hover": {
        backgroundColor: "#396dab",
      },
    },
  },
};

theme.props = {
  // #action :
};

export default theme;
