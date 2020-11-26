import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#112d4e",
      main: "#112d4e",
      dark: "#112d4e",
    },
    secondary: {
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
      //username card
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 1.5,
      color: "#112d4e",
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
      fontSize: 13,
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: 1.5,
    },
  },
});

theme.overrides = {
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
};

export default theme;
