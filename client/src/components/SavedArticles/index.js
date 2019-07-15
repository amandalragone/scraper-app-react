import React from "react";
import CommentsForm from "./../CommentsForm";
import CommentsDisplay from "./../CommentsDisplay";

class savedArticles extends React.Component {

    state = {
        comments: false
    }

    seeComments = () => {
        this.setState({comments: true})
    }

    render() {

        return (

            <div className="row">

                <div className="col-6">

                    <ul>
                        {this.props.savedArticles.map(article => 
                            <li key={article._id}>
                                <a href={article.link}>
                                    <strong>
                                        {article.title}
                                    </strong>
                                </a>

                                <div className="add-gift-button">
                                    <h6 className="drop-gift">
                                        <a
                                            className="card-dropdown-toggle"
                                            href="#"
                                            id="cardDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <button 
                                                type="button"
                                                className="btn btn-success"
                                                id="addComments"
                                            >Add Comments
                                            </button>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <CommentsForm />
                                        </div>
                                    </h6>
                                </div>
                                
                                <button onClick={() => this.seeComments(article._id)}>See Comments</button>
                                <button onClick={() => this.deleteArticle(article._id)}>Delete from saved</button>
                            
                            </li>
                        
                        )}
                    </ul>
                </div>

                <div className="col-6">
                    
                    <CommentsDisplay comments={this.state.comments} />
                </div>
                
            </div>

                        
        )

    }

}

export default savedArticles;