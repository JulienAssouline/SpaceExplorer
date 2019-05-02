import React from 'react';
import './App.css';
import SignUp from "./components/SignUp"
import { BrowserRouter as Router, Route } from "react-router-dom";
import apolloClient from "./apolloClient"
import { ApolloProvider} from "react-apollo"
import LogIn from "./components/LogIn"
import Home from "./components/Home"






function App() {
  return (
    <div className="App">
    <ApolloProvider client={apolloClient}>
      <Router>
        <Route path="/signup" exact component = {SignUp} />
        <Route path="/login" exact component = {LogIn} />
        <Route path = "/home" exact component = {Home} />
      </Router>
    </ApolloProvider>
    </div>
  );
}

export default App;
