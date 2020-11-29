import React from "react";
import Contents from "./Contents";
import Profile from "../Profile/Profile";
import UserProfile from "../Profile/UserProfile";

import { Grid, Hidden } from "@material-ui/core";

import bgsvg from "../../assets/bgsvg.svg";
import vb from "../../assets/background.svg";

const Landing = (props) => {
  const username = props.match.params.username;

  return (
    <Grid
      container
      component="main"
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundImage: `url(${bgsvg})`,
      }}
    >
      {/* <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Nav />
      </Grid> */}

      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <img
          src={vb}
          alt=""
          style={{ height: 200, width: "100%", objectFit: "cover" }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        xl={3}
        lg={4}
        md={5}
        sm={12}
        style={{ marginLeft: "auto" }}
      >
        {!username ? <Profile /> : <UserProfile username={username} />}
      </Grid>
      <Grid item xs={12} xl={9} lg={8} md={7} sm={false}>
        <Contents />
      </Grid>
    </Grid>
  );
};

export default Landing;
