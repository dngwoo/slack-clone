import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';

const App = () => (
  <Switch>
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
    <Redirect exact path="/" to="/login" />
  </Switch>
);

export default App;
