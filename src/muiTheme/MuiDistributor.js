import bg from "../assets/background.svg";

export const MuiDistributor = (theme) => ({
  image: {
    background: `url(${bg})  no-repeat center center fixed`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  //signup

  PaperSingle: {
    maxWidth: 500,
  },

  CardSingle: {
    maxWidth: 500,
    padding: theme.spacing(6),
  },
});
