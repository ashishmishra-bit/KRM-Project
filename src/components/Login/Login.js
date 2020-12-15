import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import "./Login.css";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
     
      showPassword:false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log(this.state.remember);

    this.props.onAuth(
      e.target.username.value,
      e.target.password.value,
      this.state.remember
    );
  };

  
  render() {
    let errorMessage = null;

    if (this.props.error) {
     // console.log(this.props.error)
      errorMessage = <p className="errorMessage">{this.props.error}</p>;
    }

     

 
    return (<div className="container_login">
      <Container className="login" component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Container className="avatar_container">
            <Avatar className="login_avatar"></Avatar>
          </Container>
          <Typography className="heading" component="h1" variant="h5">
            Sign In
          </Typography>
          {errorMessage}
          <form onSubmit={this.handleSubmit} className="form">
            <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle className="input_icon"/>
                </InputAdornment>
              ),
            }}
              className="input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              className="input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className="input_icon"/>
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> this.setState({showPassword: !(this.state.showPassword)})}
                      onMouseDown={(e)=> e.preventDefault()}
                      edge="end"
                    >
                      {this.state.showPassword ? <Visibility className="input_icon" /> : <VisibilityOff className="input_icon" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
             
            />
           

            
            {this.props.loading ? (
              <Button
                className="submit"
                type="submit"
                fullWidth
                disabled
                variant="contained"
              >
                Loging In...
              </Button>
            ) : (
              <Button
                className="submit"
                type="submit"
                fullWidth
                variant="contained"
              >
                Log In
              </Button>
            )}
            <Grid container className="login_end">
              <Grid item className="login_end_left">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      id="remember"
                      color="primary"
                      onChange={(e) =>
                        this.setState({ remember: e.target.checked })
                      }
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item className="login_end_right">
                <NavLink className="link" exact to="/forgotpassword">
                  Forgot Password?
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
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, isChecked) =>
      dispatch(actions.authLogin(username, password, isChecked)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
