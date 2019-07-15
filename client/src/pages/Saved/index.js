import React from "react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Footer from "../../components/Footer";
import SavedArticles from "../../components/SavedArticles";
import axios from "axios";

class Saved extends React.Component {

    render() {

        return (

            <Wrapper>
                <Header/>
                <SavedArticles/>
                <Footer/>
            </Wrapper>

        )
    }
}

export default Saved;