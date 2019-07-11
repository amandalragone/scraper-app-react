import React from "react";
import ArticleResults from "./../ArticleResults";
import CommentsForm from "./../CommentsForm";
import CommentsDisplay from "./../CommentsDisplay";

class ArticleContainer extends React.Component {

    render() {

        return (

            <div className="articleContainer">

                <div className="row">

                    <div className="col-6">

                        <ArticleResults />

                    </div>

                    <div className="col-6">

                        <CommentsForm />
                        
                    </div>

                </div>

                <br/>

                <div className="row">

                    <CommentsDisplay />

                </div>

            </div>
        )

    }

}

export default ArticleContainer;