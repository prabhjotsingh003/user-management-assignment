import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersList from "../components/list/UsersList";
import Login from "../components/login/Login";
import UserRegistration from "../components/registration/UserRegistration";

class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={UserRegistration} />
          <Route path="/editUser/:id" component={UserRegistration} />
          <Route path="/list" component={UsersList} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default AppRoutes;
