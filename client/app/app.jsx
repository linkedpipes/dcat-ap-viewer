import React from "react";
import {Header} from "./header";
import Footer from "./footer";
import {LanguageReRouter} from "./language-rerouter";
import {LoaderIndicator} from "../app-components/loading-indicator/index";
import {connect} from "react-redux";
import GoogleTagManager from "../app-components/google-tag-manager"

class AppComponent extends React.Component {
    render() {
        return (
            <LanguageReRouter router={this.props.router}
                              dispatch={this.props.dispatch}>
                <div>
                    <GoogleTagManager/>
                    <LoaderIndicator/>
                    <Header router={this.props.router}/>
                    {React.cloneElement(this.props.children, this.props)}
                    <Footer/>
                </div>
            </LanguageReRouter>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    "router": state.router
});

export const App = connect(mapStateToProps)(AppComponent);