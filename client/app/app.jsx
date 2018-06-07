import React from "react";
import {Header} from "./header";
import Footer from "./footer";
import {LanguageReRouter} from "./language-rerouter";
import {LoaderIndicator} from "../app-components/loading-indicator/index";
import {connect} from "react-redux";
import GoogleTagManager from "../app-components/google-tag-manager"
import {withRouter} from "react-router-dom";

class AppComponent extends React.Component {
    render() {
        return (
            <LanguageReRouter location={this.props.location}
                              dispatch={this.props.dispatch}>
                <div>
                    <GoogleTagManager/>
                    <LoaderIndicator/>
                    <Header location={location}/>
                    {React.cloneElement(this.props.children, this.props)}
                    <Footer/>
                </div>
            </LanguageReRouter>
        );
    };
}

export const App = withRouter(connect()(AppComponent));