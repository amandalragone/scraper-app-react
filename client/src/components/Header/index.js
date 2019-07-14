import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleResults from "../ArticleResults";
import axios from "axios";
import Footer from '../Footer';


class Header extends React.Component {

    state = {
        seeSaved: false,
        articles: []
    }

    goToSaved = () => {
        this.setState({
            seeSaved: true,
            articles: []
        })

        const savedArticles = [localStorage.getItem("ids").split(",")];
        console.log(savedArticles)

        savedArticles[0].forEach(element =>
            
            axios.get("/savedarticles/" + element).then(response => {

                const newArticle = [response.data];

                console.log(response.data);
                this.setState(prevState => {
                    return {
                        articles: [...prevState.articles, ...newArticle]
                    }
                })

            })

        )

        console.log(this.state.articles)
    }

    goHome = () => {
        this.setState({
            seeSaved: false,
            articles: []
        })
        console.log(this.state)
    }

    scrapeArticles = () => {

        axios.get("/scrape").then(() => this.showArticles())

    }
    
    showArticles = () => {
    
        axios.get("/findArticles").then(res => {
    
            this.setState({
                articles: res.data
            })
    
            console.log(this.state)
        })
          
    }

    clearArticles = () => {
        this.setState({
            articles: []
        })
    }


    render() {

        return (

            <Router>

            
            <div>

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/">BBC Scraper App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to={"/"} class="nav-link" onClick={this.goHome}>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/saved" class="nav-link" onClick={this.goToSaved}>Saved</Link>
                        </li>
                        </ul>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.scrapeArticles}>Scrape New Articles</button>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.clearArticles}>Clear Articles</button>
                    </div>
                    </nav>

                <header>

                    {this.state.seeSaved ? <h1>Saved articles</h1> : <h1>BBC Scraper App</h1>}
                    
                </header>

                <ArticleResults
                seeSaved={this.state.seeSaved}
                articles={this.state.articles}
                />

                <Footer/>

            </div>

            </Router>
        )
    }
}
export default Header;