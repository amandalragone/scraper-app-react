import React from 'react';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import ArticleContainer from './components/ArticleContainer';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {

  render() {

    return (

      <Wrapper>
        <Header/>
        <ArticleContainer />
        <Footer/>
      </Wrapper>
    )
  }
}

export default App;
