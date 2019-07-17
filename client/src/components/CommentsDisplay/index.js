import React from "react";
import axios from "axios";

class CommentsDisplay extends React.Component {
    
    render() {

        return (

            <div>
                {this.props.seeComments ? <p>{this.props.comment}</p> : <p>There's no notes entered for this article yet. Click Add Comments to create a new note.</p>}
            </div>

        )

    }

}

export default CommentsDisplay;