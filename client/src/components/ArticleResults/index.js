import React from "react";
import CommentsForm from "../CommentsForm";


class ArticleResults extends React.Component {

    state = {
      savedArticles: [],
      seeComments: false
    }

    saveArticle = event => {

        const id = event.target.id;
      
          this.setState(prevState => {

            const newId = [id];
            const allIds = [...prevState.savedArticles, ...newId]
            localStorage.setItem("ids", allIds)
            return {
              savedArticles: allIds
            }
          })

          console.log(this.state)
        
    }

    seeNotes = () => {
      this.setState({
        seeComments: true
      })
    }

    deleteArticle = id => {

      const savedArticles = this.state.savedArticles.filter(element => element !== id);
      console.log(savedArticles)
      localStorage.setItem("ids", savedArticles)
    
    }
    
    render() {

        return (
            <ul>
              {this.props.articles.map(article => 
                  <li key={article._id}>
                    <a href={article.link}>
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <button id={article._id} onClick={this.saveArticle}>Save Article</button>
                  </li>
                
                )}
            </ul>
        )
    
    }

}

export default ArticleResults;