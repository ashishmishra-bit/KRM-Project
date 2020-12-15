import { Button } from "@material-ui/core";
import React, { Component } from "react";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import "./ChangePassword.css";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
class ChangePassword extends Component {
  //   constructor(props){
  //     super(props);
  // //     this.state={
  // // classes:(this.props.show?"show modal-main":"notShow modal-main")
  // //     }
  //   }
  // const [showHideClassName,setshowHideClassName]= useState("")

  // hide=(e)=>{
  //   this.props.setShow(false)
  //   this.setState({classes:(this.props.show?"show modal-main":"notShow modal-main")})
  // }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.changePassword(
      e.target.old_password.value,
      e.target.new_password.value
    );
  };
  render() {
    let MsgCP = null;

    if (this.props.msgCP) {
      console.log(this.props.msgCP);
      MsgCP = <p className="errorMessageCP">{this.props.msgCP}</p>;
    }

    return (
      <div onSubmit={this.handleSubmit} className="modal-main">
        <form className="pw">
          {MsgCP}
          <span className="pw_tag">Old Password</span>
          <TextField
            className="input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="old_password"
            placeholder="Old Password"
            type="text"
            id="old_password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="input_icon" />
                </InputAdornment>
              ),
            }}
          />

          <span className="pw_tag">New Password</span>
          <TextField
            className="input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password"
            placeholder="New Password"
            type="text"
            id="new_password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="input_icon" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="submit"
            type="submit"
            fullWidth
            variant="contained"
          >
            Save
          </Button>
        </form>
        <NavLink className="link close" exact to="/">
          <Button>
            <CloseIcon />
          </Button>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    msgCP: state.msgCP,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (oldPassword, newPassword) =>
      dispatch(actions.changePassword(oldPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
