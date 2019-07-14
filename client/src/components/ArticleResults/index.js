import React from "react";

class ArticleResults extends React.Component {

    viewComments = event => {

        const id = event.target.id;

        console.log(id);
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
                    <button id={article._id} onClick={this.viewComments}>View Comments</button>
                  </li>
            )
            }
            </ul>

        )
    
    }

}

export default ArticleResults;