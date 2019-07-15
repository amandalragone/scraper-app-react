import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';

class App extends React.Component {

  render() {

    return (

      <Router>
          <Route exact path="/" component={Home}/>
      </Router>

    )
  }
}

export default App;
