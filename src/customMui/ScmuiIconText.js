import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const ScmuiIconText = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1d2d50",
      fontSize: "16px",
      top: 0,
    },
    "& label": {
      top: 0,
      color: "#14274e",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c1c1c1",
        // borderColor: "#132743",
      },
      "&:hover fieldset": {
        borderColor: "#c1c1c1",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7579e7",
      },
      "&.Mui-active fieldset": {
        backgroundColor: "#eeeeee",
      },
    },
    "& .MuiInputBase-input": {
      height: "3px",
      fontSize: "15px",
    },
  },
})(TextField);
