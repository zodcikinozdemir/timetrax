import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  browserHistory, IndexRoute } from 'react-router'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import  Main from "../components/Main";
import  Login from "../components/children/Login";
import  Logout from "../components/children/Logout";
import  Register  from "../components/children/admin/Register";
import  Home  from "../components/children/Home";
import  Dashboard  from "../components/children/Dashboard";
import  Schedule  from "../components/children/dashboard/Scheduletable";
import  Timesheet  from "../components/children/Timesheet";
import  Timecard  from "../components/children/dashboard/timecard";

//helper to requireLogin
import Auth from "../components/children/Auth";

function requireAuth(nextState, replace) {
  console.log("requireAuth "+ nextState.location.pathname)
  if (!Auth._loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

// Export the Routes
module.exports = (

 <MuiThemeProvider>
  <Router history={browserHistory}>
    <Route path="/" component={ Main }>

      {/* If user selects Info or Chat show the appropriate component */}
      {/* If user selects Info or Chat show the appropriate component */}
      <Route path="/login" component= { Login } />
      <Route path="/logout" component= { Logout } />
      <Route path="/register" component={ Register } />
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="/schedule" component={Schedule} onEnter={requireAuth} />
      <Route path="/timecard" component={Timecard} onEnter={requireAuth} />
      <Route path="/timesheet" component={Timesheet} onEnter={requireAuth} />
      {/* If user selects any other path... we get the Info Route */}
       <IndexRoute component={ Home } />
         
    </Route>
  </Router>
</MuiThemeProvider>
);

