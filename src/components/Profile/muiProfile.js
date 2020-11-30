export const createProfileMui = (theme) => ({
  card: {
    maxWidth: 400,
    padding: "20px 10px",
    paddingBottom: 100,
    backgroundColor: theme.palette.paper,
    margin: "auto auto",
    backgroundOpacity: 0.5,
    bottom: 150,
    position: "relative",
  },

  cardX: {
    maxWidth: "100%",
    padding: "20px 10px",
    margin: "-98px auto 0",
    background: "none",
    position: "relative",
  },

  newC: {
    maxWidth: 400,
    margin: "auto",
    background: "none",
    boxShadow: "none",
  },

  hide: {
    visibility: "hidden",
  },

  //part 1
  CardHeaderProfilePhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 0,
  },
  AvatarProfilePhoto: {
    height: 110,
    width: 110,
  },
  AvatarProfilePhotoImage: {
    height: 110,
    width: "100%",
    objectFit: "cover",
  },

  //part 2
  GridProfileDetails: {
    textAlign: "center",
  },
  TextHead: {
    letterSpacing: -0.5,
    wordSpacing: 1,
    fontWeight: 600,
    textDecoration: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: 25,
    marginBottom: 5,
    color: "#132743",
  },

  CardHeaderProfileDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 0,
  },

  CardSubheaderProfileDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 0,
  },

  TextNeck: {
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#132743",
    marginBottom: 10,
  },

  LocationIcon: {
    fontSize: 15,
    marginTop: 2,
  },

  TextNeckLocation: {
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    color: "#132743",
  },

  //part 3
  ButtonText: {
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.5,
    textTransform: "none",
    color: "#132743",
  },
  ButtonIconColor: {
    color: "#132743",
  },
  CardContentCotact: {
    width: "100%",
  },
  IconContact: {
    fontSize: 20,
  },
  Divider20: {
    margin: "20px",
  },
  //part4

  CardFeaturedSkill: {
    boxShadow: "inset 0px 0px 0.5px 0.5px #dbdbdb",
    minWidth: 350,
  },

  CardSubheaderCardFeaturedSkill: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 0,
  },

  TextNeckCardFeaturedSkill: {
    fontSize: 15,
    fontWeight: 600,
    fontStyle: "normal",
    color: "#132743",
  },

  IconFeaturedSkill: {
    fontSize: 20,
    color: "#132743",
    marginRight: 10,
  },

  CardFeaturedSkillPlatform: {
    padding: 0,
    // marginBottom: 20,
  },
  TextNeckFeaturedSkillPlatformName: {
    fontSize: 11,
    fontWeight: 700,
    fontStyle: "normal",
    color: "#696969",
    display: "flex",
    paddingLeft: 20,
    // fontVariant: "small-caps"
    textTransform: "uppercase",
  },

  GridFeaturedSkillPlatform: {
    marginTop: 10,
  },
  GridFeaturedSkillPlatformImageitem: {
    textAlign: "start",
    marginLeft: 20,
  },
  ImageFeaturedSkillPlatform: {
    height: 35,
    borderRadius: 5,
    marginRight: 5,
  },

  GridFeaturedSkillPlatformFoot: {
    marginLeft: 20,
    textAlign: "end",
  },

  ButtonMore: {
    marginRight: 10,
  },

  TextNeckMore: {
    fontSize: 13,
    fontWeight: 700,
    fontStyle: "normal",
    color: "#696969",
    textTransform: "none",
  },

  //pert 5

  ButtonExpand: {
    margin: "auto",
  },

  //part 6
  GridBio: {
    textAlign: "start",
    maxWidth: 370,
  },

  TextNeckBio: {
    fontSize: 14,
    fontWeight: 700,
    fontStyle: "normal",
    color: "#132743",
  },
  TextNeckBioDetails: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#696969",
  },

  //

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
});
