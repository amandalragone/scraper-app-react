import React from "react";
import CommentsForm from "./../CommentsForm";
import CommentsDisplay from "./../CommentsDisplay";
import axios from "axios";

class savedArticles extends React.Component {

    state = {
        comment: "",
        seeComments: true
    }

    seeComments = event => {
        console.log(event.target.id)

        this.setState({
            seeComments: true
        })

        axios.get("/seeComments/" + event.target.id).then(response => {
            console.log(response.data[0].note.body) 

            if(!response.data[0].note.body) {
                this.setState({
                    comment: null
                })
            } else {
                this.setState({ comment: response.data[0].note.body })
            }
        
        })
    
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
                                            <CommentsForm 
                                            title={article.title}
                                            id={article._id}
                                            />
                                        </div>
                                    </h6>
                                </div>
                                
                                <button id={article._id} onClick={e => this.seeComments(e)}>See Comments</button>
                                <button onClick={() => this.deleteArticle(article._id)}>Delete from saved</button>
                            
                            </li>
                        
                        )}
                    </ul>
                </div>

                <div className="col-6">
                    
                    <CommentsDisplay comment={this.state.comment} seeComments={this.state.seeComments}/>
                </div>
                
            </div>

                        
        )

    }

}

export default savedArticles;