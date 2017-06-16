import React from "react";
import Header from "./header";
import Footer from "./footer"
import {LanguageReRouter} from "./navigation"

class App extends React.Component {

    render() {
        return (
            <LanguageReRouter location={this.props.location} router={this.props.router}>
                <div>
                    <Header/>
                    {/* TODO Remove DIV element. */}
                    <div>
                        {React.cloneElement(this.props.children, this.props)}
                    </div>
                    <Footer/>
                </div>
            </LanguageReRouter>
        );
    };
}

export default App;