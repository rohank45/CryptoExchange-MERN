import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./FrontEnd/Home";
import Cryptos from "./FrontEnd/Cryptos/Cryptos";
import CrtyptoDetails from "./FrontEnd/Cryptos/CryptoDetails";
import Portfolio from "./FrontEnd/Portfolio";
import WatchList from "./FrontEnd/Watchlist";
import Exchanges from "./FrontEnd/Exchanges";
import News from "./FrontEnd/News";
import AboutUs from "./Profile/AboutUs";

import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Profile from "./Auth/Profile";
import EditProfile from "./Auth/EditProfile";
import DeleteProfile from "./Auth/DeleteProfile";
import SendEmail from "./Auth/SendEmail";
import ResetPassword from "./Auth/ResetPassword";
import ChangePassword from "./Auth/ChangePassword";

import ErrorPage from "./Components/ErrorPage";

import { initialState, reducer } from "./reducers/UseReducers";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/coins" exact component={Cryptos} />
        <Route path="/coins/:id" exact component={CrtyptoDetails} />
        <Route path="/exchanges" exact component={Exchanges} />
        <Route path="/news" exact component={News} />
        <Route path="/watchlist" exact component={WatchList} />
        <Route path="/portfolio" exact component={Portfolio} />

        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/editprofile" exact component={EditProfile} />
        <Route path="/changepass" exact component={ChangePassword} />
        <Route path="/sendotp" exact component={SendEmail} />
        <Route path="/reset/password/:token" exact component={ResetPassword} />
        <Route path="/deleteprofile" exact component={DeleteProfile} />

        <Route path="/aboutus" exact component={AboutUs} />
        <Route path="*" exact component={ErrorPage} />
      </Switch>
    </Router>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
