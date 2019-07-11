import React from "react";

class CommentsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            comment: ""
        }
    }

    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })

    }

    handleFormSubmit = event => {

        event.preventDefault();

        alert("Username: " +  this.state.userName + " / Comment: " +  this.state.comment);

        this.setState({
            userName: "",
            comment: ""
        })

    }

    render() {

        return (

            <form>

                <div className="form-group">
                    <label for="userName">User Name:</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="John Doe" 
                    name="userName" 
                    value={this.state.userName} 
                    onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label for="comment">Comment:</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your comment goes here"
                    name="comment" 
                    value={this.state.comment} 
                    onChange={this.handleInputChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
            
            </form>

        )
    
    }

}

export default CommentsForm;