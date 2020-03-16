import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {Helmet} from "react-helmet";
import {selectUrl, createUrl, getAllLanguages} from "./navigation";
import {getGlobal, MAIN_LANGUAGE} from "./globals";

function CanonicalLink({url}) {
  const mainLanguage = getGlobal(MAIN_LANGUAGE);
  return (
    <Helmet>
      <link
        rel="canonical"
        href={createUrl(url.path, mainLanguage, url.query)}
      />
      {
        getAllLanguages().map((lang) => (
          <link
            rel="alternate"
            href={createUrl(url.path, lang, url.query)}
            hrefLang={lang}
            key={lang}
          />
        ))
      }
    </Helmet>
  )
}

CanonicalLink.propTypes = {
  "url": PropTypes.object.isRequired,
};

export default connect((state) => ({
  "url": selectUrl(state),
}))(CanonicalLink);
