import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import ArticleResults from "../ArticleResults";
import SavedArticles from "../SavedArticles";

class Header extends React.Component {

    state = {
        seeSaved: false,
        articles: [],
        savedArticles: []
    }

    scrapeArticles = () => {

        axios.get("/scrape").then(() => this.showArticles())

    }
    
    showArticles = () => {
    
        axios.get("/findArticles").then(res => {
    
            this.setState({
                savedArticles: [],
                articles: res.data
            })
    
            console.log(this.state)
        })
          
    }

    clearArticles = () => {
        this.setState({
            articles: [],
            savedArticles: []
        })
    }

    goToSaved = () => {
        this.setState({
            seeSaved: true,
            articles: [],
            savedArticles: []
        })
    
        const viewSaved = [localStorage.getItem("ids").split(",")];

        viewSaved[0].forEach(element =>
            
            axios.get("/savedarticles/" + element).then(response => {

                const newArticle = [response.data];

                console.log(response.data);
                this.setState(prevState => {
                    return {
                        savedArticles: [...prevState.savedArticles, ...newArticle]
                    }
                })

            })

        )

        console.log(this.state.articles)
    }

    goHome = () => {
        this.setState({
            seeSaved: false,
            articles: [],
            savedArticles: []
        })
        console.log(this.state)
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
                            <Link to={"/saved"} class="nav-link" onClick={this.goToSaved}>Saved</Link>
                        </li>
                        </ul>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.scrapeArticles}>Scrape New Articles</button>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.clearArticles}>Clear Articles</button>
                    </div>
                    </nav>

                    {this.state.seeSaved ? (
                    
                    <div>

                        <header>
                            <h1>Saved articles</h1>
                        </header>

                        <SavedArticles 
                        savedArticles={this.state.savedArticles}
                        />

                    </div>

                    ) : (

                    <div>

                        <header>
                            <h1>BBC Scraper App</h1>
                        </header>

                        <ArticleResults
                        articles={this.state.articles}
                        />
                    </div>

                    )}

            </div>

            </Router>
        )
    }
}
export default Header;