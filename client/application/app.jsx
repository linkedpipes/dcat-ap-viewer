import React from "react";
import Header from "./header";
import Footer from "./footer";
import {LanguageReRouter} from "./navigation";
import {IndeterminateLoader} from "../components/loader";
import {connect} from "react-redux";
import Notifications from "react-notification-system-redux";

class AppComponent extends React.Component {
    render() {
        return (
            <LanguageReRouter location={this.props.location}
                              router={this.props.router}>
                <div>
                    <IndeterminateLoader active={this.props.loaderActive}/>
                    <Header/>
                    {/* TODO Remove DIV element. */}
                    <div>
                        {React.cloneElement(this.props.children, this.props)}
                    </div>
                    <Footer/>
                    <Notifications notifications={this.props.notifications}/>
                </div>
            </LanguageReRouter>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    "loaderActive": state.loader.active,
    "notifications": state.notifications
});

export const App = connect(mapStateToProps)(AppComponent);