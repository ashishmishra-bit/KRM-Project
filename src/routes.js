import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import HiringForm from "./components/Hiring/HiringForm/HiringForm";
import HiringView from "./components/Hiring/HiringView/HiringView";
import HiringReport from "./components/Hiring/HiringReport/Report";
import ChangePassword from "./components/Login/ChangePassword";
import Trial from "./components/UI/Trial";
import HiringUpdate from "./components/Hiring/HiringUpdate/HiringUpdate";
const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/hiringform" component={HiringForm} />
      <Route exact path="/hiringview" component={HiringView} />
      <Route exact path="/hiringreport" component={HiringReport} />
      <Route exact path="/hiringupdate" component={HiringUpdate} />
      <Route exact path="/changepassword" component={ChangePassword} />
      <Route exact path="/trial" component={Trial} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
);

export default BaseRouter;
