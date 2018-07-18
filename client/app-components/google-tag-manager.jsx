import React from "react";
import gtmParts from "react-google-tag-manager";

// https://github.com/holidaycheck/react-google-tag-manager

// TODO Fix position of the analytics, add to head and body in non-react way ?

class GoogleTagManager extends React.Component {

    constructor(props) {
        super(props);
        this.scriptId = "react-google-tag-manager-gtm";
    }

    componentDidMount() {
        if (GOOGLE_TAG_MANAGER_ID) {
            const dataLayerName = "dataLayer";
            if (!window[dataLayerName]) {
                const gtmScriptNode = document.getElementById(this.scriptId);
                eval(gtmScriptNode.textContent);
            }
        }
    }

    render() {
        if (GOOGLE_TAG_MANAGER_ID) {
            const gtm = gtmParts({
                "id": GOOGLE_TAG_MANAGER_ID,
                "dataLayerName": "dataLayer",
                "additionalEvents": {}
            });
            return (
                <div>
                    <div>
                        {gtm.noScriptAsReact()}
                    </div>
                    <div id={this.scriptId}>
                        {gtm.scriptAsReact()}
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default GoogleTagManager;

