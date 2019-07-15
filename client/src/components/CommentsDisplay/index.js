import React from "react";
import axios from "axios";

class CommentsDisplay extends React.Component {

    state = {
        commentsArr: []
    }

    componentDidMount() {

        axios.get("/seeComments/" + this.props.articleId).then(response => {

            this.setState({
                commentsArr: response.data
            })

        })
    }
    
    render() {

        return (
            
            <div>
            {this.props.comments ? (
                <ul>
                {this.state.commentsArr.map(comment => 
                <li>{comment}</li>
                )}
                </ul> 
            ):(
                <strong>Select "See Comments" to view comments for a specific article!</strong>
            )}
            </div>

            
            
        )
    
    }

}

export default CommentsDisplay;