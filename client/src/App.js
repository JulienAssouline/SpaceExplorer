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






function App() {
  return (
    <ApolloProvider client={apolloClient}>

    <div className="App">
      <Router>
        <Route path="/" exact component = {LandingPage} />
        <Route path = "/launch-details:flightnumber" exact component = {LaunchDetails} />
        <Route path="/signup" exact component = {SignUp} />
        <Route path="/login" exact component = {LogIn} />
        <Route path = "/home" exact component = {Home} />
      </Router>
    </div>
    </ApolloProvider>

  );
}

export default App;
