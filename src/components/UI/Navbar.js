import React, { useState } from "react";
import "./Navbar.css";
import AppsIcon from "@material-ui/icons/Apps";
import { Button, Grid } from "@material-ui/core";
import SelfIcon from "../../images/self.png";
import OtherIcon from "../../images/others2.png";
import MeetingIcon from "../../images/meeting.png";
import onClickOutside from "react-onclickoutside";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import {
  AddBox,
  ExitToApp,
  Lock,
  Person,
  Visibility,
} from "@material-ui/icons";
function Navbar({ Icon, name }) {
  const [gridOpt, setGridOpt] = useState(false);
  const [avatarOpt, setAvatarOpt] = useState(false);

  const avatarOptions = () => {
    if (gridOpt) setGridOpt(false);
    setAvatarOpt(!avatarOpt);
  };
  const gridOptions = () => {
    if (avatarOpt) setAvatarOpt(false);
    setGridOpt(!gridOpt);
  };
  Navbar.handleClickOutside = () => {
    setAvatarOpt(false);
    setGridOpt(false);
  };

  return (
    <Grid direction="row" container className="navbar">
      <Grid direction="row" justify="flex-start" item className="navbar_left">
        <img src={Icon} alt="Hiring Icon" />
        <h1>{name}</h1>
      </Grid>
      <div className="navbar_right">
        <div className="container">
          <Button onClick={gridOptions}>
            <AppsIcon className="grid" />
          </Button>
          {gridOpt && (
            <div class="dropdown">
              <ul>
                <li>
                  <NavLink className="link" exact to="/">
                    <div className="nameGrid">Meeting & Tours</div>
                    <div className="iconGrid meeting">
                      <img src={MeetingIcon} />
                    </div>
                  </NavLink>
                </li>
                <li>
                  <div className="nameGrid"> Account</div>

                  <NavLink className="link" exact to="/">
                    <div className="iconGrid">
                      {" "}
                      <img src={SelfIcon} />
                    </div>
                  </NavLink>
                  <NavLink className="link" exact to="/">
                    <div className="iconGrid">
                      <img src={OtherIcon} />
                    </div>
                  </NavLink>
                </li>
                <li>
                  <div className="nameGrid">Contact Info</div>

                  <NavLink className="link" exact to="/">
                    <div className="iconGrid">
                      <AddBox />
                    </div>
                  </NavLink>
                  <NavLink className="link" exact to="/">
                    <div className="iconGrid">
                      <Visibility />
                    </div>
                  </NavLink>
                </li>
                <li>
                  <div className="nameGrid">Hiring Info</div>

                  <NavLink className="link" exact to="/hiringform">
                    <div className="iconGrid">
                      <AddBox />
                    </div>
                  </NavLink>
                  <NavLink className="link" exact to="/hiringreport">
                    <div className="iconGrid">
                      <Visibility />
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="container">
          <Button onClick={avatarOptions}>
            <AccountCircleIcon className="nav_avatar" />
          </Button>
          {avatarOpt && (
            <div class="dropdown">
              <ul>
                <li>
                  <NavLink className="link" exact to="/">
                    <div className="iconAvatar">
                      <Person />
                    </div>
                    <div className="nameAvatar">Name</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" exact to="/changepassword">
                    <div className="iconAvatar">
                      <Lock />
                    </div>

                    <div className="nameAvatar"> Change Password</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" exact to="/logout">
                    <div className="iconAvatar">
                      <ExitToApp />
                    </div>
                    <div className="nameAvatar"> Logout</div>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}
const clickOutsideConfig = {
  handleClickOutside: () => Navbar.handleClickOutside,
};

export default onClickOutside(Navbar, clickOutsideConfig);
