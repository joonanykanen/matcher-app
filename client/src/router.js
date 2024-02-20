// src/router.js, JN, 19.02.2024
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditProfile from './components/Profile/EditProfile';
import ViewProfile from './components/Profile/ViewProfile';
import SwipeView from './components/Swipe/SwipeView';
import ChatList from './components/Chat/ChatList';
import ChatWindow from './components/Chat/ChatWindow';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/profile/view" component={ViewProfile} />
        <Route exact path="/swipe" component={SwipeView} />
        <Route exact path="/chat" component={ChatList} />
        <Route exact path="/chat/:id" component={ChatWindow} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;

// eof
