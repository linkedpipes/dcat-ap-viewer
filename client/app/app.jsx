import React from "react";
import {withRouter} from "react-router-dom";
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {Header} from "./header";
import Footer from "./footer";
import {LanguageReRouter} from "./language-rerouter";
import {LoaderIndicator} from "@/app-ui/loading-indicator";
import GoogleTagManager from "@/app-ui/google-tag-manager"
import {InitialDataFetch} from "@/app-services/initial-data";
import {ModalContainer} from "@/app-services/modal";

class AppComponent extends React.Component {
    render() {
        return (
            <LanguageReRouter location={this.props.location}
                              dispatch={this.props.dispatch}>
                <div>
                    <GoogleTagManager/>
                    <LoaderIndicator/>
                    <Header location={location}/>
                    <InitialDataFetch>
                        {React.cloneElement(this.props.children, this.props)}
                    </InitialDataFetch>
                    <Footer/>
                    <ModalContainer/>
                </div>
            </LanguageReRouter>
        );
    };
}

export const App = hot(module)(withRouter(connect()(AppComponent)));
