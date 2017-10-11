import React from "react";

let UserFooterModule = undefined;

(function loadUserProvidedFooter() {
    if (FOOTER_FILE_PATH !== undefined) {
        UserFooterModule = require("./../../" + FOOTER_FILE_PATH);
    }
})();

const Footer = () => {
    if (UserFooterModule === undefined) {
        return null;
    } else {
        return (
            <UserFooterModule.Footer/>
        )
    }

};

export default Footer;