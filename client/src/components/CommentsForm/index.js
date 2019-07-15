import React from "react";
import axios from "axios";

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
        const { comment } = this.state;

        axios.post("/articles/" + event.target.id, {comment}).then(response => {

            console.log(response)
            this.setState({
                comment: ""
            })
        })

    }

    render() {

        return (

            <form>
                <h2>{this.props.title}</h2>
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
                
                <button id={this.props.id} type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
            
            </form>

        )
    
    }

}

export default CommentsForm;