import bg from "../../assets/background.svg";
export const signUpMui = (theme) => ({
  image: {
    height: "100vh",
    background: `url(${bg})  no-repeat center center fixed`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  toolbar: {
    maxHeight: 50,
  },
  cardRoot2: {
    maxWidth: 500,
  },
  cardRoot: {
    maxWidth: 500,
    padding: 50,
    paddingBottom: 100,
    background:
      "url(https://firebasestorage.googleapis.com/v0/b/messier87-development.appspot.com/o/wave.svg?alt=media&token=dead2046-9e45-4d55-a0ea-effb9435d89b)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
  },

  headText: {
    fontSize: 40,
    letterSpacing: -1.4,
    wordSpacing: -3.8,
    fontWeight: 700,
    fontStyle: "normal",
    fontVariant: "small-caps",
    color: "#132743",
  },
  neckText: {
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1.5,
    color: "#132743",
  },
  submitButton: {
    height: 40,
    background:
      "linear-gradient(54deg, rgba(88,203,255,1) 0%, rgba(55,182,255,1) 38%, rgba(80,161,251,1) 66%, rgba(81,198,249,1) 100%)",
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.5,
    textTransform: "none",
  },
  LinkUnderlineRemove: {
    textTransform: "none",
    textDecoration: "none",
  },
});
