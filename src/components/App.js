import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// #firebase :

// #contexts :
import { AuthProvider } from "../contexts/AuthContext";

// #components :
import Nav from "./Nav/Nav.js";
import Signup from "./Signup/Signup.js";

import AdminRoute from "../customRoutes/AdminRoute";
import PrivateRoute from "../customRoutes/PrivateRoute";
import RouteBack from "../customRoutes/RouteBack";

// #hooks :
import { SnackbarProvider } from "notistack";

// #material-ui :
import { Button, ThemeProvider } from "@material-ui/core";
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
          <AuthProvider>
            <Route path="/" component={Nav} />
            <Switch>
              <RouteBack path="/signup" exact component={Signup} />
            </Switch>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;