import React from 'react';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {

  render() {

    return (

      <Wrapper>
        <Header/>
        <Footer/>
      </Wrapper>
    )
  }
}

export default App;
