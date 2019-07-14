import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import './App.css';

class App extends React.Component {

  render() {

    return (

      <Router>
          <Route exact path="/" component={Header}/>
      </Router>
    )
  }
}

export default App;
