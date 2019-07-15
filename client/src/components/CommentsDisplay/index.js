import React from "react";

class CommentsDisplay extends React.Component {
    
    render() {

        return (
            
            <div>
            {this.props.comments ? (
                <strong>This will be comments!</strong> 
            ):(
                <strong>Select "See Comments" to view comments for a specific article!</strong>
            )}
            </div>

            
            
        )
    
    }

}

export default CommentsDisplay;