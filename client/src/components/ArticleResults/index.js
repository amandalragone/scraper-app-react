import React from "react";
import axios from "axios";

class ArticleResults extends React.Component {

    state = {
        articles: []
    }

    componentDidMount() {

        this.getBooks();
        console.log(this.state)

    }

    getBooks = () => {

        axios.get("/scrape").then(() => this.showBooks())

    }

    showBooks = () => {

        axios.get("/findArticles").then(res => {

            this.setState({
                articles: res.data
            })

            console.log(this.state)
        })
    }  
    
    viewComments = event => {

        const id = event.target.id;

        console.log(id);
    }
    
    render() {

        return (

            <ul>
            {this.state.articles.map(article => 
                  <li key={article._id}>
                    <a href={article.link}>
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <button id={article._id} onClick={this.viewComments}>View Comments</button>
                  </li>
            )
            }
            </ul>

        )
    
    }

}

export default ArticleResults;