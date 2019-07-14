import React from "react";
import CommentsDisplay from "../CommentsDisplay";
import CommentsForm from "../CommentsForm";
import axios from "axios"

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
                    {
                     this.props.seeSaved ? (

                      <div>
                      <button onClick={() => this.deleteArticle(article._id)}>Delete from saved</button>
                      <button id={article._id} onClick={this.seeNotes}>ArticleNotes</button>
                      </div>
                      
                     ) : (
                      <button id={article._id} onClick={this.saveArticle}>Save Article</button>
                     )
                    }
                  
                  </li>
                
                )
                }

                    {
                      this.state.seeComments && 
                      <div className="row">
                      <div className="col-6">
                        <CommentsForm />
                      </div>
                      <div className="col-6">
                        <CommentsDisplay 
                        />
                      </div>
                    </div>
                    }
            </ul>

        )
    
    }

}

export default ArticleResults;