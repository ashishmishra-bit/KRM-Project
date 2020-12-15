import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import HiringForm from "./components/Hiring/HiringForm";
import HiringView from "./components/Hiring/HiringView";
import ChangePassword from "./components/Login/ChangePassword";
import Trial from "./components/UI/Trial";
const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/hiringform" component={HiringForm} />
      <Route exact path="/hiringview" component={HiringView} />
      <Route exact path="/changepassword" component={ChangePassword} />
      <Route exact path="/trial" component={Trial} />
      <Route exact path="/" component={Login} />
    </Switch>
  </div>
);

export default BaseRouter;
