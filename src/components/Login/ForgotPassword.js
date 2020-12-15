import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import "./ForgotPassword.css";

//Material UI

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EmailIcon from '@material-ui/icons/Email';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    // console.log(this.state.remember);

    this.props.forgotPassword(e.target.email.value);
  };


  render() {

    let Message = null;

    if (this.props.msg) {
      console.log(this.props.msg)
      Message = <p className="errorMessage">{this.props.msg}</p>;
    }

    return (
      <div className="container_fp">
      <Container className="forgotPass" component="main" maxWidth="sm">
        <CssBaseline />
        <div>
          <Typography className="heading" component="h1" variant="h5">
            Forgot Password ?
          </Typography>
          <Typography className="sub-heading" variant="subtitle1">
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
          {Message}
          <form onSubmit={this.handleSubmit} className="form">
            <TextField
              className="input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
             placeholder="Email"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <EmailIcon className="input_icon"/>
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
              Reset Password
            </Button>

            <Grid container className="login_end">
              <Grid item className="login_end_right">
                <NavLink className="link" exact to="/">
                  Back to Sign In
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    msg:state.msg
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   forgotPassword: (email) => dispatch(actions.forgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
