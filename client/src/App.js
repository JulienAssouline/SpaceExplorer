import React from 'react';
import './App.css';
import SignUp from "./components/SignUp"
import { BrowserRouter as Router, Route } from "react-router-dom";
import apolloClient from "./apolloClient"
import { ApolloProvider} from "react-apollo"
import LogIn from "./components/LogIn"
import Home from "./components/Home"
import LandingPage from "./components/LandingPage"
import LaunchDetails from "./components/LaunchDetails"
import Background from "./components/Background"
import { Provider as ReduxProvider } from "react-redux"
import configureStore from "./module/store"



let initial_state = {
  username: "simon",
  userEmail: "hello@cool.com",
  user_id: 4
}

const reduxStore = configureStore(initial_state)


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store = {reduxStore}>

      <div className="App">
        <Router>
        <div className="wrapper">
          <Route path="/" exact component = {Background} />
          <Route path="/" exact component = {LandingPage} />
        </div>
          <Route path = "/launch-details:flightnumber" exact component = {LaunchDetails} />
          <Route path="/signup" exact component = {SignUp} />
          <Route path="/login" exact component = {LogIn} />
          <Route path = "/home" exact component = {Home} />
        </Router>
      </div>
      </ReduxProvider>
    </ApolloProvider>

  );
}

export default App;
