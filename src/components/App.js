import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// #firebase :

// #contexts :
import { AuthProvider } from "../contexts/AuthContext";

// #components :
import Nav from "./Nav/Nav.js";
import Signup from "./Signup/Signup.js";
import Signin from "./Signin/Signin.js";
import ResetPassword from "./Signin/ResetPassword.js";

import Landing from "./Skeleton/Landing.js";

import AccountSetting from "./AccountSetting/AccountSetting.js";
import ProfileSetting from "./AccountSetting/ProfileSetting.js";
import PrivateText from "./DirectMessage/DirectMessage.js";

import AdminRoute from "../customRoutes/AdminRoute";
import PrivateRoute from "../customRoutes/PrivateRoute";
import RouteBack from "../customRoutes/RouteBack";

// #hooks :
import { SnackbarProvider } from "notistack";

// #material-ui :
import { Button, ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../muiTheme/Theme";

function App() {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          dense
          maxSnack={5}
          ref={notistackRef}
          action={(key) => (
            <Button size="small" onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <CssBaseline />
          <AuthProvider>
            <Route path="/" component={Nav} />
            <Switch>
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Signin} />
              <Route path="/resetpassword" exact component={ResetPassword} />

              <Route path="/" exact component={Landing} />
              <Route path="/dashboard" exact component={Landing} />
              <PrivateRoute path="/u/:username" exact component={Landing} />
              <PrivateRoute path="/inbox" exact component={PrivateText} />
              <PrivateRoute
                path="/profilesettings"
                exact
                component={ProfileSetting}
              />
              <PrivateRoute
                path="/accountsettings"
                exact
                component={AccountSetting}
              />
            </Switch>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
