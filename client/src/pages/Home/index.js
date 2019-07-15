import React from "react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Footer from "../../components/Footer";

class Home extends React.Component {

    render() {

        return (

            <Wrapper>
                <Header/>
                <Footer/>
            </Wrapper>

        )
    }
}

export default Home;