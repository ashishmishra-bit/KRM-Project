import React, { Component } from "react";
import { withRouter,Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";

import * as actions from "./store/actions/auth";
import Message from "./Message"
import Logout from "./Logout"
import ChangePassword from './components/Login/ChangePassword'
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes=<BaseRouter/>
    if(this.props.isAuthenticated){
    
     routes= <Switch>
   
      <Route exact path="/" component={Message} />
      <Route path="/logout" component={Logout} />
      <Route path="/changepassword" component={ChangePassword}/>
    </Switch>
    }
    return (
      <div>
     
        {routes}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
